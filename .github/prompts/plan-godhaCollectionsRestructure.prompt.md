## Plan: Production-Grade Ecommerce Restructure

**TL;DR:** Restructure the entire Godha Collections codebase from a messy single-folder JavaScript project into a scalable, production-ready TypeScript architecture under `src/`. This involves: converting all files to TypeScript, adopting the `src/` directory convention, splitting the monolithic API route into modular service files, adding proper role-based auth, removing 43 unused UI components and ~10 unused npm packages, eliminating code duplication, making the root layout a server component for SEO, adding Firestore security rules, creating missing static pages, and organizing components by domain. Zustand stays for state management. Logo, navbar design, and categories (Dresses, Sarees, Ethnic Wear) remain unchanged.

---

### Steps

**Phase 0 — Preparation**

1. **Update [package.json](package.json):** Remove unused dependencies (`mongodb`, `axios`, `@tanstack/react-table`, `react-resizable-panels`, `input-otp`, `cmdk`, `date-fns`, `react-day-picker`, `recharts`, `react-hook-form`, `@hookform/resolvers`, `zod`, `uuid`, `next-themes`). Add `typescript`, `@types/react`, `@types/node`. Rename project from `nextjs-mongo-template` to `godha-collections`.

2. **Create `tsconfig.json`** with strict mode, path aliases (`@/*` → `src/*`), App Router settings, and `include: ["src"]`.

3. **Update [next.config.js](next.config.js) → `next.config.ts`:** Remove `mongodb` from `serverComponentsExternalPackages`. Enable image optimization (remove `unoptimized: true`). Tighten security headers (restrictive CSP, `X-Frame-Options: DENY`). Keep standalone output mode.

4. **Update [tailwind.config.js](tailwind.config.js) → `tailwind.config.ts`:** Change content paths to `src/**/*.{ts,tsx}`. Remove dark mode config (not used). Keep all brand color palettes, custom fonts, and animations.

5. **Update [components.json](components.json):** Change `tsx: false` → `tsx: true`, update aliases to point to `src/` paths.

---

**Phase 1 — Scaffold New `src/` Structure**

6. Create the full directory tree:
   ```
   src/
    ├── app/
    │    ├── layout.tsx          (SERVER component — metadata, fonts, providers wrapper)
    │    ├── page.tsx            (homepage)
    │    ├── globals.css
    │    ├── loading.tsx         (global loading skeleton)
    │    ├── error.tsx           (global error boundary)
    │    ├── not-found.tsx       (custom 404)
    │    ├── (shop)/
    │    │    ├── layout.tsx     (shop layout with navbar/footer)
    │    │    ├── dresses/
    │    │    │    └── page.tsx
    │    │    ├── sarees/
    │    │    │    └── page.tsx
    │    │    ├── ethnic-wear/
    │    │    │    └── page.tsx
    │    │    ├── product/[id]/
    │    │    │    └── page.tsx
    │    │    ├── cart/
    │    │    │    └── page.tsx
    │    │    ├── checkout/
    │    │    │    └── page.tsx
    │    │    └── order-success/
    │    │         └── page.tsx
    │    ├── (info)/
    │    │    ├── about/page.tsx
    │    │    ├── contact/page.tsx
    │    │    ├── shipping/page.tsx
    │    │    ├── returns/page.tsx
    │    │    ├── faq/page.tsx
    │    │    ├── privacy/page.tsx
    │    │    └── terms/page.tsx
    │    ├── auth/
    │    │    └── page.tsx
    │    ├── admin/
    │    │    ├── layout.tsx     (admin guard + sidebar)
    │    │    ├── page.tsx       (dashboard redirect)
    │    │    ├── dashboard/page.tsx
    │    │    ├── products/page.tsx
    │    │    └── orders/page.tsx
    │    └── api/
    │         ├── products/
    │         │    ├── route.ts
    │         │    └── [id]/route.ts
    │         ├── orders/
    │         │    ├── route.ts
    │         │    └── [id]/route.ts
    │         └── upload/
    │              └── route.ts
    ├── components/
    │    ├── ui/                 (only 7 used shadcn components, converted to .tsx)
    │    │    ├── button.tsx
    │    │    ├── card.tsx
    │    │    ├── input.tsx
    │    │    ├── select.tsx
    │    │    ├── tabs.tsx
    │    │    ├── textarea.tsx
    │    │    └── sonner.tsx
    │    ├── layout/
    │    │    ├── Navbar.tsx     (preserve existing design exactly)
    │    │    ├── Footer.tsx     (fix dead links → point to new static pages)
    │    │    ├── PageHeader.tsx
    │    │    └── Providers.tsx  ('use client' — wraps AuthProvider + Toaster)
    │    ├── product/
    │    │    ├── ProductCard.tsx
    │    │    ├── ProductGrid.tsx      (extracted from category pages)
    │    │    ├── ProductFilters.tsx   (sort/filter extracted)
    │    │    └── ImageGallery.tsx     (extracted from product detail)
    │    ├── cart/
    │    │    ├── CartItem.tsx
    │    │    └── OrderSummary.tsx
    │    ├── admin/
    │    │    ├── AdminSidebar.tsx
    │    │    ├── ProductForm.tsx      (extracted from monolithic admin)
    │    │    ├── ProductList.tsx
    │    │    ├── OrderList.tsx
    │    │    └── DashboardMetrics.tsx
    │    ├── home/
    │    │    ├── HeroBanner.tsx
    │    │    ├── CategoryShowcase.tsx
    │    │    └── FeaturedProducts.tsx
    │    └── shared/
    │         ├── LoadingSkeleton.tsx
    │         └── EmptyState.tsx
    ├── lib/
    │    ├── firebase.ts         (Firebase client init — singleton)
    │    ├── firebase-admin.ts   (Firebase Admin SDK for API routes)
    │    ├── auth.ts             (auth helpers — signIn, signUp, signOut, Google)
    │    ├── products.ts         (Firestore product CRUD service layer)
    │    ├── orders.ts           (Firestore order service layer)
    │    └── categories.ts       (category definitions — preserve existing data)
    ├── hooks/
    │    ├── useAuth.ts          (onAuthStateChanged listener hook)
    │    └── useMediaQuery.ts    (replaces unused use-mobile.jsx)
    ├── stores/
    │    ├── auth-store.ts       (Zustand auth store — typed)
    │    └── cart-store.ts       (Zustand cart store — typed, remove duplicate method)
    ├── types/
    │    ├── product.ts          (Product, ProductFormData interfaces)
    │    ├── order.ts            (Order, OrderItem, OrderStatus types)
    │    ├── user.ts             (User, UserRole types)
    │    └── category.ts         (Category, Subcategory types)
    └── utils/
         ├── cn.ts               (clsx + tailwind-merge)
         └── format.ts           (currency formatter, date formatter)
   ```

---

**Phase 2 — Core Infrastructure (TypeScript + Firebase)**

7. **Create [src/types/](src/types/):** Define all TypeScript interfaces matching the Firestore schemas from the spec (`Product`, `User`, `Order`, `OrderItem`, `OrderStatus`, `UserRole`, `Category`, `Subcategory`).

8. **Migrate [lib/firebase.js](lib/firebase.js) → `src/lib/firebase.ts`:** Add proper typing. Keep singleton pattern. Remove demo fallback config values (use env vars only with runtime validation).

9. **Create `src/lib/firebase-admin.ts`:** Add Firebase Admin SDK for use in API routes (server-side only). This fixes the current anti-pattern of using client SDK in API routes.

10. **Create `src/lib/auth.ts`:** Extract all auth functions from [app/auth/page.js](app/auth/page.js) into a centralized service: `signInWithEmail()`, `signUpWithEmail()`, `signInWithGoogle()`, `signOut()`. Add user role management (create `users` Firestore collection on signup with `role: "customer"` default).

11. **Create `src/lib/products.ts`:** Extract product CRUD from [app/api/[[...path]]/route.js](app/api/%5B%5B...path%5D%5D/route.js) into typed service functions: `getProducts()`, `getProductById()`, `createProduct()`, `updateProduct()`, `deleteProduct()`.

12. **Create `src/lib/orders.ts`:** Extract order logic into: `createOrder()`, `getOrders()`, `getOrdersByUserId()`, `updateOrderStatus()`.

13. **Migrate [lib/categories.js](lib/categories.js) → `src/lib/categories.ts`:** Add types. Preserve existing category/subcategory data exactly. Remove unused `getAllCategories()` and `getSubcategories()` exports.

14. **Migrate [lib/store.js](lib/store.js) → split into `src/stores/auth-store.ts` + `src/stores/cart-store.ts`:** Add full TypeScript typing. Remove duplicate `getItemCount()` method (keep `getTotalItems()` only). Add stock validation on `addItem()`.

---

**Phase 3 — API Routes (Split Monolithic Route)**

15. **Create `src/app/api/products/route.ts`:** Handle `GET` (list with filters/pagination) and `POST` (create — admin auth required). Use Firebase Admin SDK. Add proper auth token verification.

16. **Create `src/app/api/products/[id]/route.ts`:** Handle `GET` (single), `PUT` (update — admin auth), `DELETE` (delete — admin auth).

17. **Create `src/app/api/orders/route.ts`:** Handle `GET` (list — admin gets all, customers get own) and `POST` (create — auth required).

18. **Create `src/app/api/orders/[id]/route.ts`:** Handle `PUT` (update status — admin only).

19. **Create `src/app/api/upload/route.ts`:** Handle `POST` (image upload — admin auth required).

20. **Delete [app/api/[[...path]]/route.js](app/api/%5B%5B...path%5D%5D/route.js)** — replaced by modular routes above.

---

**Phase 4 — Layout & Shared Components**

21. **Create `src/app/layout.tsx` (SERVER component):** Export static `metadata` object for SEO (title, description, openGraph). Import fonts with `next/font/google` (DM Sans only — remove duplicate CSS @import from globals.css). Render `<Providers>` client wrapper around `{children}`.

22. **Create `src/components/layout/Providers.tsx` (`'use client'`):** Contains `AuthProvider` logic (onAuthStateChanged listener synced to Zustand), `<Toaster />` from sonner. This isolates the client boundary.

23. **Migrate [components/Navbar.js](components/Navbar.js) → `src/components/layout/Navbar.tsx`:** Convert to TypeScript. Preserve design, styling, logo, mega-menu, categories exactly. Fix: add role check for admin link (only show if `user.role === 'admin'`). Add active route highlighting via `usePathname()`.

24. **Migrate [components/Footer.js](components/Footer.js) → `src/components/layout/Footer.tsx`:** Convert to TypeScript. Fix dead links to point to new `(info)` route group pages. Preserve all branding.

25. **Migrate [components/PageHeader.js](components/PageHeader.js) → `src/components/layout/PageHeader.tsx`:** Convert to TypeScript. Add proper props interface. Remove reference to non-existent `pattern-dots.svg`.

26. **Create `src/app/(shop)/layout.tsx`:** Server component wrapping shop pages with Navbar + Footer. This keeps admin pages free of the shop layout.

27. **Create shared components:** `LoadingSkeleton.tsx` (reusable skeleton loader), `EmptyState.tsx` (reusable empty state with icon + message).

---

**Phase 5 — Pages (Convert & Deduplicate)**

28. **Homepage `src/app/page.tsx`:** Break into sub-components: `HeroBanner`, `CategoryShowcase`, `FeaturedProducts`. Page itself becomes a server component fetching featured products server-side. Sub-components are client components only where interactivity is needed. Remove non-functional newsletter section.

29. **Category pages — Deduplicate:** Create a single reusable `src/components/product/ProductGrid.tsx` client component that accepts `category` and optional `subcategory` props. The three category pages (`dresses/page.tsx`, `sarees/page.tsx`, `ethnic-wear/page.tsx`) become thin server wrappers that pass the category slug to `ProductGrid`. This eliminates the ~80% code duplication between [app/[category]/page.js](app/%5Bcategory%5D/page.js) and [app/[category]/[subcategory]/page.js](app/%5Bcategory%5D/%5Bsubcategory%5D/page.js).

30. **Product detail `src/app/(shop)/product/[id]/page.tsx`:** Extract `ImageGallery` component. Fix size/color selection to properly track selected state and pass to cart. Add stock validation. Server component wrapper with client `ProductDetail` child.

31. **Cart `src/app/(shop)/cart/page.tsx`:** Extract `CartItem` and `OrderSummary` sub-components. Keep as client component (needs Zustand store).

32. **Checkout `src/app/(shop)/checkout/page.tsx`:** Keep demo payment placeholder (clearly marked). Add form validation. Keep auth guard.

33. **Auth `src/app/auth/page.tsx`:** Use centralized `src/lib/auth.ts` functions. On signup, create user doc in `users` collection with `role: "customer"`. Keep existing login/signup/Google UI. Preserve logo and branding.

34. **Admin — Split into sub-pages:**
    - `src/app/admin/layout.tsx`: Admin guard (check `user.role === 'admin'`), sidebar navigation.
    - `src/app/admin/dashboard/page.tsx`: Dashboard metrics (product count, order count, revenue).
    - `src/app/admin/products/page.tsx`: Product CRUD — uses `ProductForm` + `ProductList` components.
    - `src/app/admin/orders/page.tsx`: Order list + status update — uses `OrderList` component.
    - This breaks the current 729-line [app/admin/page.js](app/admin/page.js) into ~5 focused files.

35. **Static info pages (new):** Create simple content pages under `(info)` route group for: `/about` (migrate existing), `/contact` (migrate existing), `/shipping`, `/returns`, `/faq`, `/privacy`, `/terms` — each with appropriate static content and `PageHeader`.

36. **Order success `src/app/(shop)/order-success/page.tsx`:** Migrate with TypeScript. Keep demo payment status notice.

37. **Create `src/app/not-found.tsx`**, `src/app/error.tsx`, `src/app/loading.tsx` for proper error/loading boundaries.

---

**Phase 6 — CSS & Cleanup**

38. **Clean [app/globals.css](app/globals.css) → `src/app/globals.css`:** Remove duplicate DM Sans Google Fonts `@import` (handled by `next/font`). Remove 12+ unused CSS utility classes (`.btn-premium`, `.card-premium`, `.divider-elegant`, `.section-premium`, `.bg-animated-gradient`, `.glass`, `.text-gradient-gold`, `.text-gradient-peacock`, `.pattern-overlay`, `.img-zoom`, `.text-luxury`, `.border-gradient`). Remove dark mode CSS variables (not used). Keep Tailwind directives and any actively used custom styles.

39. **Convert used shadcn UI components (.jsx → .tsx):** Convert only the 7 used components: `button`, `card`, `input`, `select`, `tabs`, `textarea`, `sonner`. Add proper TypeScript typing.

40. **Delete all unused files:**
    - 43 unused shadcn UI components from `components/ui/`
    - [hooks/use-mobile.jsx](hooks/use-mobile.jsx) (never used)
    - [hooks/use-toast.js](hooks/use-toast.js) (project uses sonner instead)
    - [lib/demo-products.js](lib/demo-products.js) (if keeping, convert; otherwise remove if real data is expected)
    - [tests/__init__.py](tests/__init__.py) (Python file in a JS project)
    - All old `app/` and `components/` top-level files (replaced by `src/` equivalents)

---

**Phase 7 — Security**

41. **Create `firestore.rules`:** Implement Firestore security rules:
    - `products`: read for all, write only for users with `role === "admin"` in `users` collection
    - `orders`: create for authenticated users, read own orders, admin reads all, admin updates status
    - `users`: create on auth, read own profile, admin reads all
    - `categories`: read for all, write for admin only

42. **Add admin role verification to API routes:** Verify Firebase Auth ID token in request headers. Check `users/{uid}.role === "admin"` for write operations on products and order status updates.

43. **Tighten [next.config.ts](next.config.ts) headers:** Set restrictive CSP, `X-Frame-Options: DENY`, remove `Access-Control-Allow-Origin: *`.

---

**Phase 8 — SEO & Performance**

44. **Add `metadata` exports to all page files:** Each page gets static or dynamic metadata (title, description, openGraph) using Next.js 14 Metadata API. Category pages use `generateMetadata()` for dynamic titles.

45. **Server components by default:** Homepage, category listing wrappers, product detail wrapper, about, contact, info pages, admin dashboard — all server components. Client components only for: cart, checkout, auth, admin forms, product filters/sort, navbar interactions, image gallery.

46. **Add `loading.tsx` files** for route groups (`(shop)/loading.tsx`, `admin/loading.tsx`) with skeleton loaders.

47. **Lazy load heavy components:** Use `next/dynamic` for: `ImageGallery`, `ProductForm`, admin `DashboardMetrics` (with recharts if added), framer-motion animations.

---

### Verification

- Run `npx tsc --noEmit` to validate all TypeScript types compile cleanly
- Run `npm run build` to verify production build succeeds with no errors
- Manually verify in browser:
  - Homepage renders hero, categories, featured products
  - Each category page (`/dresses`, `/sarees`, `/ethnic-wear`) loads products
  - Product detail page shows image gallery, size/color selection works
  - Cart add/remove/quantity update works, persists across refresh
  - Checkout flow with demo payment creates order in Firestore
  - Auth login/signup/Google flow works, user doc created in `users` collection
  - Admin pages only accessible when `user.role === "admin"`
  - Admin product CRUD works (create, edit, delete with image upload)
  - Admin order list + status update works
  - Footer links to `/shipping`, `/returns`, `/faq`, `/privacy`, `/terms` all resolve
  - Logo unchanged, navbar design unchanged, categories unchanged
  - View page source → confirm SEO metadata present in HTML
- Test API auth: unauthenticated `POST /api/products` returns 401
- Deploy `firestore.rules` and verify via Firebase emulator

### Decisions

- **Zustand over Context API:** Kept Zustand — already implemented, performant, less boilerplate. Zustand stores moved to `src/stores/` with full TypeScript types.
- **Firebase Admin SDK for API routes:** Replacing client SDK usage in server routes with Admin SDK — fixes the security anti-pattern of exposing client credentials server-side.
- **Static category routes over dynamic `[category]`:** Using explicit `/dresses`, `/sarees`, `/ethnic-wear` routes instead of `[category]` catch-all — better SEO, type safety, and eliminates invalid category handling.
- **Demo products kept as seed data:** [lib/demo-products.js](lib/demo-products.js) preserved (converted to TypeScript) as `src/lib/seed-data.ts` for the admin seeding feature.
- **Route groups `(shop)` and `(info)`:** Used to share layouts — shop pages get navbar/footer, info pages get the same, admin gets its own sidebar layout.
- **Payment stays as demo:** Checkout clearly marked as demo mode with pending payment status, per user preference.
- **7 shadcn components kept, 43 deleted:** Only `button`, `card`, `input`, `select`, `tabs`, `textarea`, `sonner` are actually used. Others can be re-added via `npx shadcn-ui add <component>` if needed later.
create or use some saree, dress, and ethnic picture and display them in the hero page 
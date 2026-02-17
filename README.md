# Godha Collections - E-Commerce Platform

A modern, production-ready e-commerce website for ethnic wear, dresses, and traditional sarees.

## 🚀 Tech Stack

- **Frontend:** Next.js 14 + React
- **Styling:** Tailwind CSS + shadcn/ui
- **Backend:** Firebase (Firestore, Auth, Storage)
- **State Management:** Zustand
- **Payment:** Razorpay (Placeholder UI)

## ✨ Features Implemented

### Core Features
- ✅ Beautiful typography-based hero section (no image hero as requested)
- ✅ Complete navigation with category dropdowns
- ✅ Product listing & detail pages
- ✅ Shopping cart with persistent storage
- ✅ User authentication (Email/Password + Google)
- ✅ Admin dashboard for product & order management
- ✅ Image upload to Firebase Storage
- ✅ Responsive design (mobile + desktop)
- ✅ SEO optimized

### Navigation Structure
- **Ethnic** → Kurtis, 2 Piece Sets, 3 Piece Sets, Lehanga Sets
- **Dresses** → Frocks, Indo-Western
- **Sarees** → Mangalgiri, Kalamkari, Dharmavaram, Gadwal, Kanchivaram, Bengal, Pochampally

### Pages
1. **Home (/)** - Typography hero, category grid, featured products
2. **Category Pages (/{category})** - Product listings by category
3. **Subcategory Pages (/{category}/{subcategory})** - Filtered products
4. **Product Detail (/product/{id})** - Full product info with image gallery
5. **Cart (/cart)** - Shopping cart management
6. **Checkout (/checkout)** - Order placement with Razorpay placeholder
7. **Auth (/auth)** - Login/Signup with Firebase
8. **Admin (/admin)** - Product CRUD + Order management

## 🎨 Design

The design follows the brand colors from the Godha Collections logo:
- **Peacock Blue** - Primary brand color
- **Gold/Amber** - Accent color
- **Soft Pink** - Highlights & decorative elements
- **Earthy Brown** - Supporting tones

## ⚙️ Setup Instructions

### 1. Firebase Setup (CRITICAL)

The Firebase Firestore API needs to be enabled:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **godha-ecommerce**
3. Enable Firestore Database:
   - Visit: https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=godha-ecommerce
   - Click "Enable API"
   - Wait 2-3 minutes for propagation

4. Enable Firebase Storage:
   - In Firebase Console → Storage
   - Click "Get Started"
   - Accept default rules

5. Enable Authentication:
   - In Firebase Console → Authentication
   - Enable Email/Password provider
   - Enable Google provider

### 2. Local Development

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Access application
http://localhost:3000
```

### 3. Environment Variables

All Firebase credentials are already configured in:
- `/app/lib/firebase.js` - Firebase SDK initialization

## 📁 Project Structure

```
/app
├── app/
│   ├── page.js                      # Home page
│   ├── layout.js                    # Root layout with navbar/footer
│   ├── auth/page.js                 # Authentication
│   ├── cart/page.js                 # Shopping cart
│   ├── checkout/page.js             # Checkout process
│   ├── order-success/page.js        # Order confirmation
│   ├── admin/page.js                # Admin dashboard
│   ├── [category]/page.js           # Dynamic category pages
│   ├── [category]/[subcategory]/page.js  # Dynamic subcategory pages
│   ├── product/[productId]/page.js  # Product details
│   └── api/[[...path]]/route.js     # Backend API
│
├── components/
│   ├── Navbar.js                    # Navigation with dropdowns
│   ├── Footer.js                    # Footer component
│   ├── ProductCard.js               # Product card component
│   └── ui/                          # shadcn/ui components
│
├── lib/
│   ├── firebase.js                  # Firebase initialization
│   ├── store.js                     # Zustand state management
│   ├── categories.js                # Category structure
│   └── utils.js                     # Utility functions
│
└── package.json
```

## 🛠 API Endpoints

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/{id}` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/{id}` - Update product (admin)
- `DELETE /api/products/{id}` - Delete product (admin)

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create order

### Upload
- `POST /api/upload` - Upload image to Firebase Storage

## 👨‍💼 Admin Dashboard

Access: `/admin` (requires authentication)

Features:
- Add/Edit/Delete products
- Upload product images
- Manage inventory
- View all orders
- Category & subcategory assignment

## 🎯 How to Use

### For Admin (Adding Products):

1. Go to `/auth` and create an account (or sign in with Google)
2. Navigate to `/admin`
3. Fill in product details:
   - Name, Price, Category, Subcategory
   - Description, Stock, Sizes, Colors
   - Upload product image
4. Click "Add Product"
5. Products will appear on category pages automatically

### For Customers:

1. Browse products by category from navigation
2. Click on products to view details
3. Add to cart
4. Go to checkout (requires login)
5. Fill shipping information
6. Place order (Razorpay placeholder shown)

## 🚨 Important Notes

### Firebase Firestore Error
If you see this error:
```
PERMISSION_DENIED: Cloud Firestore API has not been used in project
```

**Solution:** Follow step 1 in Setup Instructions above to enable Firestore API.

### Razorpay Payment
- Currently showing **placeholder UI only**
- To integrate actual Razorpay:
  1. Get Razorpay API keys from dashboard
  2. Add to environment variables
  3. Implement payment gateway in checkout flow

## 🎨 Design Decisions

### NO Hero Image
As per requirements, the home page uses an elegant typography-based hero with decorative patterns instead of images.

### Color Palette
Extracted from the Godha Collections logo:
- Primary: Blue-900 (#1E3A8A)
- Accent: Amber-600 (#D97706)
- Highlight: Pink-200 (#FBCFE8)
- Text: Gray-900

### Mobile First
All pages are fully responsive with mobile-first design approach.

## 📱 Features Breakdown

### Implemented ✅
- Product catalog with categories
- Shopping cart with persistence
- User authentication (Email + Google)
- Admin dashboard
- Order management
- Image uploads
- Responsive design
- SEO optimization
- Typography-based hero

### Placeholder/Demo 🔶
- Razorpay payment (UI only)
- Newsletter subscription (UI only)

## 🔒 Security

- Firebase Authentication for user management
- Admin access available to all authenticated users (for demo)
- Firestore security rules should be configured in production
- Image uploads validated by Firebase Storage rules

## 🚀 Deployment

The application is ready for deployment to:
- Vercel (recommended for Next.js)
- Firebase Hosting
- Any Node.js hosting platform

## 📝 License

© 2025 Godha Collections. All rights reserved.

---

**Built with ❤️ for Godha Collections**

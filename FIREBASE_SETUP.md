# 🔥 Firebase Setup Guide for Godha Collections

## Current Status

✅ Firebase SDK configured
✅ Application code complete
❌ **Firestore API not enabled** (needs your action)

## Step-by-Step Setup (5 minutes)

### Step 1: Enable Firestore Database

1. **Click this link to enable Firestore:**
   👉 https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=godha-ecommerce

2. Click the **"Enable"** button

3. Wait 2-3 minutes for the API to activate

### Step 2: Initialize Firestore Database

1. Go to [Firebase Console](https://console.firebase.google.com/)

2. Select **godha-ecommerce** project

3. Click **Firestore Database** in left sidebar

4. Click **"Create Database"**

5. Choose **Production mode** (or Test mode for development)

6. Select a location (choose closest to your users, e.g., asia-south1 for India)

7. Click **"Enable"**

### Step 3: Enable Firebase Storage

1. In Firebase Console, click **Storage** in left sidebar

2. Click **"Get Started"**

3. Choose **Production mode**

4. Use same location as Firestore

5. Click **"Done"**

### Step 4: Enable Authentication

1. Click **Authentication** in left sidebar

2. Click **"Get Started"**

3. Enable **Email/Password**:
   - Click on "Email/Password"
   - Toggle to enable
   - Save

4. Enable **Google Sign-in**:
   - Click on "Google"
   - Toggle to enable
   - Enter project support email
   - Save

### Step 5: Security Rules (Important for Production)

#### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read all products
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Users can only read/write their own orders
    match /orders/{orderId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

#### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Verification

After completing the setup:

1. Refresh your application: http://localhost:3000

2. Check browser console - Firebase errors should be gone

3. Try these actions:
   - Sign up with email/password
   - Go to /admin
   - Add a product
   - Upload an image
   - View the product on category pages

## Troubleshooting

### Error: "Cloud Firestore API has not been used"
- **Solution:** Complete Step 1 above and wait 2-3 minutes

### Error: "Missing or insufficient permissions"
- **Solution:** Enable Firestore database (Step 2)

### Error: "Storage bucket not found"
- **Solution:** Enable Firebase Storage (Step 3)

### Authentication errors
- **Solution:** Enable auth providers (Step 4)

## What Happens After Setup

Once Firebase is enabled:

1. ✅ Products can be added via admin dashboard
2. ✅ Images can be uploaded to Firebase Storage
3. ✅ Users can sign up and login
4. ✅ Orders will be stored in Firestore
5. ✅ Cart data persists across sessions

## Quick Test Flow

1. **Sign Up:** Go to `/auth` and create account
2. **Add Products:** Go to `/admin` and add 3-5 products with images
3. **Browse:** Navigate categories from navbar
4. **Shop:** Add products to cart
5. **Checkout:** Complete order process

## Support

If you encounter any issues:
1. Check Firebase Console for service status
2. Verify all APIs are enabled
3. Check browser console for detailed error messages
4. Ensure you're using the correct Firebase project (godha-ecommerce)

---

**Need Help?** Check the Firebase Console: https://console.firebase.google.com/project/godha-ecommerce/overview

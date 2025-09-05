# FlowLaunch Setup Guide

This guide will walk you through setting up FlowLaunch, your production-ready SaaS starter template, with all the required third-party services.

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd flowlaunch
npm install
```

### 2. Environment Variables

Copy the environment template:

```bash
cp .env.local.example .env.local
```

Now configure each service as described below.

## 🔥 Firebase Setup

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `flowlaunch-app` (or your preferred name)
4. Enable Google Analytics (optional)
5. Create project

### Step 2: Enable Authentication

1. In Firebase Console, go to "Authentication" > "Get started"
2. Go to "Sign-in method" tab
3. Enable the following providers:
   - **Email/Password**: Click "Enable" → Save
   - **Google**: Click "Enable" → Add your email as test user → Save

### Step 3: Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Web app" icon (`</>`)
4. Register app with name: `FlowLaunch`
5. Copy the configuration values to your `.env.local`:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Step 4: Firebase Admin SDK

1. In Firebase Console, go to Project Settings
2. Go to "Service accounts" tab
3. Click "Generate new private key"
4. Download the JSON file
5. Add these values to your `.env.local`:

```env
# Firebase Admin
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project_id.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

**Important**: Keep the quotes around the private key and include the `\n` characters.

## 💳 Stripe Setup

### Step 1: Create Stripe Account

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create account or sign in
3. Complete account verification

### Step 2: Get API Keys

1. In Stripe Dashboard, go to "Developers" > "API keys"
2. Copy the keys to your `.env.local`:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx (we'll get this in step 4)
```

### Step 3: Create Products and Prices

1. Go to "Products" in Stripe Dashboard
2. Click "Add product"
3. Create your pricing plans:

**Example Basic Plan:**

- Name: "FlowLaunch Basic"
- Description: "Perfect for getting started"
- Pricing: $9.99/month
- Copy the Price ID (starts with `price_`)

**Example Pro Plan:**

- Name: "FlowLaunch Pro"
- Description: "For growing businesses"
- Pricing: $29.99/month
- Copy the Price ID

Add to `.env.local`:

```env
NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY=price_xxxxx
NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY=price_xxxxx
```

### Step 4: Configure Webhooks

1. Go to "Developers" > "Webhooks"
2. Click "Add endpoint"
3. Endpoint URL: `https://yourdomain.com/api/webhook` (use ngrok for local testing)
4. Select events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the webhook signing secret to your `.env.local`

**For Local Development:**

```bash
# Install Stripe CLI
npm install -g stripe-cli

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhook
```

## 🗄️ MongoDB Setup

### Option 1: MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create account or sign in
3. Create new cluster:
   - Choose "Free" tier
   - Select region closest to you
   - Name: `flowlaunch-cluster`
4. Create database user:
   - Username: `flowlaunch-user`
   - Password: Generate strong password
5. Configure network access:
   - Add IP: `0.0.0.0/0` (allow from anywhere)
6. Get connection string:
   - Click "Connect" > "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

Add to `.env.local`:

```env
MONGODB_URI=mongodb+srv://flowlaunch-user:<password>@flowlaunch-cluster.xxxxx.mongodb.net/flowlaunch?retryWrites=true&w=majority
```

### Option 2: Local MongoDB

```bash
# Install MongoDB locally
# macOS
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Add to .env.local
MONGODB_URI=mongodb://localhost:27017/flowlaunch
```

## 🚀 Run the Application

### Development Mode

```bash
npm run dev
```

Visit: `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## 🔧 Configuration Checklist

Before going live, ensure you have:

- [ ] Firebase project configured with Authentication enabled
- [ ] Firebase Admin SDK credentials added
- [ ] Stripe account with products/prices created
- [ ] Stripe webhooks configured and tested
- [ ] MongoDB database connected
- [ ] Environment variables properly set
- [ ] Domain configured in Firebase Auth settings
- [ ] Stripe webhook endpoint updated with production URL

## 📝 Environment Variables Summary

Your final `.env.local` should look like this:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project_id.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY=price_xxxxx
NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY=price_xxxxx

# MongoDB
MONGODB_URI=mongodb+srv://user:password@cluster.xxxxx.mongodb.net/flowlaunch?retryWrites=true&w=majority

# App Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_key_here
```

## 🚀 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repo to [Vercel](https://vercel.com)
3. Add all environment variables in Vercel dashboard
4. Deploy!

### Important Notes

- Update Firebase Auth authorized domains with your production URL
- Update Stripe webhook endpoint with production URL
- Use production Stripe keys for live deployment
- Ensure MongoDB Atlas allows connections from Vercel IPs

## 🆘 Troubleshooting

### Common Issues

**Firebase Auth Error**

- Check that all Firebase config values are correct
- Ensure Firebase Auth is enabled
- Verify authorized domains include your app URL

**Stripe Payment Issues**

- Confirm webhook endpoint is reachable
- Check webhook events are properly selected
- Verify price IDs are correct

**MongoDB Connection Failed**

- Ensure MongoDB URI is correct
- Check network access settings in Atlas
- Verify database user has proper permissions

**Build Errors**

- Run `npm run build` locally to check for issues
- Ensure all environment variables are set
- Check for TypeScript errors

## 🎉 Success!

Once everything is set up, you'll have a fully functional SaaS application with:

- User authentication and registration
- Subscription billing with Stripe
- Protected dashboard
- User management
- Usage analytics
- Admin panel

Ready to launch your SaaS in the flow! 🚀

## 📞 Support

Need help? Check the following resources:

- [Firebase Documentation](https://firebase.google.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Next.js Documentation](https://nextjs.org/docs)

Happy building with FlowLaunch! 🎯

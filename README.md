# FlowLaunch - Launch Your SaaS in the Flow

A production-ready SaaS starter template built with Next.js, Firebase Authentication, Stripe billing, MongoDB, and TailwindCSS. FlowLaunch provides all the essential features you need to launch a subscription-based web application quickly and efficiently.

## 🚀 Features

- **🔐 Authentication**: Firebase Auth with email/password and Google OAuth
- **💳 Billing**: Complete Stripe integration with subscriptions and customer portal
- **📊 Dashboard**: Beautiful user dashboard with usage statistics
- **🗄️ Database**: MongoDB with Mongoose ODM for data modeling
- **🎨 UI/UX**: Responsive design with TailwindCSS
- **🔒 Protected Routes**: Secure dashboard routes with authentication
- **📱 Mobile Responsive**: Works perfectly on all devices
- **🚀 Production Ready**: TypeScript, ESLint, and deployment-ready

## 🛠️ Tech Stack

- **Frontend/Backend**: Next.js 14 with App Router
- **Authentication**: Firebase Authentication
- **Payments**: Stripe Checkout & Customer Portal
- **Database**: MongoDB with Mongoose
- **Styling**: TailwindCSS
- **Language**: TypeScript
- **Icons**: Heroicons

## 📦 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/saas-starter-template.git
cd saas-starter-template
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Copy the environment variables file:

```bash
cp .env.example .env.local
```

### 4. Configure Services

#### Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication and add Email/Password and Google providers
4. Go to Project Settings > General and copy your config
5. Generate a new private key for Firebase Admin SDK
6. Update your `.env.local` with Firebase credentials

#### Stripe Setup

1. Go to the [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get your publishable and secret keys from API keys section
3. Create products and prices in the Products section
4. Set up a webhook endpoint pointing to `https://yourdomain.com/api/webhook`
5. Copy the webhook secret
6. Update your `.env.local` with Stripe credentials

#### MongoDB Setup

1. Create a MongoDB Atlas account or use local MongoDB
2. Create a new database
3. Get your connection string
4. Update `MONGODB_URI` in your `.env.local`

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 🔧 Configuration

### Environment Variables

Make sure to set up all required environment variables in `.env.local`:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# Firebase Admin SDK
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project.iam.gserviceaccount.com
FIREBASE_ADMIN_PROJECT_ID=your_project_id

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_51xxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51xxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxx

# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/saas_starter

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="SaaS Starter"

# Stripe Price IDs
STRIPE_PRICE_ID_MONTHLY=price_1xxxxxxx
STRIPE_PRICE_ID_ANNUAL=price_1xxxxxxx
```

### Firebase Configuration

1. **Authentication Setup**:

   - Enable Email/Password authentication
   - Enable Google authentication (optional)
   - Configure authorized domains

2. **Security Rules**:
   - Set up Firestore security rules if using Firestore
   - Configure authentication rules

### Stripe Configuration

1. **Create Products and Prices**:

   ```bash
   # Example: Create a monthly subscription product
   curl https://api.stripe.com/v1/products \
     -u sk_test_...: \
     -d name="Pro Plan" \
     -d description="Access to all pro features"

   # Create a price for the product
   curl https://api.stripe.com/v1/prices \
     -u sk_test_...: \
     -d product=prod_... \
     -d unit_amount=2900 \
     -d currency=usd \
     -d "recurring[interval]"=month
   ```

2. **Webhook Configuration**:
   - Add webhook endpoint: `https://yourdomain.com/api/webhook`
   - Select events: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded`, `invoice.payment_failed`

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── user/          # User management
│   │   ├── usage-stats/   # Usage statistics
│   │   ├── webhook/       # Stripe webhooks
│   │   └── ...
│   ├── dashboard/         # Protected dashboard pages
│   ├── login/            # Authentication pages
│   ├── signup/
│   └── layout.tsx        # Root layout
├── components/            # React components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── Pricing.tsx
│   ├── Footer.tsx
│   ├── DashboardSidebar.tsx
│   └── ProtectedRoute.tsx
├── contexts/             # React contexts
│   └── AuthContext.tsx
├── lib/                  # Library configurations
│   ├── firebase.ts
│   ├── firebase-admin.ts
│   ├── mongodb.ts
│   └── stripe.ts
├── models/               # Database models
│   ├── User.ts
│   └── UsageStats.ts
├── types/                # TypeScript types
│   └── index.ts
├── utils/                # Utility functions
│   └── index.ts
└── styles/               # Styling
    └── globals.css
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set up environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- **Netlify**: Use `@netlify/plugin-nextjs`
- **Railway**: Direct deployment support
- **Heroku**: Use the Next.js buildpack
- **AWS**: Use AWS Amplify or EC2

### Environment Variables for Production

Make sure to update these for production:

- Set `NEXT_PUBLIC_APP_URL` to your production domain
- Use production Stripe keys
- Use production Firebase project
- Set up production MongoDB database

## 🔐 Security

- All API routes are protected with Firebase Admin authentication
- Stripe webhooks are verified with webhook signatures
- User data is validated and sanitized
- CORS is properly configured
- Environment variables are used for sensitive data

## 📊 Monitoring

Consider adding these monitoring tools:

- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **Mixpanel/Analytics**: User analytics
- **Stripe Dashboard**: Payment monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@yourcompany.com
- 💬 Discord: [Join our community](https://discord.gg/yourserver)
- 📖 Documentation: [Full documentation](https://docs.yoursite.com)
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/saas-starter-template/issues)

## 🎯 Roadmap

- [ ] Multi-language support (i18n)
- [ ] Email templates and notifications
- [ ] Admin panel for user management
- [ ] API rate limiting
- [ ] Advanced analytics
- [ ] Team/organization support
- [ ] White-label customization

---

**Built with ❤️ for the startup community**

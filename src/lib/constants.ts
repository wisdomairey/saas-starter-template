export const PRICING_PLANS = {
  FREE: {
    name: 'Free',
    price: 0,
    interval: 'month' as const,
    features: [
      '1,000 API calls/month',
      '100MB storage',
      'Email support',
      'Basic dashboard',
    ],
    limits: {
      apiCalls: 1000,
      storage: 100, // MB
      bandwidth: 1000, // MB
    },
  },
  PRO_MONTHLY: {
    name: 'Pro (Monthly)',
    price: 29,
    interval: 'month' as const,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY,
    features: [
      '50,000 API calls/month',
      '10GB storage',
      'Priority support',
      'Advanced dashboard',
      'Custom integrations',
      'Analytics & reporting',
    ],
    limits: {
      apiCalls: 50000,
      storage: 10000, // MB
      bandwidth: 50000, // MB
    },
  },
  PRO_ANNUAL: {
    name: 'Pro (Annual)',
    price: 290, // $29 * 10 (2 months free)
    interval: 'year' as const,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ANNUAL,
    features: [
      '50,000 API calls/month',
      '10GB storage',
      'Priority support',
      'Advanced dashboard',
      'Custom integrations',
      'Analytics & reporting',
      '2 months free',
    ],
    limits: {
      apiCalls: 50000,
      storage: 10000, // MB
      bandwidth: 50000, // MB
    },
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: 99,
    interval: 'month' as const,
    features: [
      'Unlimited API calls',
      'Unlimited storage',
      '24/7 phone support',
      'Custom dashboard',
      'Dedicated account manager',
      'SLA guarantee',
      'Custom contracts',
    ],
    limits: {
      apiCalls: -1, // Unlimited
      storage: -1, // Unlimited
      bandwidth: -1, // Unlimited
    },
  },
} as const;

export const FEATURE_FLAGS = {
  GOOGLE_AUTH: true,
  CUSTOMER_PORTAL: true,
  USAGE_TRACKING: true,
  ANALYTICS: true,
  ADMIN_PANEL: true,
} as const;

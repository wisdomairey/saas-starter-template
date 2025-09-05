export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  stripeCustomerId?: string;
  subscription?: Subscription;
}

export interface Subscription {
  id: string;
  status: 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'trialing' | 'unpaid';
  priceId: string;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

export interface UsageStats {
  period: string;
  apiCalls: number;
  storageUsed: number;
  bandwidthUsed: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  stripePriceId: string;
  features: string[];
  popular?: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

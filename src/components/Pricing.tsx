'use client';

import { CheckIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';

const plans = [
  {
    name: 'Free',
    price: 0,
    interval: 'month' as const,
    description: 'Perfect for getting started',
    features: [
      '1,000 API calls/month',
      '100MB storage',
      'Email support',
      'Basic dashboard',
    ],
    stripePriceId: null,
    popular: false,
  },
  {
    name: 'Pro',
    price: 29,
    interval: 'month' as const,
    description: 'Best for growing businesses',
    features: [
      '50,000 API calls/month',
      '10GB storage',
      'Priority support',
      'Advanced dashboard',
      'Custom integrations',
      'Analytics & reporting',
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY,
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 99,
    interval: 'month' as const,
    description: 'For large scale applications',
    features: [
      'Unlimited API calls',
      'Unlimited storage',
      '24/7 phone support',
      'Custom dashboard',
      'Dedicated account manager',
      'SLA guarantee',
      'Custom contracts',
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ANNUAL,
    popular: false,
  },
];

export default function Pricing() {
  const { user } = useAuth();

  const handleUpgrade = async (priceId: string | null) => {
    if (!priceId) return;
    
    if (!user) {
      // Redirect to signup if not logged in
      window.location.href = '/signup';
      return;
    }

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await user.getIdToken()}`,
        },
        body: JSON.stringify({
          priceId,
          successUrl: `${window.location.origin}/dashboard?success=true`,
          cancelUrl: `${window.location.origin}/#pricing`,
        }),
      });

      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url;
      } else {
        console.error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that best fits your needs. All plans include our core features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-lg shadow-sm border-2 p-8 ${
                plan.popular
                  ? 'border-primary-500 ring-2 ring-primary-200'
                  : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="text-4xl font-bold text-gray-900">
                  ${plan.price}
                  <span className="text-lg font-normal text-gray-600">
                    /{plan.interval}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => plan.stripePriceId && handleUpgrade(plan.stripePriceId)}
                disabled={!plan.stripePriceId && plan.price > 0}
                className={`w-full btn btn-lg ${
                  plan.popular
                    ? 'btn-primary'
                    : 'btn-outline'
                } ${!plan.stripePriceId && plan.price > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {plan.price === 0 ? 'Get Started Free' : 'Upgrade Now'}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <span>✓ Cancel anytime</span>
            <span>✓ No setup fees</span>
            <span>✓ 30-day money back guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
}

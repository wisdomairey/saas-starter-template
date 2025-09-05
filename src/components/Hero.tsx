'use client';

import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  return (
    <section className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Launch Your SaaS in the
            <span className="text-primary-600"> Flow</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            FlowLaunch is your production-ready starter template with authentication, billing, and dashboard.
            Built with Next.js, Firebase, Stripe, and MongoDB. Save weeks of development time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/signup"
              className="btn btn-primary btn-lg inline-flex items-center space-x-2"
            >
              <span>Get Started Free</span>
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
            <Link
              href="#features"
              className="btn btn-outline btn-lg"
            >
              Learn More
            </Link>
          </div>

          <div className="mt-12 text-sm text-gray-500">
            ✅ No credit card required • ✅ 14-day free trial • ✅ Cancel anytime
          </div>
        </div>

        {/* Hero Image/Demo */}
        <div className="mt-16">
          <div className="bg-gray-100 rounded-lg p-8 shadow-xl">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="bg-gray-50 rounded p-4">
                <div className="text-sm text-gray-600 mb-2">dashboard.saas-starter.com</div>
                <div className="space-y-2">
                  <div className="h-4 bg-primary-200 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  <div className="flex space-x-2 mt-4">
                    <div className="h-8 bg-primary-500 rounded w-20"></div>
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-gray-900">10+</div>
            <div className="text-gray-600">Ready-to-use Components</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">5 min</div>
            <div className="text-gray-600">Setup Time</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">100%</div>
            <div className="text-gray-600">TypeScript</div>
          </div>
        </div>
      </div>
    </section>
  );
}

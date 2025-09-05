'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardSidebar from '@/components/DashboardSidebar';
import { 
  ChartBarIcon,
  CreditCardIcon,
  UserGroupIcon,
  BanknotesIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';

interface UsageStats {
  apiCalls: number;
  storageUsed: number;
  bandwidthUsed: number;
}

export default function DashboardPage() {
  const { user, customUser } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState<UsageStats>({
    apiCalls: 0,
    storageUsed: 0,
    bandwidthUsed: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      if (user) {
        const response = await fetch('/api/usage-stats', {
          headers: {
            Authorization: `Bearer ${await user.getIdToken()}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setStats(data.stats || { apiCalls: 0, storageUsed: 0, bandwidthUsed: 0 });
        }
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async () => {
    try {
      if (!user) return;
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await user.getIdToken()}`,
        },
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY,
          successUrl: `${window.location.origin}/dashboard?success=true`,
          cancelUrl: `${window.location.origin}/dashboard`,
        }),
      });

      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  const handleManageBilling = async () => {
    try {
      if (!user || !customUser?.stripeCustomerId) return;
      
      const response = await fetch('/api/customer-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await user.getIdToken()}`,
        },
        body: JSON.stringify({
          returnUrl: `${window.location.origin}/dashboard`,
        }),
      });

      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating customer portal session:', error);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
              <h1 className="ml-2 lg:ml-0 text-2xl font-semibold text-gray-900">
                FlowLaunch Dashboard
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {customUser?.subscription?.status === 'active' ? (
                <button
                  onClick={handleManageBilling}
                  className="btn btn-outline btn-sm"
                >
                  Manage Billing
                </button>
              ) : (
                <button
                  onClick={handleUpgrade}
                  className="btn btn-primary btn-sm"
                >
                  Upgrade Plan
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Welcome section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-1">
              Welcome back, {user?.displayName || user?.email}!
            </h2>
            <p className="text-gray-600">
              Here's an overview of your account activity.
            </p>
          </div>

          {/* Subscription status */}
          {customUser?.subscription && (
            <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Current Plan
                  </h3>
                  <p className="text-gray-600">
                    Status: <span className="capitalize font-medium text-green-600">
                      {customUser.subscription.status}
                    </span>
                  </p>
                  {customUser.subscription.currentPeriodEnd && (
                    <p className="text-sm text-gray-500">
                      Next billing: {new Date(customUser.subscription.currentPeriodEnd).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <CreditCardIcon className="h-12 w-12 text-primary-600" />
              </div>
            </div>
          )}

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ChartBarIcon className="h-8 w-8 text-primary-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      API Calls This Month
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {loading ? '...' : stats.apiCalls.toLocaleString()}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BanknotesIcon className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Storage Used
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {loading ? '...' : formatBytes(stats.storageUsed * 1024 * 1024)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserGroupIcon className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Bandwidth Used
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {loading ? '...' : formatBytes(stats.bandwidthUsed * 1024 * 1024)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors">
                  <div className="font-medium text-gray-900">View Analytics</div>
                  <div className="text-sm text-gray-600">Detailed usage statistics and insights</div>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors">
                  <div className="font-medium text-gray-900">API Documentation</div>
                  <div className="text-sm text-gray-600">Learn how to integrate our API</div>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors">
                  <div className="font-medium text-gray-900">Support Center</div>
                  <div className="text-sm text-gray-600">Get help and contact support</div>
                </button>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">API key created</div>
                    <div className="text-xs text-gray-500">2 hours ago</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">Account verified</div>
                    <div className="text-xs text-gray-500">1 day ago</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">Profile updated</div>
                    <div className="text-xs text-gray-500">3 days ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

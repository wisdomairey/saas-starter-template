'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Bars3Icon, UserIcon } from '@heroicons/react/24/outline';

interface AdminUser {
  uid: string;
  email: string;
  displayName?: string;
  createdAt: string;
  subscription?: {
    status: string;
    priceId: string;
  };
}

export default function AdminPage() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    // Mock data for demonstration since we haven't implemented the admin API
    const mockUsers: AdminUser[] = [
      {
        uid: '1',
        email: 'john@example.com',
        displayName: 'John Doe',
        createdAt: '2024-01-15',
        subscription: { status: 'active', priceId: 'price_monthly' }
      },
      {
        uid: '2',
        email: 'jane@example.com',
        displayName: 'Jane Smith',
        createdAt: '2024-01-20',
        subscription: { status: 'canceled', priceId: 'price_monthly' }
      },
      {
        uid: '3',
        email: 'bob@example.com',
        displayName: 'Bob Johnson',
        createdAt: '2024-01-25',
      }
    ];

    try {
      if (user) {
        // Note: In a real application, you'd want to check if the user has admin permissions
        // This is a simplified version for demonstration
        const response = await fetch('/api/admin/users', {
          headers: {
            'Authorization': `Bearer ${await user.getIdToken()}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data.users || []);
        } else {
          // Fallback to mock data if API not available
          setUsers(mockUsers);
        }
      } else {
        // Use mock data if not logged in
        setUsers(mockUsers);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      // Fallback to mock data on error
      setUsers(mockUsers);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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
                Admin Panel
              </h1>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-1">
              User Management
            </h2>
            <p className="text-gray-600">
              Manage all users and their subscriptions.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserIcon className="h-8 w-8 text-primary-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Users
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {users.length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserIcon className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Active Subscriptions
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {users.filter(u => u.subscription?.status === 'active').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserIcon className="h-8 w-8 text-red-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Free Users
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {users.filter(u => !u.subscription || u.subscription.status !== 'active').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Users table */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">All Users</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subscription
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                        Loading users...
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                        No users found. Using demo data.
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                    <tr key={user.uid}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <UserIcon className="h-6 w-6 text-gray-400" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.displayName || 'Unknown'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.subscription ? (
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.subscription.status === 'active' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.subscription.status}
                          </span>
                        ) : (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                            Free
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-900">
                          View Details
                        </button>
                      </td>
                    </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

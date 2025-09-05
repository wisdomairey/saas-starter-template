import {
  CreditCardIcon,
  ShieldCheckIcon,
  CogIcon,
  ChartBarIcon,
  UserGroupIcon,
  CloudIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    icon: ShieldCheckIcon,
    title: 'Firebase Authentication',
    description: 'Secure email/password and Google OAuth authentication with user management.',
  },
  {
    icon: CreditCardIcon,
    title: 'Stripe Integration',
    description: 'Complete billing system with subscriptions, checkout, and customer portal.',
  },
  {
    icon: CloudIcon,
    title: 'MongoDB Database',
    description: 'Scalable NoSQL database with Mongoose ODM for data modeling.',
  },
  {
    icon: ChartBarIcon,
    title: 'Analytics Dashboard',
    description: 'Beautiful dashboard with usage stats and subscription management.',
  },
  {
    icon: CogIcon,
    title: 'Production Ready',
    description: 'TypeScript, ESLint, Tailwind CSS, and deployment-ready configuration.',
  },
  {
    icon: UserGroupIcon,
    title: 'User Management',
    description: 'Complete user profiles, subscription status, and admin panel.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Launch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A complete SaaS foundation with all the essential features built-in.
            No need to reinvent the wheel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Technology Stack */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">
            Built with Modern Technologies
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-lg font-medium text-gray-700">Next.js</div>
            <div className="text-lg font-medium text-gray-700">TypeScript</div>
            <div className="text-lg font-medium text-gray-700">Firebase</div>
            <div className="text-lg font-medium text-gray-700">Stripe</div>
            <div className="text-lg font-medium text-gray-700">MongoDB</div>
            <div className="text-lg font-medium text-gray-700">Tailwind CSS</div>
          </div>
        </div>
      </div>
    </section>
  );
}

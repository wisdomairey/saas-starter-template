import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FlowLaunch - Launch Your SaaS in the Flow',
  description: 'Production-ready SaaS starter with Next.js, Firebase, Stripe, and MongoDB',
  keywords: ['FlowLaunch', 'SaaS', 'starter', 'template', 'Next.js', 'Firebase', 'Stripe', 'MongoDB'],
  authors: [{ name: 'FlowLaunch Team' }],
  openGraph: {
    title: 'FlowLaunch - Launch Your SaaS in the Flow',
    description: 'Production-ready SaaS starter with Next.js, Firebase, Stripe, and MongoDB',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

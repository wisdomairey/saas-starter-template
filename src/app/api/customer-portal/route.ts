import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import connectToDatabase from '@/lib/mongodb';
import { User } from '@/models/User';
import { createCustomerPortalSession } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const authorization = request.headers.get('authorization');
    if (!authorization?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authorization.split('Bearer ')[1];
    
    if (!adminAuth) {
      return NextResponse.json({ error: 'Authentication service unavailable' }, { status: 503 });
    }
    
    const decodedToken = await adminAuth.verifyIdToken(token);
    
    const body = await request.json();
    const { returnUrl } = body;

    await connectToDatabase();
    
    const user = await User.findOne({ uid: decodedToken.uid });
    if (!user || !user.stripeCustomerId) {
      return NextResponse.json({ error: 'No Stripe customer found' }, { status: 404 });
    }

    // Create customer portal session
    const session = await createCustomerPortalSession(
      user.stripeCustomerId,
      returnUrl
    );

    return NextResponse.json({ 
      success: true, 
      url: session.url 
    });
  } catch (error) {
    console.error('Error creating customer portal session:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

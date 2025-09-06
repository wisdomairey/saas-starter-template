import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import connectToDatabase from '@/lib/mongodb';
import { User } from '@/models/User';
import { createCheckoutSession, createStripeCustomer } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const authorization = request.headers.get('authorization');
    if (!authorization?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authorization.split('Bearer ')[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    
    const body = await request.json();
    const { priceId, successUrl, cancelUrl } = body;

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
    }

    await connectToDatabase();
    
    const user = await User.findOne({ uid: decodedToken.uid });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create Stripe customer if doesn't exist
    if (!user.stripeCustomerId) {
      const customer = await createStripeCustomer(
        user.email,
        user.displayName || undefined
      );
      
      user.stripeCustomerId = customer.id;
      await user.save();
    }

    // Create checkout session
    const session = await createCheckoutSession({
      customerId: user.stripeCustomerId,
      priceId,
      successUrl,
      cancelUrl,
    });

    return NextResponse.json({ 
      success: true, 
      url: session.url 
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

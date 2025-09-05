import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import connectToDatabase from '@/lib/mongodb';
import { User } from '@/models/User';
import Stripe from 'stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'No signature provided' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    await connectToDatabase();

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        if (session.mode === 'subscription' && session.customer) {
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
          
          await updateUserSubscription(session.customer as string, subscription);
        }
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        await updateUserSubscription(subscription.customer as string, subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        const user = await User.findOne({ stripeCustomerId: subscription.customer });
        if (user) {
          user.subscription = {
            id: subscription.id,
            status: 'canceled',
            priceId: subscription.items.data[0]?.price.id || '',
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            cancelAtPeriodEnd: true,
          };
          await user.save();
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        
        if (invoice.subscription && invoice.customer) {
          const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
          await updateUserSubscription(invoice.customer as string, subscription);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        
        if (invoice.customer) {
          const user = await User.findOne({ stripeCustomerId: invoice.customer });
          if (user && user.subscription) {
            user.subscription.status = 'past_due';
            await user.save();
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

async function updateUserSubscription(customerId: string, subscription: Stripe.Subscription) {
  const user = await User.findOne({ stripeCustomerId: customerId });
  
  if (user) {
    user.subscription = {
      id: subscription.id,
      status: subscription.status,
      priceId: subscription.items.data[0]?.price.id || '',
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    };
    await user.save();
  }
}

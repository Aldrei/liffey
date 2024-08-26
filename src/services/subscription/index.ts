import { Request, Response } from 'express';
import Stripe from 'stripe';

import ENV from '@/config';

const stripe = new Stripe(ENV.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
  // For sample support and debugging, not required for production.
  appInfo: {
    name: "stripe-samples/accept-a-payment",
    url: "https://github.com/stripe-samples",
    version: "0.0.2",
  },
  typescript: true,
});

export const subscriptionPaymentIntent = async (req: Request, res: Response): Promise<any> => {
  try {
    // Step 2: Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 79 * 100, // amount is in cents
      currency: 'BRL',
    });

    res.json({
      success: true,
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      status: paymentIntent.status,
    });
  } catch (error) {
    console.log(error);
    res.json({ ...error });
  }
}

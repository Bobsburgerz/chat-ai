// pages/api/create-customer-portal-session.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET);

export async function POST(req) {
  const  customerId  = await req.json();
 
  if (!customerId) {
    console.log('Customer ID is required')
    return NextResponse.json({ error: 'Customer ID is required' }, { status: 400 });
  }

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `https://cumcams.xyz`, // Replace with your return URL
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating customer portal session:', error);
    return NextResponse.json({ error: 'Unable to create session' }, { status: 500 });
  }
}

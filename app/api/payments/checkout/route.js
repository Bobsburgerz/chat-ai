 
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET);

export async function POST(request) {
  const { priceId, userId } = await request.json();
 
  try {
  
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,  
          quantity: 1,    
        },
      ],
      mode: 'subscription',
      success_url: 'https://cumcams.xyz?success=true',
      cancel_url: 'https://cumcams.xyz/',
     
      subscription_data: {
        metadata: {
          userId,  
          credits: '70',
        },
    
}

})

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}

 
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET ? process.env.STRIPE_SECRET :'sk_test_51LGwewJ0oWXoHVY4pMmWjhneKKna7PB95rrVnDHeDiqxC1VAjHxx7oGFmmzAHvxOsrHr8C7rxWKDh5fET0gIpyVI002KxafOxj');

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
      success_url: 'https://ominous-trout-wrgv77796qrpcg67r-3000.app.github.dev?success=true',
      cancel_url: 'https://ominous-trout-wrgv77796qrpcg67r-3000.app.github.dev/',
     
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

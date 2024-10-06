// api/stripe-webhook.js
import Stripe from 'stripe';
import { NextResponse } from 'next/server';
 
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;
const dbName = 'test';
const collection = 'users';

const stripe = new Stripe('sk_test_51LGwewJ0oWXoHVY4pMmWjhneKKna7PB95rrVnDHeDiqxC1VAjHxx7oGFmmzAHvxOsrHr8C7rxWKDh5fET0gIpyVI002KxafOxj');
 
const endpointSecret = 'whsec_qb9rpVSfMJidnlKLUa5YxHfn95UJkcfX';

async function updateUserCredits(userId, credits) {
 
 

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
  await client.connect();
  const db = client.db(dbName);
  const usersCollection= db.collection(collection);
  

 
  await usersCollection.updateOne(
    { _id: userId },  
    { $set: { credits } } 
  );
}




export async function POST(request) {
  const sig = request.headers.get('stripe-signature');

  let event;

  try {
    const rawBody = await request.text();
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  
  switch (event.type) {
    case 'invoice.payment_succeeded':
      const invoice = event.data.object;
      const userId = invoice. subscription_details.metadata.userId;
      console.log("here", invoice, userId)  
      try {
       
        await updateUserCredits(userId, 80);
        console.log(`Credits updated to 80 for user ${userId}`);
      } catch (err) {
        console.error('Failed to update user credits:', err);
      }
      break;

 
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

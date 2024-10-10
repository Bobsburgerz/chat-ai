// api/stripe-webhook.js
import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongo';
import { ObjectId } from 'mongodb';
 
const collection = 'users';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
 

async function updateUserCredits(userId, credits, customerId) {
  const updates = { credits, customer: customerId , premium: true};
 
  try {
    const { db } = await connectToDatabase(); 
   let result = {}
  
    const usersCollection = db.collection(collection);
    if (userId) {
      console.log(userId, "RAN")
      const id = new ObjectId(userId); 
      result = await usersCollection.findOneAndUpdate(
        { _id: id },  
        { $set: updates },
        { returnDocument: 'after' }
      );
    } 
    
    
    else if (customerId) {
     console.log(customerId)
      const res = await usersCollection.findOneAndUpdate(
        { customer: customerId },  
        { $set: updates },
        { returnDocument: 'after' }
      );
      console.log('res', res)
      result = res

    }
  

    console.log('Updated user:', result);
    return result;
  } catch (err) {
    console.error('Error updating user credits:', err);
    throw err;
  } 
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
      const userId = invoice.subscription_details.metadata.userId;
      const customerId = invoice.customer
      try {
       
        await updateUserCredits(userId, 70, customerId);
        console.log(`Credits updated to 70 for user ${userId}`);
      } catch (err) {
        console.error('Failed to update user credits:', err);
      }
      break;

 
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

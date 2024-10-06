import React from 'react';
import { loadStripe } from '@stripe/stripe-js'; // Stripe SDK
import styles from './notification.module.css';

type SubProps = {
  onClose: () => void;
};

const stripePromise = loadStripe('your-publishable-key-here'); // Replace with your actual Stripe publishable key

const Sub = ({ onClose }: SubProps) => {

  // Function to handle plan selection and start the Stripe checkout session
  const handleSelectPlan = async (priceId: string) => {
    const stripe = await stripePromise;

    // Call your API route to create a checkout session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }), // Send the selected priceId to the backend
    });

    const session = await response.json();

    // Redirect to Stripe Checkout
    const result = await stripe?.redirectToCheckout({
      sessionId: session.id, // The session id returned by your API
    });

    if (result?.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <div className={styles.imageContainer}>
          <img className={styles.image} src="https://res.cloudinary.com/dgyn6qakv/image/upload/v1728135592/10CWW6SXMX33PD6GDVTYVXF730-removebg-preview_y5jvmd.png" alt="promo" />
        </div>
        <div className={styles.text}>
          <h1 style={{ marginBottom: '15px' }}>Subscribe to Premium</h1>

          <div className={styles.planSelector}>
            <div className={styles.planCard}>
              <h2>12 Months</h2>
              <p className={styles.discount}>70% OFF</p>
              <p className={styles.price}>$5.99 / month</p>
              <p className={styles.oldPrice}>Was $19.99/month</p>
              <button 
                className={styles.subscribeButton} 
                onClick={() => handleSelectPlan('price_12Months')}>
                Select Plan
              </button>
            </div>

            <div className={styles.planCard}>
              <h2>Monthly</h2>
              <p className={styles.discount}>35% OFF</p>
              <p className={styles.price}>$12.99 / month</p>
              <p className={styles.oldPrice}>Was $19.99/month</p>
              <button 
                className={styles.subscribeButton} 
                onClick={() => handleSelectPlan('price_Monthly')}>
                Select Plan
              </button>
            </div>
          </div>

          <ul className={styles.benefits}>
            <li> ✓ Unlimited Chats</li>
            <li> ✓ Photo Generation</li>
            <li> ✓ Voice Messages</li>
            <li> ✓ Phone Calls</li>
            <li> ✓ Exclusive Features</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sub;

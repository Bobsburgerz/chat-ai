import React from 'react';
import { loadStripe } from '@stripe/stripe-js';  
import styles from './notification.module.css';
import { userAgent } from 'next/server';
import { useSelector} from "react-redux";
type SubProps = {
  onClose: () => void;
};

const stripePromise = loadStripe('pk_live_51LGwewJ0oWXoHVY4hzmdZ1i4COqqKZ8PVlcoPHwL4lg6oAgqjEzR5EdVZXBrwjnToi3VfU9lT2vReJyVcRVuskDI00DovYoz0Y'); 

const Sub = ({ onClose }: SubProps) => {

  const user = useSelector((state: any) => state.user);
  const handleSelectPlan = async (priceId: string) => {
    const stripe = await stripePromise;
    const response = await fetch('/api/payments/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId, userId: user?._id }), 
    });

    const session = await response.json();

    
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
                onClick={() => handleSelectPlan('price_1Q6pVJJ0oWXoHVY43ybxspDJ')}>
                Select Plan
              </button>
            </div>

            <div className={styles.planCard}>
              <h2>Monthly</h2>
              <p className={styles.discount}>55% OFF</p>
              <p className={styles.price}>$8.99 / month</p>
              <p className={styles.oldPrice}>Was $19.99/month</p>
              <button 
                className={styles.subscribeButton} 
                onClick={() => handleSelectPlan('price_1Q6pUCJ0oWXoHVY4ItiaRSkz')}>
                Select Plan
              </button>
            </div>
          </div>

          <ul className={styles.benefits}>
            <li> ✓ Unlimited Chats</li>
            <li> ✓ Photo Generation</li>
            <li> ✓ Voice Messages <span>Coming Soon</span></li>
            <li> ✓ Phone Calls <span>Coming Soon</span></li>
            <li> ✓ Exclusive Features</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sub;

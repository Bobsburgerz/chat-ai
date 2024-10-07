import React, { useState, useEffect } from 'react';
import styles from './notification.module.css';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const SuccessMessage = ({ onClose }: { onClose: () => void }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const { width, height } = useWindowSize();

  useEffect(() => {
    // Stop confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 7000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.modalOverlay}>
      {showConfetti && <Confetti width={width} gravity={.2}height={height} />}
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src="https://res.cloudinary.com/dgyn6qakv/image/upload/v1728135592/10CWW6SXMX33PD6GDVTYVXF730-removebg-preview_y5jvmd.png"
            alt="Success"
          />
        </div>
        <div className={styles.text}>
          <h1 style={{ marginBottom: '15px' }}>Congratulations!</h1>
          <p style={{ marginBottom: '20px' }}>
            You have successfully subscribed to our Premium Plan! Enjoy all the exclusive features and perks.
          </p>
          <ul className={styles.benefits}>
            <li>✓ Unlimited Chats</li>
            <li>✓ Photo Generation</li>
            <li>✓ Voice Messages <span>Coming Soon</span></li>
            <li>✓ Phone Calls <span>Coming Soon</span></li>
            <li>✓ Exclusive Features</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;

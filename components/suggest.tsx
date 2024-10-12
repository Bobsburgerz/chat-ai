import Head from 'next/head';
import { useState } from 'react';
import styles from './suggest.module.css'; 

type SuggestionModalProps = {
  onClose: () => void; 
};

const SuggestionModal = ({ onClose }: SuggestionModalProps) => {
  const [suggestion, setSuggestion] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!suggestion.trim()) {
      setError('Please enter a suggestion.');
      return;
    }

    try {
      const res = await fetch('/api/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ suggestion }),
      });

      if (res.ok) {
        setSuggestion('');
        onClose();
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'An error occurred.');
      }
    } catch (err) {
      setError('An error occurred while submitting your suggestion.');
      console.error(err);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    onClose();
  };

  if (!showModal) return null;

  return (
    <>
      <Head>
        <title>Submit a Suggestion</title>
      </Head>
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <button className={styles.closeButton} onClick={handleCloseModal}>X</button>
          <div className={styles.modalContent}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <h1 className={styles.title}>Submit a Suggestion</h1>
              {error && <p className={styles.error}>{error}</p>}
              <label htmlFor="suggestion" className={styles.label}>
                Your Suggestion
              </label>
              <textarea
                id="suggestion"
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                className={styles.textarea}
                rows={4}
                required
              />
              <button type="submit" className={styles.button}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuggestionModal;

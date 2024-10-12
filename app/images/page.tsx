"use client";
import { useState } from 'react';
import axios from 'axios';
import Sidebar from "../../components/sidebar";
import styles from "./styles.module.css";

export default function Images() {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('http://res.cloudinary.com/dgyn6qakv/image/upload/v1728630887/fmfctdqziyxnqqatqijw.jpg');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://cumcams.xyz/api/gen', {
        prompt,
        negativePrompt,   
      });

      if (response.data) {
        const data = response.data;
        console.log("url", data.secure_url, "u", data.url, "data", data);
        setGeneratedImage(data.url); 
      } else {
        console.error('Failed to generate image');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
      
        <Sidebar />
        <div className={styles.sub_container}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="prompt">Prompt</label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
                className={styles.input}
              />
            </div>

            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? 'Generating...' : 'Submit'}
            </button>
          </form>

          <div className={styles.imageContainer}>
            {generatedImage ? (
              <img src={generatedImage} alt="Generated" className={styles.image} />
            ) : (
              <p>No image generated yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

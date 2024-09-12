'use client'

import Image from "next/image";
import styles from "./page.module.css";
 
export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.logo}>
       <span style={{fontWeight: '700' , fontSize:'22px', color: '#c9225a'}}> Eros AI ❤️ </span>
        </div>
        <nav className={styles.nav}>
          <ul>
          
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#pricing">Models</a>
            </li>
            <li>
              <a href="#contact">Login</a>
            </li>
          </ul>
        </nav>
      </header>

      <div id="home" className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Welcome to Eros AI 💘</h1>
          <p className={styles.heroSubtitle}>
            Your AI-powered companion
          </p>
          <a href="#features" className={styles.ctaButton}>
            Learn More
          </a>
        </div>
        <div className={styles.heroImage}>
          <Image
            src="https://res.cloudinary.com/dojwag3u1/image/upload/v1724127974/20240317071509__cyberrealistic_v40__3367730675-3367730946_orpfxi.png"
            alt="AI Companion"
            width={600}
            className={styles.mainImg}
            height={600}
            priority
          />
        </div>
      </div>
 
      <section id="features" className={styles.features}>
        <h2 style={{marginBottom: '3px'}}>Ready to play?</h2>

    
      <Image
        src="https://res.cloudinary.com/dgyn6qakv/image/upload/v1724134577/67a21d82-2808-443b-f81d-f70ff2639700_p7bdpu.png"
        alt="AI Girl"
        width={250}
        height={250}
        className={styles.subImg}
        priority
      />
    
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Real-Time Chat</h3>
            <p>
              Engage with your AI companion in real-time through a seamless chat
              interface.
            </p>
          </div>
          <div className={styles.card}>
            <h3>Custom Responses</h3>
            <p>
              Tailor the AI responses to fit your needs with customizable
              settings.
            </p>
          </div>
          <div className={styles.card}>
            <h3>24/7 Availability</h3>
            <p>
              Your AI companion is always available, whenever you need it.
            </p>
          </div>
          <div className={styles.card}>
            <h3>Privacy First</h3>
            <p>
              Your interactions are secure and private, with top-notch
              encryption.
            </p>
          </div>
        </div>
      </section>

      <section id="pricing" className={styles.callToAction}>
        <h2>Get Started Today</h2>
        <p>
          Join thousands of users who have already enhanced their lives with
          EroNext.
        </p>
        <br/> <br/><br/>
        <a href="#sign-up" className={styles.ctaButton}>
          Sign Up Now
        </a>
      </section>

      <footer id="contact" className={styles.footer}>
      <div className={styles.footerContent}>
        <div style={{display: 'flex', gap:'5px', flexDirection: 'column', textAlign: 'start'}}>
      <span style={{fontWeight: '700' , color: '#c9225a'}}>EroAI</span>
 
        <p>&copy; 2024 EroNext. All rights reserved.</p>
</div>

<div className={styles.linksWrap}> 
        <div className={styles.footerLinks}>
         
          <a href="#features">Features</a>
          <a href="#pricing">Models</a>
          <a href="#contact">Login</a>
        </div>
        <div className={styles.socialLinks}>
    
        </div>
      </div></div>
    </footer>
    </main>
  );
}

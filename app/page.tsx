
'use client'
import React , {useEffect} from 'react';
import styles from './page.module.css'; 
import Sidebar from "../components/sidebar"
import Navbar from "../components/navbar" 
import products from '@/components/products';
import { useSelector , useDispatch} from "react-redux";
import { useNewConvoMutation, useUpdateUserMutation } from "../redux/services/appApi";
 
import { useRouter, useSearchParams } from 'next/navigation';

import Head from 'next/head';

<Head>
  <title>Build a Connection with Your AI Companion | Flirt, Confide, and Chat</title>
  <meta name="description" content="Discover your AI companion. Build a deep relationship, flirt, chat, and confide in your personal AI companion. Start your personalized journey now! Cute , Sexy, Fun, AI chat. " />
  <meta name="keywords" content="AI chat companion, relationship with AI, flirt with AI, confide in AI, personalized AI chat" />
  <meta property="og:title" content="Build a Connection with Your AI Companion" />
  <meta property="og:description" content="Experience a new way to interact with AI. Flirt, build a relationship, and confide in your own AI companion." />
  <meta name="robots" content="index, follow" />
</Head>


const Products = () => {
  const [newConvo, { isError, isLoading, error }] = useNewConvoMutation();
 
  const searchParams = useSearchParams(); // Get URL params
  const [updateUser] = useUpdateUserMutation();
  const router = useRouter();
  useEffect(() => {
    const id = searchParams.get('id');
    const googleId = searchParams.get('googleId');
    const login = async () => {
    if (googleId) {
      await updateUser(JSON.stringify({ id, googleId }))
   
    }}

    login()
  }, [searchParams]);
 



  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    
    const googleId = searchParams.get('googleId');
    const login = async () => {
    if (googleId && user) {
  
      setTimeout(() =>  router.push(`/character/1`), 1200 )
      window.location.reload();
    }}

    login()
  }, [user]);
 const makeConvo = async (product:any) => {
  if (user) {
  await newConvo({ provider: product });
  } 

  router.push(`/character/${product.id}`);
 
 }
  return (
    <div className={styles.main}>
 
    <Navbar/>
    <div className={styles.container}>
    <Sidebar/>
    <main className={styles.productGrid}>
    
          {products.map((product) => (
            
            <div onClick={() => makeConvo( product)} key={product.id} className={styles.card}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.mainImg}
              
              />
              <div className={styles.info}> 
              <h3>{product.name}</h3>
              <p>{product.age || 18} Years Old</p></div>
            </div> 
          ))}
        </main>
      </div>
       
    </div>
  );
};

export default Products;
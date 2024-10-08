
'use client'
import React , {useEffect, useState} from 'react';
import styles from './page.module.css'; 
import Sidebar from "../components/sidebar"
import Navbar from "../components/navbar" 
import products from '@/components/products';
import { useSelector , useDispatch} from "react-redux";
import { useNewConvoMutation, useUpdateUserMutation, useGetUserMutation ,useGetConvosMutation} from "../redux/services/appApi";
import { useParams } from 'next/navigation';
import { useRouter, useSearchParams } from 'next/navigation';
 

import Head from 'next/head';
import generatePicture from '@/helpers/picture';
import SuccessMessage from '@/components/successModal';

 

const Products = () => {
  const [newConvo, { isError, isLoading, error }] = useNewConvoMutation();
  const searchParams = useSearchParams();  
  const [updateUser] = useUpdateUserMutation();
  const [getUser] = useGetUserMutation();
  const router = useRouter();
  
  const [successMsg, setSuccessMsg] = useState(false)
  const  success  = searchParams.get('success');
  const user = useSelector((state: any) => state.user);
  const [getConvos ] = useGetConvosMutation()
  useEffect(() => {
   
    const getUpdate = () => {
    if (successMsg) {
      setTimeout(()=> { setSuccessMsg(false)}, 5000)
    }}

    getUpdate()
  }, [successMsg, success]);
  useEffect(() => {
   
    const getUpdate = async () => {
    if (success && user) {
      await getUser({email: user?.email})
      setSuccessMsg(true)
   
    }}

    getUpdate()
  }, [success]);
  useEffect(() => {
    const id = searchParams.get('id');
    const googleId = searchParams.get('googleId');
    const login = async () => {
    if (googleId) {
      await updateUser(JSON.stringify({ id, googleId }))
   
    }}

    login()
  }, [searchParams]);
  useEffect(() => {
  
    const login = async () => {
    if (user) {
    await getUser({email: user?.email})
 
    }}

    login()
  }, []);




 
  
 const makeConvo = async (product:any) => {
  if (user) {
  await newConvo({ provider: product, email: user?.email });
  } 

  router.push(`/character/${product.id}`);
 
 }
  return (

    <>
    <Head>
<link rel="icon" href="/favicon.ico" />
  <title>Build a Connection with Your AI Companion | Flirt, Confide, and Chat</title>
  <meta name="description" content="Discover your AI companion. Build a deep relationship, flirt, chat, and confide in your personal AI companion. Start your personalized journey now! Cute , Sexy, Fun, AI chat. " />
  <meta name="keywords" content="AI chat companion, relationship with AI, flirt with AI, confide in AI, personalized AI chat" />
  <meta property="og:title" content="Build a Connection with Your AI Companion" />
  <meta property="og:description" content="Experience a new way to interact with AI. Flirt, build a relationship, and confide in your own AI companion." />
  <meta name="robots" content="index, follow" />
</Head>
 
    <div className={styles.main}>
    <Navbar/>
  
     {successMsg && <><SuccessMessage onClose={() => setSuccessMsg(false)}/></>}
    <div className={styles.container}>
    <Sidebar/>
 <div className={styles.subcont}> 
 <div className={styles.banner}> 
 <img className={styles.bannerImg}  src="https://res.cloudinary.com/dgyn6qakv/image/upload/v1728069038/Frame_1_4_kohcmm.png"/>
 <div className={styles.flexCol}> 
 <h1>Your Personal AI Girlfriend</h1>
 <button onClick={() => makeConvo(products[4])} className={styles.btnPro}> Start Chatting </button></div>
   <div>.</div>
   </div>
    <main className={styles.productGrid}>
    
          {products.map((product) => (
            
            <div onClick={() => makeConvo(product)} key={product.id} className={styles.card}>
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
        </main></div>
      </div>
       
    </div>
    </>
  );
};

export default Products;
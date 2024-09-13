
'use client'
import React , {useEffect} from 'react';
import styles from './page.module.css'; 
import Sidebar from "../components/sidebar"
import Navbar from "../components/navbar" 
import products from '@/components/products';
import { useSelector , useDispatch} from "react-redux";
import { useNewConvoMutation, useUpdateUserMutation } from "../redux/services/appApi";
 
import { useRouter, useSearchParams } from 'next/navigation';

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
      router.push(`/character/1`);
    }}

    login()
  }, [searchParams]);
 
  const user = useSelector((state: any) => state.user);
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

'use client'
import React from 'react';
import styles from './styles.module.css'; 
import Sidebar from "../../components/sidebar"
import Navbar from "../../components/navbar" 
import products from '@/components/products';
import { useSelector , useDispatch} from "react-redux";
import { useNewConvoMutation } from "../../redux/services/appApi";
import { useRouter } from 'next/navigation';
const Products = () => {
  const [newConvo, { isError, isLoading, error }] = useNewConvoMutation();
const convos = useSelector((state: any) => state.conversations); 
  const router = useRouter();
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
           //        <Link key={product.id} href={`/character/${product.id}`} passHref> 
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

'use client'
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from './sidebar.module.css';  
import { useLogoutMutation } from '@/redux/services/appApi'
import { useSelector , useDispatch} from "react-redux";
import Signup from "./signup"
import { useState, useEffect } from 'react';
import { resetProducts } from "../redux/slice/convoSlice";
import { setLoading } from "@/redux/slice/loadingSlice";  
const sideOptions = ["Home",  "Messages",  "Billing"]

const Sidebar =  () => {
   
  const loading = useSelector((state:any) => state.loading)
const dispatch = useDispatch()
 
  const pathname = usePathname();
  const [logout, { isError, isLoading, error }] = useLogoutMutation();
  const user = useSelector((state: any) => state.user);
  const router = useRouter();
 
  const [signup, setSignup] = useState(false)

  const handleManageSubscription = async (customerId: string) => {
    
    const response = await fetch('/api/payments/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerId ), 
    });

    const { url } = await response.json();
    window.location.href = url;  
  };
const setLogout = async () => {
  await logout({email: "", id: ""})
  dispatch(resetProducts()); 
  router.push(`/`)
}
 
    return ( <> 
        <aside className={styles.sidebar}>

     
        {signup && <> <Signup onClose={() => setSignup(false)}/></>}
       
        <div>
           {sideOptions.map((opt:string) => { 

 
     const isActive = pathname.includes("/character") && opt == "Messages";
  
const navigate = async (name: string) => {
  dispatch(setLoading(true))
  if (name == "Billing" && user?.customer){
  
   await  handleManageSubscription(user.customer)
  }
  if (name == "Messages"  && !user) {
    setSignup(true)
  } else if (name !== "Billing") {
    router.push(`${nav}`)
  }
  
}
     
     const nav = opt == "Messages" ? "/character/00"  : opt == "Home" ? "/" : "/"
            return (
              
          <div onClick={() =>  navigate(opt)} key={opt} className={`${styles.options} ${isActive  ? styles.active : ''}`}>{opt}</div>)
})}
        </div>

        {user ? <>     <div onClick={() => setLogout() }
         style={{position: 'absolute', bottom:'30px', width: '150px' }}className={styles.options}>Logout</div></> : <> 
         
         <div onClick={() => setSignup(true)}
         style={{position: 'absolute', bottom:'30px', width: '150px' }}className={styles.options_register}>Get Started</div>
         
         </>}
     
      </aside>
      </>
    )
}

export default Sidebar;
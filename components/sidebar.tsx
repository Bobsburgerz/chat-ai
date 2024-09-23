'use client'
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from './sidebar.module.css'; // Import the CSS module
import { useLogoutMutation } from '@/redux/services/appApi'
import { useSelector , useDispatch} from "react-redux";
import Login from "./login"
import Signup from "./signup"
import { useState, useEffect } from 'react';

const sideOptions = ["Home",  "Messages",  "Billing"]

const Sidebar =  () => {
  const pathname = usePathname();
  const [logout, { isError, isLoading, error }] = useLogoutMutation();
  const user = useSelector((state: any) => state.user);
  const router = useRouter();
 
  const [signup, setSignup] = useState(false)


 
    return ( <> 
        <aside className={styles.sidebar}>

     
        {signup && <> <Signup onClose={() => setSignup(false)}/></>}
       
        <div>
           {sideOptions.map((opt:string) => { 

 
     const isActive = pathname.includes("/character") && opt == "Messages";
  
const navigate = (name: string) => {
  if (name == "Messages"  && !user) {
    setSignup(true)
  } else {
    router.push(`${nav}`)
  }
  
}
     
     const nav = opt == "Messages" ? "/character/00"  : opt == "Home" ? "/" : "/"
            return (
              
          <div onClick={() =>  navigate(opt)} key={opt} className={`${styles.options} ${isActive  ? styles.active : ''}`}>{opt}</div>)
})}
        </div>

        {user ? <>     <div onClick={() => logout({email: "", id: ""})}
         style={{position: 'absolute', bottom:'30px', width: '190px' }}className={styles.options}>Logout</div></> : <> 
         
         <div onClick={() => setSignup(true)}
         style={{position: 'absolute', bottom:'30px', width: '190px' }}className={styles.options_register}>Get Started</div>
         
         </>}
     
      </aside>
      </>
    )
}

export default Sidebar;
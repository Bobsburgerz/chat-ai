'use client'
import React, {useState} from 'react';
 import Login from "./login"
import styles from './navbar.module.css';  
import Link from 'next/link';
import Sub from "./notificationModal"
const Navbar = () => {
  const [login, setLogin] = useState(false)
  const [sub, setSub] = useState(false)
    return (
        <header className={styles.header}>
      
        <div 
        className={styles.logo}>      <Link href="/"> <span style={{fontWeight: '700' ,
         fontSize:'22px', color: 'rgb(209, 11, 179)'}}> Cumcams 💜 </span></Link>
            {sub && <><Sub onClose={() => setSub(false)}/> </>}
        {login && <><Login onClose={() => setLogin(false)}/> </>}
        </div>
        <nav className={styles.nav}>

       
          <ul>
      
           <li onClick={() => setSub(true)}className={styles.btnPro}>Subscribe</li>
            <li onClick={() => setLogin(true)}>Login</li>
       
 
          </ul>
          
        </nav>
      </header>
    )
}

export default Navbar;
'use client'
import React, {useState} from 'react';
 import Login from "./login"
import styles from './navbar.module.css';  

const Navbar = () => {
  
  const [login, setLogin] = useState(false)


    return (
        <header className={styles.header}>
        <div 
        className={styles.logo}> <span style={{fontWeight: '700' ,
         fontSize:'22px', color: '#c9225a'}}> Eros AI ❤️ </span>
        
        {login && <><Login onClose={() => setLogin(false)}/> </>}
        </div>
        <nav className={styles.nav}>
          <ul>
      
       
            <li onClick={() => setLogin(true)}>Login</li>
       
 
          </ul>
        </nav>
      </header>
    )
}

export default Navbar;
import { useState } from 'react';
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "../redux/services/appApi";
import styles from "./imageModal.module.css";

type Props = {
  image: string
  onClose: () => void; 
};

export default function ImageModal({image, onClose} : Props) {
   
 
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
       <button className={styles.closeButton} onClick={onClose}>x</button>
        <div className={styles.imageContainer}>
          <img  src={image} alt="Model Image"/>
        </div>
       
    
      </div>
    </div>
  );
}

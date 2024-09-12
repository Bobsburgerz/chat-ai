import { useState } from 'react';
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "../redux/services/appApi";
import styles from "./login.module.css";

type Props = {
  onClose: () => void; 
};

export default function Login({onClose} : Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector((state: any) => state.user);
  const [updateUser, { isError, isLoading, error }] = useUpdateUserMutation();
  const [showModal, setShowModal] = useState(true); // State to control modal visibility

  const handleLogin = async () => {
    await updateUser(JSON.stringify({ email, password }));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    onClose()
  };

  if (!showModal) return null; // Return null if modal is not visible

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.imageContainer}>
          <img src="https://res.cloudinary.com/dgyn6qakv/image/upload/v1724288444/00361-439040220_uxb9cm.png" alt="Login Image"/>
        </div>
        <div className={styles.form}>
          <button className={styles.closeButton} onClick={handleCloseModal}>X</button>
          <h1>Login</h1>
          <p> {user?.id}</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={styles.input}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={styles.input}
          />
          <button
            onClick={handleLogin}
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}

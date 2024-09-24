"use client"; 
import { Inter } from "next/font/google";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import store from '../redux/store';  
import { AppProvider } from '../context/AppProvider';

import "./globals.css";

import ReactGA from 'react-ga4';

// Initialize Google Analytics
ReactGA.initialize('G-BJ2M979ZHM');

const inter = Inter({ subsets: ["latin"] });
const persistedStore = persistStore(store);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
 
  ReactGA.send({
    hitType: 'pageview',
    page: 'home',
    title: 'home',
  });
 

  return (
    <html lang="en">
      <body className={inter.className}>
        <PersistGate
          loading={
            <div className="loading-cont" style={{justifyContent: 'center', display: 'flex', alignItems: 'center', height: '100vh'}}>
              <div className="pulse-heart">❤️</div>
            </div>
          }
          persistor={persistedStore}
        >
          <AppProvider>
            <Provider store={store}>
              {children}
            </Provider>
          </AppProvider>
        </PersistGate>
      </body>
    </html>
  );
}

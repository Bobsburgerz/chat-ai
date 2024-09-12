"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import store from '../redux/store';  
import { AppProvider } from '../context/AppProvider';
import { AuthProvider } from '../context/AuthProvider';
import "./globals.css";
import { useEffect } from 'react';
import App from "next/app";

// WebSocket component
const WebSocketComponent = () => {
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('WebSocket connection established');
      ws.send('Hello Server');
    };

    ws.onmessage = (event) => {
      console.log('Message from server:', event.data);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  return null; // This component doesn’t render anything visible
};

const inter = Inter({ subsets: ["latin"] });

const persistedStore = persistStore(store);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <PersistGate loading={<div>Loading...</div>} persistor={persistedStore}>
        <AppProvider>
          <Provider store={store}>
            <WebSocketComponent /> {/* Include WebSocket component */}
            {children}
          </Provider>
          </AppProvider>
        </PersistGate>
      </body>
    </html>
  );
}

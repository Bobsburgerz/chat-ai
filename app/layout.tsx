"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Inter } from "next/font/google";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import store from '../redux/store';  
import { AppProvider } from '../context/AppProvider';

import "./globals.css";

import ReactGA from 'react-ga4';

// Initialize Google Analytics
ReactGA.initialize('G-2VXMGK8877');

const inter = Inter({ subsets: ["latin"] });
const persistedStore = persistStore(store);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const page = pathname + searchParams.toString();

    // Track initial page view
    ReactGA.send({
      hitType: 'pageview',
      page: page,
      title: document.title,
    });

    // Track page views on route change
    const handleRouteChange = () => {
      ReactGA.send({
        hitType: 'pageview',
        page: page,
        title: document.title,
      });
    };

    // You may need to add a listener for route changes depending on your setup

    // Clean up the event listener on component unmount
    return () => {
      // If you added listeners, make sure to clean them up here
    };
  }, [pathname, searchParams]);

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

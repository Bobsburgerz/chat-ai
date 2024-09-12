'use client';
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from 'react-redux';
import store from '../redux/store'; // Adjust the path as necessary

import { Inter } from "next/font/google";
 
const inter = Inter({ subsets: ["latin"] });

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SessionProvider>
        <html lang="en">
        <body className={inter.className}>
        <Provider store={store}>
          {children}
        </Provider>
    </body>
    </html>
    </SessionProvider>;
}

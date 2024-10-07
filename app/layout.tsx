"use client";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { useDispatch, useSelector } from "react-redux";
import store from "../redux/store";
import { AppProvider } from "../context/AppProvider";
import { setLoading } from "@/redux/slice/loadingSlice";

import "./globals.css";
import ReactGA from "react-ga4";

ReactGA.initialize("G-6CMSG2WN8J");
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
        <Provider store={store}>
          <PersistGate
            loading={
              <div
                className="loading-cont"
                style={{
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <div className="pulse-heart">💜</div>
              </div>
            }
            persistor={persistedStore}
          >
            <AppProvider>
              <LayoutWithLoader>{children}</LayoutWithLoader>
            </AppProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}

// This component is where we handle the loading state using the Redux hooks
function LayoutWithLoader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const loading = useSelector((state: any) => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {

    if (loading) {
    
    const timer = setTimeout(() => {
      dispatch(setLoading(false)); // Stop loading after 3 seconds
    }, 2400);

    return () => clearTimeout(timer); }
  }, []);

  // Track page views with ReactGA
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: pathname,
      title: pathname,
    });
  }, [pathname]);

  // Conditionally show loading screen
  return loading ? (
    <div
      className="loading-cont"
      style={{
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="pulse-heart">💜</div>
    </div>
  ) : (
    children
  );
}

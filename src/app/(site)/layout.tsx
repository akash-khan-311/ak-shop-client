"use client";
import { useState, useEffect } from "react";
import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { ModalProvider } from "../context/QuickViewModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";

import CartSidebarModal from "@/components/Common/CartSidebarModal";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import PreviewSliderModal from "@/components/Common/PreviewSlider";

import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function() {
            try {
              const savedTheme = localStorage.getItem("theme");
              if (savedTheme === "dark") {
                document.documentElement.classList.add("dark");
              } else if (savedTheme === "light") {
                document.documentElement.classList.remove("dark");
              } else {
                const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                if (prefersDark) document.documentElement.classList.add("dark");
              }
            } catch (e) {}
          })();
        `,
          }}
        />
      </head>
      <body className="dark:bg-dark-2">
        {loading ? (
          <PreLoader />
        ) : (
          <>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <CartModalProvider>
                  <ModalProvider>
                    <PreviewSliderProvider>
                      <Header />

                      {children}

                      {/* <QuickViewModal /> */}
                      <CartSidebarModal />
                      <PreviewSliderModal />
                    </PreviewSliderProvider>
                  </ModalProvider>
                </CartModalProvider>

                <ScrollToTop />
                <Footer />
              </PersistGate>
            </Provider>
          </>
        )}
      </body>
    </html>
  );
}

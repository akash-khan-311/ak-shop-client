"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/redux/store";
import { SidebarProvider } from "@/app/context/SidebarContext";
import { CartModalProvider } from "@/app/context/CartSidebarModalContext";
import { ModalProvider } from "@/app/context/QuickViewModalContext";
import { PreviewSliderProvider } from "@/app/context/PreviewSliderContext";

export default function RootProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SidebarProvider>
          <CartModalProvider>
            <ModalProvider>
              <PreviewSliderProvider>{children}</PreviewSliderProvider>
            </ModalProvider>
          </CartModalProvider>
        </SidebarProvider>
      </PersistGate>
    </Provider>
  );
}

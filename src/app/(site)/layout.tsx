import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import "flatpickr/dist/flatpickr.css";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Toaster } from "react-hot-toast";
import ThemeInit from "../context/Theme";

import CartSidebarModal from "@/components/Common/CartSidebarModal";
import PreviewSliderModal from "@/components/Common/PreviewSlider";
import ScrollToTop from "@/components/Common/ScrollToTop";
import RootProviders from "@/Providers/RooProvider";
import ThemeGuard from "@/Providers/ThemeGurd";

const themeScript = `
(function() {
  try {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");
    else if (savedTheme === "light") document.documentElement.classList.remove("dark");
    else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="dark:bg-dark-2">
        <RootProviders>
          <ThemeGuard />
          <Header />
          <Toaster position="bottom-right" reverseOrder={false} />
          {children}
          <CartSidebarModal />
          <PreviewSliderModal />
          <ScrollToTop />
          <Footer />
        </RootProviders>
      </body>
    </html>
  );
}

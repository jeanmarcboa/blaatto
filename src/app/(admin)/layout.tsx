"use client";
import { useState, useEffect } from "react";
import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import "rsuite/dist/rsuite-no-reset.min.css";
// import Header from "../../components/Header";
import Header from "../../components/HeaderAdmin";
import SideBar from "@/components/SideBar/admin";
import Footer from "../../components/Footer";

import { ModalProvider } from "../context/QuickViewModalContext";
import { NotificationModalProvider } from "../context/NotificationSidebarModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { ReduxProvider } from "@/redux/provider";
import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import PreviewSliderModal from "@/components/Common/PreviewSlider";

import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";

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
      <body>
        {loading ? (
          <PreLoader />
        ) : (
          <>
            <ReduxProvider>
              <NotificationModalProvider>
                <CartModalProvider>
                  <ModalProvider>
                    <PreviewSliderProvider>
                      <Header />
                      <div className="flex flex-row justify-end">
                        <SideBar />
                        <div className="w-[80%] px-6 sm:px-6 lg:px-8 pt-[150px] bg-gray-1 min-h-screen">
                          {children}
                        </div>
                      </div>

                      <QuickViewModal />
                      <CartSidebarModal />
                      <PreviewSliderModal />
                    </PreviewSliderProvider>
                  </ModalProvider>
                </CartModalProvider>
              </NotificationModalProvider>
            </ReduxProvider>
            <ScrollToTop />
            {/* <Footer /> */}
          </>
        )}
      </body>
    </html>
  );
}

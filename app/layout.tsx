import React, { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { Toaster } from "@/components/ui/toaster";

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => (
  <html lang="en">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR&display=swap"
        rel="stylesheet"
      />
    </head>
    <body>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="afterInteractive"
      />
      <div id="overlays-modal"></div>
      <Header />
      {children}
      <Toaster />
      <Footer />
    </body>
  </html>
);

export default RootLayout;

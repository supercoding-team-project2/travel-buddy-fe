import React, { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

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
      <script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
      ></script>
    </head>
    <body>
      <div id="overlays-modal"></div>
      <Header />
      {children}
      <Footer />
    </body>
  </html>
);

export default RootLayout;

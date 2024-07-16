import "./globals.css";
import Header from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
        <div id="overlays-modal"></div>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Montserrat } from "next/font/google";
import FooterPage from "@/components/Footer";
import NextAuthProvider from "./providers";

const montserrat = Montserrat({
  weight: "500",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ЄПомічник",
  description: "Пошук роботи, надання послуг, ремонт, прибирання в квартирі, догляд за садом",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"], 
    shortcut: ["/apple-touch-icon.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen flex flex-col justify-between bg-gradient-to-b from-gray-100 to-gray-300 ${montserrat.className}`}
      >
        <NextAuthProvider >
          <div>
            <Navbar />
            {children}
          </div>
        </NextAuthProvider>
        <FooterPage />
      </body>
    </html>
  );
}

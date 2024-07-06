import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: "500",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pomichnuk",
  description: "Generated by Ihor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

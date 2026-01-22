import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import PreFooter from "@/components/PreFooter";
import MainFooter from "@/components/MainFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  title: "Houseful | Find, finance and own your home",
  description: "Real estate search and mortgage services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-white text-slate-900`}
      >
        {children}
        <PreFooter />
        <MainFooter />
      </body>
    </html>
  );
}

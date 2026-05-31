import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/page-transition";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bakhtar Market — Authentic Afghan Groceries UK",
  description: "Shop authentic Afghan and international groceries, spices, rice, nuts, and pantry staples. Delivered across the UK.",
  openGraph: {
    title: "Bakhtar Market — Authentic Afghan Groceries UK",
    description: "Authentic Afghan and international groceries delivered across the UK.",
    siteName: "Bakhtar Market",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FAFAF7]">
        <Providers>
          <Nav />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

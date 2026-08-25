import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { ContentProvider } from "@/context/ContentContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VERC | Village Education Resource Center",
  description: "A leading NGO in Bangladesh working for community empowerment through education, health, and livelihood programs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-brand-light text-brand-dark`}>
        <ContentProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Chatbot />
          <Footer />
        </ContentProvider>
      </body>
    </html>
  );
}

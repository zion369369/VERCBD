import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { ContentProvider } from "@/context/ContentContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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
    <html lang="en" className={inter.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.cdnfonts.com/css/sf-pro-display"
        />
      </head>
      <body className="font-sans antialiased bg-brand-light text-brand-dark selection:bg-brand-primary/10">
        <LanguageProvider>
          <AuthProvider>
            <ContentProvider>
              <Navbar />
              <main className="min-h-screen">
                {children}
              </main>
              <Chatbot />
              <Footer />
            </ContentProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

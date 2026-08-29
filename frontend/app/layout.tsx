import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { ContentProvider } from "@/context/ContentContext";
import { LanguageProvider } from "@/context/LanguageContext";

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
      <body className="font-sans antialiased bg-brand-light text-brand-dark selection:bg-brand-primary/10">
        <LanguageProvider>
          <ContentProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Chatbot />
            <Footer />
          </ContentProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

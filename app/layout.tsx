import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/navigation/header";
import Footer from "@/components/navigation/footer";
import { Toaster } from "@/components/ui/sonner";
import { WhatsAppLive } from "@/components/ui/WhatsAppLive";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lorenzo Pardell | Sound Designer",
  description: "Sound designer specializing in film, series, and documentaries based in São Paulo, Brazil. Delivering high-quality audio solutions for creative projects worldwide.",
  keywords: ["sound design", "audio production", "sound mixer", "mix engineer", "foley", "audio editor", "post-production", "São Paulo", "sound designer", "film sound", "portfolio", "design de som", "loudness", "dialogue editor", "sound effects", "efeitos sonoros", "produtora de áudio", "produção de áudio", "mixador de som", "engenheiro de mixagem", "editor de áudio", "editor de diálogos", "pós-produção", "designer de som", "audiovisual", "portfólio"],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "https://lorenzopardell.com"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <main className="w-full flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppLive />
        <Toaster />
      </body>
    </html>
  );
}

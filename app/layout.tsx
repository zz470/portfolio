import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/navigation/header";
import Footer from "@/components/navigation/footer";
import { Toaster } from "@/components/ui/sonner";
import { WhatsAppLive } from "@/components/ui/WhatsAppLive";
import { buildPersonSchema, buildLocalBusinessSchema } from "@/lib/jsonld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lorenzopardell.com"),
  title: {
    template: "%s | Lorenzo Pardell",
    default: "Lorenzo Pardell | Sound Designer & Re-Recording Mixer | Sao Paulo",
  },
  description:
    "Re-recording mixer and sound designer with 30+ credits across film, series, and documentaries. Based in Sao Paulo, Brazil. Available for remote and on-location projects worldwide.",
  keywords: [
    "sound design",
    "audio production",
    "sound mixer",
    "mix engineer",
    "foley",
    "audio editor",
    "post-production",
    "São Paulo",
    "sound designer",
    "film sound",
    "portfolio",
    "design de som",
    "loudness",
    "dialogue editor",
    "sound effects",
    "efeitos sonoros",
    "produtora de áudio",
    "produção de áudio",
    "mixador de som",
    "engenheiro de mixagem",
    "editor de áudio",
    "editor de diálogos",
    "pós-produção",
    "designer de som",
    "audiovisual",
    "portfólio",
    "re-recording mixer",
    "re-recording mix",
    "boom operator",
    "dialogue editing",
    "edição de diálogos",
    "operador de boom",
    "mixagem",
    "Sao Paulo",
  ],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    siteName: "Lorenzo Pardell",
    title: "Lorenzo Pardell | Sound Designer & Re-Recording Mixer | Sao Paulo",
    description:
      "Re-recording mixer and sound designer with 30+ credits across film, series, and documentaries. Based in Sao Paulo, Brazil. Available for remote and on-location projects worldwide.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Lorenzo Pardell | Sound Designer & Re-Recording Mixer | Sao Paulo",
    description:
      "Re-recording mixer and sound designer with 30+ credits across film, series, and documentaries. Based in Sao Paulo, Brazil.",
    images: ["/og-image.png"],
  },
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPersonSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildLocalBusinessSchema()) }}
        />
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

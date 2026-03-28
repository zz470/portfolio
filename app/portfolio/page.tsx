import type { Metadata } from "next";
import PortfolioPageClient from "@/components/portfolio/PortfolioPageClient";

export const metadata: Metadata = {
  title: "Sound Design Portfolio | Film, Series & Documentary",
  description:
    "Portfolio of 30+ sound design and re-recording mix credits across feature films, Netflix series, documentaries, and commercials. Based in Sao Paulo, Brazil.",
  openGraph: {
    title: "Sound Design Portfolio | Film, Series & Documentary | Lorenzo Pardell",
    description:
      "Portfolio of 30+ sound design and re-recording mix credits across feature films, Netflix series, documentaries, and commercials. Based in Sao Paulo, Brazil.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary",
    images: ["/og-image.png"],
  },
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}

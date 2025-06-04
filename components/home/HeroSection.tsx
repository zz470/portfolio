"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PartnerLogos } from "@/components/home/partner-logos";

interface HeroSectionProps {
  title?: string;
  highlightText1?: string;
  highlightText2?: string;
  showWatchReelButton?: boolean;
  backgroundImageUrl?: string;
  className?: string;
}

// Animated Text Component for rotating words
const AnimatedText = () => {
  const [index, setIndex] = useState(0);
  const words = ["filmmakers.", "brands.", "studios.", "agencies."];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1 }} 
        transition={{ 
          duration: 0.5, 
          ease: [0.16, 1, 0.3, 1]
        }}
        className="inline-block origin-center"
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>
  );
};

export default function HeroSection({
  title = "Shaping the sound of",
  highlightText1 = "the world's",
  highlightText2 = "most creative",
  showWatchReelButton = false,
  backgroundImageUrl = "https://crxuhqqswealopkmdpxq.supabase.co/storage/v1/object/sign/assets/hero-image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kZWU0NTJlNy0xYThkLTQ5M2UtODEzZi05NTc0MmM1Y2Q0YWIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvaGVyby1pbWFnZS5wbmciLCJpYXQiOjE3NDkwNzc2OTIsImV4cCI6MjA2NDQzNzY5Mn0.N9CKEHt8Ey871V0ASRdj1zYSiMoYuA8jXn49Hn4Uuyc",
  className = "",
}: HeroSectionProps) {
  return (
    <section className={`w-full min-h-[86vh] flex items-center justify-center relative overflow-hidden ${className}`}>
      {/* Background with image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImageUrl}
          alt="Hero background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-10% via-black/80 via-70% to-black"></div>
      </div>
      
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-10 w-full">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-10 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="flex flex-col items-center gap-2 font-medium">
              <div>
                <span className="text-white">{title} </span>
                <span className="bg-gradient-to-r from-orange-400 to-amber-200 text-transparent bg-clip-text">{highlightText1}</span>
              </div>
              <div>
                <span className="bg-gradient-to-r from-orange-500 to-amber-300 text-transparent bg-clip-text">{highlightText2} </span>
                <span className="relative text-white inline-block">
                  <AnimatedText />
                </span>
              </div>
            </h1>
          </motion.div>

          {/* "Watch Reel" Button */}
          {showWatchReelButton && (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link href="/reel">
                  <Button className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-700 text-white rounded-full px-8 py-6 text-base font-medium shadow-md transition-all duration-300 hover:shadow-lg">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82z" fill="currentColor" />
                    </svg>
                    WATCH REEL
                  </Button>
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </div>
      
      {/* Partner Logos positioned at bottom of hero */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <PartnerLogos className="py-6" />
      </div>
    </section>
  );
} 
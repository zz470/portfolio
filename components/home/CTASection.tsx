"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  responseTimeText?: string;
  responseTimeDescription?: string;
  className?: string;
}

export default function CTASection({
  title = "Amplify Your Story",
  subtitle = "Ready to cut through the noise?",
  description = "Whether you're in the final stages of post or planning ahead, I'm here to help you shape a sound experience that elevates your project. Reach out and let's talk about how we can make it happen.",
  buttonText = "Start Your Project",
  buttonLink = "/contact",
  responseTimeText = "Quick Response Time",
  responseTimeDescription = "Usually within 24 hours",
  className = "",
}: CTASectionProps) {
  return (
    <section className={`w-full py-24 bg-black text-white relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b bg-white"></div>
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-10">
        <div className="flex justify-between items-center">
          <motion.div 
            className="max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-2">
              <span className="text-amber-400 text-sm font-medium tracking-wider uppercase">{subtitle}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-amber-200 text-transparent bg-clip-text uppercase">{title}</h2>
            <p className="text-gray-400 text-lg mb-8">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={buttonLink}>
                <Button className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-black font-semibold px-8 py-6 rounded-full text-base min-w-[200px] shadow-lg shadow-orange-500/20 transition-all duration-300">
                  {buttonText}
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            className="hidden lg:flex flex-col items-end justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-right mb-6">
              <p className="text-amber-400 font-medium mb-2">{responseTimeText}</p>
              <p className="text-gray-400">{responseTimeDescription}</p>
            </div>
            <Link href="/portfolio" className="text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-2">
              See recent work
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/>
                <path d="m12 5 7 7-7 7"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 
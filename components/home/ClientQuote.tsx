"use client";

import { motion } from "framer-motion";

interface ClientQuoteProps {
  quote?: string;
  className?: string;
}

export default function ClientQuote({
  quote = "I partner with creators and brands to deliver exceptional audio that elevates your projects, engages with audiences, and enhances storytelling.",
  className = "",
}: ClientQuoteProps) {
  return (
    <section className={`w-full py-10 bg-white ${className}`}>
      <div className="max-w-screen-lg mx-auto px-6 md:px-10 text-center">
        <motion.p 
          className="text-xl md:text-2xl text-gray-700 font-light leading-relaxed italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          "{quote}"
        </motion.p>
      </div>
    </section>
  );
} 
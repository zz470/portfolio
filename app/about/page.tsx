"use client"

import React from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import { getVisibleSocialLinks } from "@/lib/social-links";

// Animation variants - simplified for elegance
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function AboutPage() {
  // Get visible social links
  const socialLinks = getVisibleSocialLinks();
  
  return (
    <main className="container mx-auto px-4 py-16 max-w-6xl">
      <motion.section 
        className="mb-20 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h1 className="text-5xl font-bold mb-6">About</h1>
        <div className="w-12 h-1 bg-orange-500 mx-auto"></div>
       
      </motion.section>
      
      <motion.section 
        className="mb-20"
        variants={slideUp}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-3xl font-bold mb-4">Lorenzo Pardell</h2>
        <div className="w-12 h-1 bg-orange-500 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-3">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            I'm a re-recording mixer and sound designer based in São Paulo, with experience on projects across Europe, North and South America. I transform ideas into powerful sonic experiences that elevate storytelling and create emotional connections. My approach blends technical precision with creative instinct to craft audio that's as beautiful as it is functional.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            I studied Sound Design for New Media at ETIC in Lisbon, earned a Bachelor's Certificate in Audio Engineering and Music Production from RRFC in New York, and developed my musical foundation at Conservatório Souza Lima in São Paulo. With a background in both sound design and audio engineering, I bring a deep understanding of how sound shapes perception and enhances narrative.
            </p>
            
            {/*<a 
              href="/Lorenzo_Pardell_CV.pdf" 
              download 
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-colors"
            >
              <span>Download my CV</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>*/}
          </div>
          <div className="md:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="text-xl font-medium mb-2">Connect</h3>
            <div className="w-12 h-1 bg-orange-500 mb-4"></div>
            <ul className="space-y-4">
              {socialLinks.map((link) => (
                <li key={link.name} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors">
                  <Link href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group hover:text-orange-500 transition-colors">
                    <span className="w-5 h-5 flex items-center justify-center group-hover:scale-110 transition-transform group-hover:text-orange-500">{link.icon}</span>
                    <span>{link.name}</span>
                    <span aria-hidden="true" className="text-sm">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>
      
      <motion.section 
        className="mb-20"
        variants={slideUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-3xl font-bold mb-4">My Mission</h2>
        <div className="w-12 h-1 bg-orange-500 mb-6"></div>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            To craft sonic experiences that are not only technically excellent but also emotionally resonant. I believe sound should enhance storytelling and create meaningful connections with audiences.
          </p>
        </div>
      </motion.section>
      
      <motion.section 
        className="mb-10"
        variants={slideUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <div className="bg-white dark:bg-gray-800 p-10 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm text-center">
          <h2 className="text-3xl font-bold mb-4">Let's Talk</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to elevate your project with professional sound? I'm here to help bring your vision to life with custom audio that resonates with your audience.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Email me at</p>
              <a href="mailto:lorenzopardell@gmail.com" className="font-medium text-gray-800 dark:text-gray-200 hover:text-orange-500 transition-colors">
                lorenzopardell@gmail.com
              </a>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Call me</p>
              <a href="tel:+5511917619699" className="font-medium text-gray-800 dark:text-gray-200 hover:text-orange-500 transition-colors">
                +55 11 91761-9699
              </a>
            </div>
          </div>
          
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-colors"
          >
            <span>Get in Touch</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </motion.section>
    </main>
  );
}

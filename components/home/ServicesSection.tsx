"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    title: "Re-Recording Mix",
    description: "Professional mixing that delivers exceptional sound quality across all platforms and formats",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
        <path d="M22 8.5c0-.28-.22-.5-.5-.5h-3c-.28 0-.5.22-.5.5v3c0 .28.22.5.5.5h3c.28 0 .5-.22.5-.5v-3Z"/>
        <path d="M6 12h4"/>
        <path d="M14 12h4"/>
        <path d="M10 16v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3"/>
        <path d="M5 10v4a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1Z"/>
        <path d="M2 2v20"/>
      </svg>
    ),
    link: "/services#re-recording-mix"
  },
  {
    title: "Sound Design",
    description: "Bespoke sonic environments that enhance storytelling and create emotional connections",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
        <path d="M2 9.5V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4.5"/>
        <path d="M2 14.5V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4.5"/>
        <path d="M8 8a2 2 0 1 1 4 0v8a2 2 0 1 1-4 0z"/>
        <path d="M16 12h-2"/>
        <path d="M16 9h-5"/>
        <path d="M16 15h-5"/>
      </svg>
    ),
    link: "/services#sound-design"
  },
  {
    title: "Audio Editing",
    description: "Precise editing that enhances clarity and ensures professional-quality sound",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
        <path d="M3 6h18"/>
        <path d="M7 12h10"/>
        <path d="M10 18h4"/>
      </svg>
    ),
    link: "/services#audio-editing"
  }
];

export function ServicesSection() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="w-full py-14">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Services</h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto mb-6"></div>
          {<p className="text-gray-600 max-w-2xl mx-auto">
            Specialized audio solutions for your creative vision
          </p>}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-white p-6 rounded-md border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-5">{service.description}</p>
              <Link href={service.link} className="text-orange-500 hover:text-orange-600 font-medium text-sm flex items-center">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection; 
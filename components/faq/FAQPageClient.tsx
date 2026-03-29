"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { copy } from "@/lib/copy";

export default function FAQPageClient() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full bg-gray-50 py-16 md:py-24">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {copy.faqPage.hero.title}
            </h1>
            <div className="w-12 h-1 bg-orange-500 rounded-full mb-6" />
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
              {copy.faqPage.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="w-full py-16">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div className="flex flex-col gap-16">
            {copy.faqPage.categories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  {category.name}
                </h2>
                <div className="w-12 h-1 bg-orange-500 rounded-full mb-6" />
                <Accordion type="single" collapsible className="border rounded-lg overflow-hidden">
                  {category.entries.map((entry, entryIndex) => (
                    <AccordionItem
                      key={entryIndex}
                      value={`${categoryIndex}-${entryIndex}`}
                    >
                      <AccordionTrigger className="text-left text-gray-800 font-medium text-base hover:text-orange-600 px-4">
                        {entry.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 leading-relaxed px-4">
                        {entry.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-2xl"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              {copy.faqPage.cta.title}
            </h2>
            <div className="w-12 h-1 bg-orange-500 rounded-full mb-6" />
            <p className="text-gray-600 leading-relaxed mb-8">
              {copy.faqPage.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={copy.faqPage.cta.primaryAction.href}
                className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full transition-colors duration-200"
              >
                {copy.faqPage.cta.primaryAction.label}
              </Link>
              <a
                href={copy.faqPage.cta.secondaryAction.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 hover:border-orange-500 hover:text-orange-600 text-gray-700 font-medium rounded-full transition-colors duration-200"
              >
                {copy.faqPage.cta.secondaryAction.label}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

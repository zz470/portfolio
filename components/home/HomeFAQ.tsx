"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { copy } from "@/lib/copy";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HomeFAQ() {
  const { sectionTitle, entries, linkText, linkHref } = copy.homeFaq;

  return (
    <section className="w-full py-20">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {sectionTitle}
          </h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto"></div>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          variants={fadeIn}
          initial="initial"
          animate="animate"
        >
          <Accordion type="single" collapsible className="w-full">
            {entries.map((entry, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base font-medium text-gray-900 hover:text-orange-500">
                  {entry.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  {entry.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-8">
            <Link
              href={linkHref}
              className="text-orange-500 hover:text-orange-600 font-medium text-sm inline-flex items-center"
            >
              {linkText}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

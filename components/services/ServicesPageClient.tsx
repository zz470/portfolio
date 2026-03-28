"use client"

import React from "react";
import { motion } from "framer-motion";
import { copy } from "@/lib/copy";

/**
 * Animation variants for consistent motion effects throughout the page
 * - fadeIn: Simple opacity transition for subtle element appearances
 * - staggerContainer: Creates a cascading effect for child elements
 * - slideUp: Combined opacity and vertical movement for section entrances
 * - pulse: Pulsing animation for interactive elements
 */
const animations = {
  fadeIn: {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
  },
  staggerContainer: {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
    }
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  },
  pulse: {
    scale: [1, 1.2, 1],
    opacity: [0.8, 1, 0.8],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
  }
};

/**
 * Centralized style classes to maintain consistency and reduce repetition
 * - Container and layout styles
 * - Typography classes for different heading levels
 * - Recurring UI elements like orange bars, dots, tags, etc.
 */
const styles = {
  // Layout containers
  container: "w-full max-w-screen-xl mx-auto px-6 md:px-10 pt-16",
  sectionContainer: "mb-20 rounded-xl bg-white p-10 border border-gray-100 shadow-sm scroll-mt-24",
  sectionContent: "w-full",

  // Grid layouts
  grid: {
    features: "grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 mt-8",
    benefits: "grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 mt-8",
    services: "grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 mt-8",
    cards: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  },

  // Typography
  text: {
    // Headings
    pageTitle: "text-4xl md:text-5xl font-bold text-gray-900 mb-6",
    sectionTitle: "text-2xl md:text-3xl font-bold text-gray-900 mb-1",
    subheading: "text-lg font-medium text-gray-800 mb-4 uppercase",
    itemTitle: "text-lg font-medium text-gray-800 mb-2 transition-colors duration-300 group-hover:text-orange-700",
    cardTitle: "text-xl font-medium text-gray-900 mb-2 uppercase",

    // Paragraphs
    intro: "text-gray-600 text-lg leading-relaxed",
    body: "text-gray-700 leading-relaxed mb-6",
    description: "text-gray-700 transition-colors duration-300 group-hover:text-gray-900",
    cardDescription: "text-gray-600",
    smallText: "text-sm text-gray-600"
  },

  // UI Elements
  ui: {
    orangeBar: "w-12 h-1 bg-orange-500 mb-6",
    orangeDot: "w-2 h-2 rounded-full bg-orange-500 mr-3 mt-2 shrink-0 group-hover:shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 group-hover:bg-orange-400",
    itemContainer: "flex items-start gap-3 group p-3 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-50 hover:to-transparent hover:translate-x-1 cursor-pointer -m-3",
    formatTag: "flex items-center relative bg-white border border-gray-100 rounded-lg p-4 shadow-sm w-full",
    formatIcon: "w-10 h-10 rounded-full flex items-center justify-center shrink-0 mr-4 text-white",
    card: "bg-white p-6 border border-gray-100 rounded-md shadow-sm hover:shadow-md transition-shadow"
  }
};

// Page content — sourced from lib/copy.ts, with UI-specific icon/color data merged for formats
const pageContent = copy.servicesPage;



// Reusable components
/**
 * ServiceCard Component
 *
 * Displays a service offering card with title and description
 * Features hover animation that slightly raises the card
 * Used in the Additional Services section to display various audio services
 *
 * @param {string} title - The name of the service
 * @param {string} description - Description of what the service provides
 */
interface ServiceCardProps {
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description }) => (
  <motion.div
    className={styles.ui.card}
    variants={animations.fadeIn}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <h3 className={styles.text.cardTitle}>{title}</h3>
    <p className={styles.text.cardDescription}>{description}</p>
  </motion.div>
);

/**
 * BenefitItem Component
 *
 * Displays a single benefit with orange dot bullet point
 * Used in the Re-recording Mix Engineer section to list project benefits
 * Includes styled title and description formatting
 *
 * @param {string} title - The benefit name/title
 * @param {string} description - Detailed explanation of the benefit
 */
interface BenefitItemProps {
  title: string;
  description: string;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ title, description }) => (
  <div className={styles.ui.itemContainer}>
    <motion.div
      className={styles.ui.orangeDot}
      whileHover={animations.pulse}
    ></motion.div>
    <div>
      <h3 className={styles.text.itemTitle}>{title}</h3>
      <p className={styles.text.description}>{description}</p>
    </div>
  </div>
);

/**
 * FormatTag Component
 *
 * Displays an audio format with icon, name and description
 * Used in the Re-recording Mix Engineer section to showcase supported formats
 * Features spring animation on hover
 *
 * @param {string} name - Format name (e.g., "Dolby Atmos")
 * @param {string} description - Brief description of the format
 * @param {string} color - Tailwind background color class for the icon
 * @param {ReactNode} icon - SVG icon element to display
 */
interface FormatTagProps {
  name: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}

const FormatTag: React.FC<FormatTagProps> = ({ name, description, color, icon }) => (
  <motion.div
    className={styles.ui.formatTag}
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className={`${styles.ui.formatIcon} ${color}`}>
      {icon}
    </div>
    <div className="flex-1">
      <h4 className={styles.text.itemTitle}>{name}</h4>
      <p className={styles.text.smallText}>{description}</p>
    </div>
  </motion.div>
);

/**
 * FeatureItem Component
 *
 * Displays a sound design feature with orange dot and indented description
 * Used in the Sound Design section to highlight key approaches
 *
 * @param {string} title - Feature name (e.g., "Narrative-Driven")
 * @param {string} description - Explanation of the feature
 */
interface FeatureItemProps {
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ title, description }) => (
  <div className={styles.ui.itemContainer}>
    <motion.div
      className={styles.ui.orangeDot}
      whileHover={animations.pulse}
    ></motion.div>
    <div>
      <h3 className={styles.text.itemTitle}>{title}</h3>
      <p className={styles.text.description}>{description}</p>
    </div>
  </div>
);

/**
 * ServiceItem Component
 *
 * Displays a service with orange dot bullet point
 * Used in the Additional Services section
 * Includes styled title and description formatting
 *
 * @param {string} title - The service name
 * @param {string} description - Detailed explanation of the service
 */
interface ServiceItemProps {
  title: string;
  description: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ title, description }) => (
  <div className={styles.ui.itemContainer}>
    <motion.div
      className={styles.ui.orangeDot}
      whileHover={animations.pulse}
    ></motion.div>
    <div>
      <h3 className={styles.text.itemTitle}>{title}</h3>
      <p className={styles.text.description}>{description}</p>
    </div>
  </div>
);

export default function ServicesPageClient() {
  return (
    <div className={styles.container}>
      {/* Intro Section */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.text.pageTitle}>{pageContent.intro.title}</h1>
        <div className={styles.ui.orangeBar}></div>
        <p className={styles.text.intro}>
          {pageContent.intro.description}
        </p>
      </motion.div>

      {/* Re-recording Mix Engineer Section */}
      <motion.div
        id="re-recording-mix"
        className={styles.sectionContainer}
        variants={animations.slideUp}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.sectionContent}>
          <h2 className={styles.text.sectionTitle}>{pageContent.mixing.title}</h2>
          <div className={styles.ui.orangeBar}></div>

          <p className={styles.text.body}>
            {pageContent.mixing.description}
          </p>

          <h3 className={styles.text.subheading}>{pageContent.mixing.benefitsTitle}</h3>

          <div className={styles.grid.benefits}>
            {pageContent.mixing.benefits.map((benefit, index) => (
              <BenefitItem
                key={index}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Sound Design Section */}
      <motion.div
        id="sound-design"
        className={styles.sectionContainer}
        variants={animations.slideUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
      >
        <div className={styles.sectionContent}>
          <h2 className={styles.text.sectionTitle}>{pageContent.soundDesign.title}</h2>
          <div className={styles.ui.orangeBar}></div>

          <p className={styles.text.body}>
            {pageContent.soundDesign.description}
          </p>

          <div className={styles.grid.features}>
            {pageContent.soundDesign.features.map((feature, index) => (
              <FeatureItem
                key={index}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Additional Services Section */}
      <motion.div
        id="audio-editing"
        className={styles.sectionContainer}
        variants={animations.slideUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <div className={styles.sectionContent}>
          <h2 className={styles.text.sectionTitle}>{pageContent.additionalServices.title}</h2>
          <div className={styles.ui.orangeBar}></div>
          <p className={styles.text.body}>
            {pageContent.additionalServices.description}
          </p>

          <div className={styles.grid.services}>
            {pageContent.additionalServices.services.map((service, index) => (
              <ServiceItem
                key={index}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

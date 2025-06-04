"use client"

import { motion } from "framer-motion";

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

// Page content
const pageContent = {
  intro: {
    title: "Services",
    description: "Bringing a project to the finish line is complex. My role is to simplify that process - handling the details, adapting to changing needs, and delivering work that's on time, on spec, and aligned with your vision. Whether you're deep in post or still shaping the story, I offer sound solutions that support your team and elevate the final result."
  },
  mixing: {
    title: "Re-Recording Mix Engineer",
    description: "Sound is one of the final steps in post-production, and often one of the most time-sensitive. I take on the technical and creative responsibility of the mix so you can focus on the bigger picture. Making sure your project is delivered correctly, sounds great, and meets every spec, every time.",
    benefitsTitle: "How This Benefits Your Project",
    benefits: [
      {
        title: "Creative Clarity",
        description: "The mix supports your story - not just technically, but emotionally - making sure the dialogue is clear, the music breathes, and the sound design lands."
      },
      {
        title: "Deadline-Ready",
        description: "With a thoughtful approach to revisions and time management, you can trust the mix will be ready when you need it, without the rush at the finish line."
      },
      {
        title: "Format Flexibility",
        description: "Whether it's stereo, surround, or immersive audio, mixes are delivered in the format your project needs - ready for broadcast, streaming, theatrical, or digital distribution."
      },
      {
        title: "Spec Compliance",
        description: "From loudness standards to channel layouts, stems, and file naming, every detail is covered to ensure your deliverables pass QC smoothly, without any last-minute issues."
      }
    ],
    formats: [
      {
        name: "Dolby Atmos",
        description: "Immersive three-dimensional sound experience",
        color: "bg-orange-500",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="4"></circle>
          </svg>
        )
      },
      {
        name: "5.1/7.1 Surround",
        description: "Theatrical and broadcast standard",
        color: "bg-orange-400",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a9 9 0 0 0-8.5 12"></path>
            <path d="M12 3a9 9 0 0 1 8.5 12"></path>
            <circle cx="12" cy="17" r="1"></circle>
            <circle cx="8" cy="17" r="1"></circle>
            <circle cx="16" cy="17" r="1"></circle>
          </svg>
        )
      },
      {
        name: "Stereo 2.0",
        description: "Optimized for streaming and digital",
        color: "bg-orange-300",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="6" height="14" x="4" y="5" rx="2"></rect>
            <rect width="6" height="14" x="14" y="5" rx="2"></rect>
          </svg>
        )
      }
    ]
  },
  soundDesign: {
    title: "Sound Design",
    description: "Sound is a powerful storytelling tool. It doesn't just fill space - it shapes how your audience experiences the story by creating unique sonic experiences that enhance your narrative, evoke emotional responses, and leave a lasting impression on your audience.",
    features: [
      {
        title: "Narrative-Driven",
        description: "Every sound is chosen and shaped to support the story, not distract from it - helping moments land with more weight and meaning."
      },
      {
        title: "Emotional Impact",
        description: "By manipulating textures, rhythms, and silence, sound builds tension and release, deepens immersion, and creates a dynamic emotional arc."
      },
      {
        title: "World Building",
        description: "Soundscapes enhance the narrative, and immerse the audience in the story. Each element is designed to support the scene and bring the world to life."
      },
      {
        title: "Collaborative Process",
        description: "Working closely with directors, editors, and producers to ensure every sound decision aligns with the vision. I'm open to feedback, and always in service of the final cut."
      }
    ]
  },
  additionalServices: {
    title: "Additional Services",
    description: "Every project has unique audio needs. These specialized services complement my core offerings to provide comprehensive sound solutions for your creative work.",
    services: [
    {
      title: "Audio Editing & Restoration",
      description: "Clear, pristine audio that enhances your message. I remove unwanted noise, clean up dialogue, and recover problematic recordings to ensure your content sounds professional and polished."
    },
    {
      title: "Foley",
      description: "Authentic sound effects that bring your visuals to life. Custom-created foley elements add realism and depth to every interaction on screen, creating a more immersive experience for your audience."
    },
    {
      title: "Field Recording",
      description: "Unique, high-quality audio captured from real environments. Professional equipment and techniques ensure you get authentic sounds that can't be found in standard libraries, giving your project a distinct edge."
    },
    {
      title: "Location Sound",
      description: "Flawless audio capture during your productions. Professional location sound ensures your creative vision isn't compromised by poor audio quality, saving you time and resources in post-production."
    },
    {
      title: "Interactive Audio",
      description: "Dynamic sound systems that respond to user actions. Adaptive soundscapes and responsive audio elements enhance engagement and create memorable experiences for your interactive media projects."
    },
    {
      title: "Audio Branding",
      description: "Distinctive sonic identities that strengthen brand recognition. Custom sound logos and audio branding packages help your audience connect with your brand on a deeper level, improving recall and loyalty."
    }
    ]
  }
};

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

export default function ServicesPage() {
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
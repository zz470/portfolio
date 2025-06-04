import React from 'react';
import { motion } from 'framer-motion';
interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategoryFilterProps) {
  return (
    <div className="mb-6 w-full mt-8">
      <div className="text-center mb-8 text-gray-700 italic font-light text-2xl md:text-3xl tracking-wide">
        Amplifying the impact of stories through sound...

      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 py-3 px-2 md:px-6">
        <motion.button
          className={`uppercase text-xs md:text-xs font-medium tracking-wider px-2 py-1.5 transition-colors relative ${
            selectedCategory === null ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'
          }`}
          onClick={() => onSelectCategory(null)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          SHOW ALL
          {selectedCategory === null && (
            <div className="h-0.5 bg-orange-500 w-full absolute bottom-0 left-0" />
          )}
        </motion.button>
        
        {categories.map((category) => (
          <motion.button
            key={category}
            className={`uppercase text-xs md:text-xs font-medium tracking-wider px-2 py-1.5 transition-colors relative ${
              selectedCategory === category ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'
            }`}
            onClick={() => onSelectCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {category}
            {selectedCategory === category && (
              <div className="h-0.5 bg-orange-500 w-full absolute bottom-0 left-0" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
} 
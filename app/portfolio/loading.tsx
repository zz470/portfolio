"use client"

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <motion.div
        className="flex items-center justify-center space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-4 h-4 rounded-full bg-gray-800 dark:bg-gray-200"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: 0,
          }}
        />
        <motion.div
          className="w-4 h-4 rounded-full bg-gray-800 dark:bg-gray-200"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: 0.2,
          }}
        />
        <motion.div
          className="w-4 h-4 rounded-full bg-gray-800 dark:bg-gray-200"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: 0.4,
          }}
        />
      </motion.div>
      <motion.p 
        className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Loading projects...
      </motion.p>
    </div>
  )
} 
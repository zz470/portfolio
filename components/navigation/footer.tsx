"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { getVisibleSocialLinks } from "@/lib/social-links"

export default function Footer() {
  const pathname = usePathname()
  const currentYear = new Date().getFullYear()
  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ]
  
  // Use the centralized social links configuration
  const socialLinks = getVisibleSocialLinks()
  
  return (
    <footer className="w-full border-t border-gray-200 py-12 bg-gradient-to-b from-background to-gray-50/50">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <Link href="/" className="inline-block font-light text-2xl text-gray-900 hover:text-orange-500 transition-colors">
                LORENZO PARDELL
              </Link>
              <p className="text-sm text-gray-600 max-w-xs mt-3 leading-relaxed italic">
              "I partner with creators and brands to create immersive and meaningful audio experiences."
              </p>
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-medium text-sm uppercase tracking-wider text-gray-900 mb-4">Navigation</h3>
              <nav className="flex flex-col space-y-2.5">
                {navItems.map((item) => (
                  <motion.div
                    key={item.path}
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link 
                      href={item.path}
                      className={`text-sm ${pathname === item.path ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'} transition-colors`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="font-medium text-sm uppercase tracking-wider text-gray-900 mb-4">Connect</h3>
              <div className="flex flex-col space-y-2.5">
                {socialLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link 
                      href={link.href}
                      className="flex items-center text-sm text-gray-600 hover:text-orange-500 transition-colors group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="mr-2 group-hover:scale-110 transition-transform flex items-center justify-center">{link.icon}</span>
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="font-medium text-sm uppercase tracking-wider text-gray-900 mb-4">Get in Touch</h3>
              <div className="space-y-2.5 text-sm text-gray-600">
                <motion.a 
                  href="mailto:lorenzopardell@gmail.com"
                  className="block hover:text-orange-500 transition-colors"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  lorenzopardell@gmail.com
                </motion.a>
                <motion.a
                  href="tel:+5511917619699"
                  className="block hover:text-orange-500 transition-colors"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  +55 11 91761-9699
                </motion.a>
                <motion.p
                  className="block"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  Based in São Paulo, Brazil
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="border-t border-gray-200 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>© {currentYear} Lorenzo Pardell. All rights reserved.</p>
  
        </motion.div>
      </div>
    </footer>
  )
}

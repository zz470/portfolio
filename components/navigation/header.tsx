"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

export default function Header() {
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const isHomePage = pathname === "/"

    const navItems = [
        { name: "Portfolio", path: "/portfolio" },
        { name: "Services", path: "/services" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" }
    ]

    return (
        <header className={`w-full z-50 ${
            isHomePage 
            ? "absolute top-0 bg-transparent" 
            : "sticky top-0 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
        }`}>
            <div className="max-w-screen-xl mx-auto flex h-16 items-center justify-between px-6 md:px-10">
                <div className="font-light text-3xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1.5 }}
                    >
                        <Link href="/" className={`hover:opacity-80 transition-opacity ${isHomePage ? "text-white" : ""}`}>
                            LORENZO PARDELL
                        </Link>
                    </motion.div>
                </div>

                {/* Desktop navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <motion.div
                            key={item.path}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Link 
                                href={item.path}
                                className={`uppercase text-sm font-medium tracking-wider px-2 py-1.5 transition-colors relative ${
                                    pathname === item.path 
                                        ? 'text-orange-500' 
                                        : isHomePage 
                                            ? 'text-white hover:text-orange-500' 
                                            : 'text-gray-700 hover:text-orange-500'
                                }`}
                            >
                                {item.name}
                                {pathname === item.path && (
                                    <div className="h-0.5 bg-orange-500 w-full absolute bottom-0 left-0" />
                                )}
                            </Link>
                        </motion.div>
                    ))}
                </nav>

                {/* Mobile menu button */}
                <motion.button 
                    className={`md:hidden p-2 ${isHomePage ? "text-white" : ""}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {isMobileMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                            <path d="M18 6 6 18"/>
                            <path d="m6 6 12 12"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
                            <line x1="4" x2="20" y1="12" y2="12"/>
                            <line x1="4" x2="20" y1="6" y2="6"/>
                            <line x1="4" x2="20" y1="18" y2="18"/>
                        </svg>
                    )}
                </motion.button>
            </div>

            {/* Mobile navigation */}
            {isMobileMenuOpen && (
                <div className={`md:hidden ${isHomePage ? "bg-black/95" : "bg-background/95"}`}>
                    <div className="max-w-screen-xl mx-auto px-6 py-5">
                        <nav className="flex flex-col space-y-4">
                            {navItems.map((item) => (
                                <motion.div
                                    key={item.path}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Link 
                                        href={item.path}
                                        className={`uppercase text-sm font-medium tracking-wider py-1.5 px-2 transition-colors relative inline-block ${
                                            pathname === item.path 
                                                ? 'text-orange-500' 
                                                : isHomePage 
                                                    ? 'text-white hover:text-orange-500' 
                                                    : 'text-gray-700 hover:text-orange-500'
                                        }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                        {pathname === item.path && (
                                            <div className="h-0.5 bg-orange-500 w-full absolute bottom-0 left-0" />
                                        )}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </div>
                </div>
            )}
        </header>
    )
}
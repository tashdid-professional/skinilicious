"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, topBannerData, siteName } from "@/public/datas/homepage";
import { products } from "@/public/datas/products";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  // Handle scroll visibility
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down - hide navbar
          setIsVisible(false);
        } else {
          // Scrolling up - show navbar
          setIsVisible(true);
        }
        
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  // Close menu and search when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  // Disable scroll when menu or search is open
  useEffect(() => {
    if (isMenuOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen, isSearchOpen]);

  return (
    <>
      {/* Top Banner - Only on Homepage, Not Sticky */}
      {/* {isHome && ( */}
        <div className="bg-[#E6F2DB] text-black py-4.5 text-center text-[10px] sm:text-[18px] font-semibold uppercase">
          {topBannerData}
        </div>
      {/* )} */}

      {/* Main Navbar - Sticky */}
      <nav className={`sticky top-0 z-50 bg-white border-b border-gray-100 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}>
        <div className="container mx-auto py-5 md:py-6 flex items-center justify-between">
          {/* Mobile: Hamburger Button */}
          <div className="flex md:hidden flex-1">
            <button 
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              className="text-black p-1 active:scale-95 transition-transform"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 8h16M4 16h16" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Left: Desktop Navigation Menu */}
          <div className="hidden md:flex flex-1 gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[16px]    transition-colors relative py-0.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-black after:transition-transform after:duration-300 ${
                  pathname === link.href ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Center: Logo */}
          <div className="flex-1 md:flex-none text-center">
            <Link href="/" className="inline-block">
              <h1 className="text-4xl font-bold text-black font-voyage">Skinilicious</h1>
            </Link>
          </div>

          {/* Right: Search Only */}
          <div className="flex-1 flex justify-end">
            <button 
              onClick={toggleSearch}
              aria-label="Search" 
              className="hover:text-gray-400 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="10.5" cy="10.5" r="7.5" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </div>
        </div>

      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSearch}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
            />
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="fixed top-0 left-0 w-full bg-white z-[101] py-12 px-6 shadow-2xl max-h-screen overflow-y-auto"
            >
              <div className="container mx-auto">
                <div className="flex justify-between items-start mb-8">
                  <h2 className="text-[10px] font-bold  tracking-[0.2em] text-neutral-400">Search Products</h2>
                  <button 
                    onClick={toggleSearch}
                    className="p-2 hover:rotate-90 transition-transform duration-300"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                
                <form onSubmit={handleSearch} className="relative mb-12">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="What are you looking for?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-2xl md:text-5xl font-medium border-none outline-none placeholder:text-neutral-200"
                  />
                  <div className="absolute right-0 bottom-2 w-full h-0.5 bg-neutral-100 origin-left scale-x-100 transition-transform duration-700 mt-4" />
                </form>

                {/* Suggestion / Quick Results */}
                {searchQuery.trim().length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {products
                      .filter(p => 
                        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        p.category.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .slice(0, 4)
                      .map(product => (
                        <Link 
                          key={product.id}
                          href={`/product/${product.slug}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="group flex flex-col gap-4"
                        >
                          <div className="relative aspect-4/5 overflow-hidden bg-neutral-50">
                            <Image 
                              src={product.image} 
                              alt={product.name} 
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-black  tracking-wider">{product.name}</h3>
                            <p className="text-neutral-400 text-[12px]  tracking-widest mt-1">{product.category}</p>
                          </div>
                        </Link>
                      ))}
                  </div>
                )}

                {searchQuery.trim().length > 0 && products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                  <p className="text-neutral-400 text-center py-20">No products matching your search.</p>
                )}

                {searchQuery.trim().length > 0 && (
                   <div className="mt-12 pb-8 text-center">
                      <button 
                        onClick={handleSearch}
                        className="text-[11px] font-bold  tracking-[0.2em] underline underline-offset-8 decoration-neutral-200 hover:decoration-black transition-all"
                      >
                        View All Results
                      </button>
                   </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] md:hidden"
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-80 bg-white z-[101] md:hidden shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-6 border-b border-gray-50">
                <Link href="/" onClick={toggleMenu} className="inline-block">
                  <Image 
                    src="/images/logo.png"
                    alt={siteName}
                    width={140}
                    height={40}
                    className="h-7 w-auto object-contain"
                  />
                </Link>
                <button 
                  onClick={toggleMenu}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              
              <nav className="grow pt-10 px-8 space-y-8">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`block text-[18px] font-semibold tracking-widest  transition-colors ${
                        pathname === link.href ? "text-black" : "text-gray-400 hover:text-black"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

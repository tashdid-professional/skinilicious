"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/public/datas/homepage";

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = siteConfig.heroSlides;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative h-162.5 md:h-175 w-full overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 flex flex-col md:flex-row items-center"
        >
          {/* Left Side: Image with sliding animation */}
          <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="relative w-full h-full"
            >
              <Image
                src={slides[currentIndex].image}
                alt={slides[currentIndex].title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>

          {/* Right Side: Text Content with sliding animation */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center px-8 md:px-20 lg:px-32 bg-white">
            <motion.span
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm md:text-[18px] font-medium text-black mb-4 block tracking-[0.02em]"
            >
              {slides[currentIndex].subtitle}
            </motion.span>
            
            <motion.h1
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-3xl md:text-5xl lg:text-[56px] font-medium text-black leading-tight mb-6"
            >
              {slides[currentIndex].title}
            </motion.h1>

            <motion.p
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-[#7e7e7e] text-base md:text-lg mb-10 max-w-md f"
            >
              {slides[currentIndex].description}
            </motion.p>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Link
                href="/shop"
                className="inline-block bg-[#fdf2d1] hover:bg-[#fae8b4] text-black font-bold py-4 px-10 rounded-full  transition-colors tracking-wider"
              >
                {slides[currentIndex].buttonText}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Spinning Circle Text at Bottom Right */}
      <div className="absolute bottom-0 -right-10 z-20 pointer-events-none hidden lg:block">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="relative w-68 h-68 flex items-center justify-center"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <path
              id="circlePath"
              d="M 50, 50 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
              fill="none"
            />
            <text className="text-[13px] uppercase font-bold tracking-widest fill-[#b297e6]">
              <textPath xlinkHref="#circlePath">
                GET THE SKIN YOU WANT TO FEEL •  
              </textPath>
            </text>
          </svg>
        </motion.div>
      </div>

    
    </section>
  );
}

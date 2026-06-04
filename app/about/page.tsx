"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getAboutData } from "@/src/services/api";
import type { AboutData } from "@/src/types";
import Features from "@/components/Features";

export default function AboutPage() {
  const [data, setData] = useState<AboutData | null>(null);

  useEffect(() => {
    getAboutData().then(setData);
  }, []);

  if (!data) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-neutral-400 text-sm tracking-widest uppercase animate-pulse">Loading...</p>
      </main>
    );
  }

  const { hero, mission } = data;

  return (
    <main className="bg-white min-h-screen">
      {/* Breadcrumb ... (rest of breadcrumb stays same) */}
      <div className="bg-[#F8F8F8] py-4">
        <div className="container flex items-center justify-center gap-2 text-[12px] uppercase tracking-widest text-neutral-500">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span className="text-neutral-300">—</span>
          <span className="text-black font-medium">About Us</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-32 container mx-auto px-6 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
          
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative aspect-[4/5] w-full max-w-[500px] mx-auto z-10"
            >
              <Image 
                src={hero.images.main}
                alt="About Skinilicious"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Overlapping Smaller Image */}
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
               className="absolute lg:-bottom-24 -bottom-5 -right-4 md:-right-10 w-[50%] aspect-[3/4] z-20  "
            >
              <Image 
                src={hero.images.secondary}
                alt="Product Detail"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Text Content Side */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-[32px] md:text-[48px] font-medium text-black leading-[1.1] mb-6 md:mb-8 tracking-tight">
                {hero.title}
              </h1>
              
              <p className="text-neutral-500 text-[15px] md:text-[18px] leading-relaxed mb-8 md:mb-12 max-w-xl">
                {hero.description}
              </p>

              <div className="h-px w-full bg-neutral-100 mb-8 md:mb-12" />

              <div className="grid grid-cols-2 gap-8 md:gap-12">
                {hero.stats.map((stat, idx) => (
                  <div key={idx}>
                    <h3 className="text-[36px] md:text-[56px] font-medium text-black mb-1 md:mb-2 tracking-tight">
                      {stat.value}
                    </h3>
                    <p className=" text-[14px] md:text-[16px] font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Features />

      {/* Mission Section (New from screenshot) */}
      <section className="py-16 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-32">
            
            {/* Image Side (Right) */}
            <div className="w-full lg:w-1/2 relative flex justify-end mb-16 lg:mb-0">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative aspect-[4/5] w-full max-w-[550px] z-10"
              >
                <Image 
                  src={mission.images.main}
                  alt="Mission Skinilicious"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Overlapping Floating Image */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                className="absolute top-1/2 -left-4 md:-left-20 -translate-y-1/2 w-[45%] aspect-[3/4] z-20 shadow-2xl"
              >
                <Image 
                  src={mission.images.floating}
                  alt="Natural Extracts"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>

            {/* Text Content Side (Left) */}
            <div className="w-full lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <h2 className="text-[32px] md:text-[48px] font-medium text-black leading-[1.1] mb-8 md:mb-12 tracking-tight">
                  {mission.title}
                </h2>
                
                <p className="text-neutral-500 text-[15px] md:text-[18px] leading-relaxed max-w-xl whitespace-pre-line">
                  {mission.description}
                </p>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}


"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { aboutData } from "@/public/datas/about";
import Features from "@/components/Features";

export default function AboutPage() {
  const { hero, mission } = aboutData;

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
      <section className="py-24 md:py-32 container mx-auto px-6 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
          
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
               className="absolute -bottom-12 -right-4 md:right-0 w-[50%] aspect-[3/4] z-20 border-[12px] border-white shadow-2xl"
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
              <h1 className="text-[42px] md:text-[64px] font-medium text-black leading-[1.1] mb-8 tracking-tight">
                {hero.title}
              </h1>
              
              <p className="text-neutral-500 text-[16px] md:text-[18px] leading-relaxed mb-12 max-w-xl">
                {hero.description}
              </p>

              <div className="h-px w-full bg-neutral-100 mb-12" />

              <div className="grid grid-cols-2 gap-12">
                {hero.stats.map((stat, idx) => (
                  <div key={idx}>
                    <h3 className="text-[42px] md:text-[56px] font-medium text-black mb-2 tracking-tight">
                      {stat.value}
                    </h3>
                    <p className="text-neutral-500 text-[14px] md:text-[16px] font-medium">
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
      <section className="py-24 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-20 lg:gap-32">
            
            {/* Image Side (Right) */}
            <div className="w-full lg:w-1/2 relative flex justify-end">
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
                className="absolute top-1/2 -left-12 md:-left-20 -translate-y-1/2 w-[45%] aspect-[3/4] z-20 shadow-2xl"
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
                <h2 className="text-[42px] md:text-[56px] font-medium text-black leading-[1.1] mb-12 tracking-tight">
                  {mission.title}
                </h2>
                
                <p className="text-neutral-500 text-[15px] md:text-[16px] leading-relaxed mb-10 max-w-xl">
                  {mission.intro}
                </p>

                <div className="space-y-10">
                  {mission.sections.map((section, idx) => (
                    <div key={idx} className="max-w-xl">
                      <p className="text-neutral-500 text-[15px] md:text-[16px] leading-relaxed mb-2">
                        {section.content}
                      </p>
                      <p className="text-black font-bold text-[18px]">
                        {section.highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}


"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getFeaturesData } from "@/src/services/api";
import type { Feature } from "@/src/types";

export default function Features() {
  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    getFeaturesData().then(setFeatures);
  }, []);

  if (features.length === 0) return null;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="py-10  container mx-auto px-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
        {features.map((feature, idx) => (
          <div key={idx} className="flex flex-col items-center text-center max-w-sm mx-auto">
            <div className="mb-6 w-28 h-28 border border-gray-200 flex items-center justify-center rounded-xs overflow-hidden grayscale contrast-125">
               <Image 
                src={feature.image!} 
                alt={feature.title} 
                width={120} 
                height={120} 
                className="object-contain"
               />
            </div>
            <h3 className="text-xl md:text-2xl font-medium text-black mb-4">
              {feature.title}
            </h3>
            <p className="text-[#7e7e7e] text-sm md:text-[15px] leading-relaxed  max-w-xs">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

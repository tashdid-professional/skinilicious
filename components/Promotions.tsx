"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { promotionsData } from "@/public/datas/homepage";

export default function Promotions() {
  const promotions = promotionsData;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="py-10 md:py-18 container mx-auto px-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {promotions.map((promo, idx) => (
          <Link 
            key={idx} 
            href={promo.href}
            className="relative aspect-square overflow-hidden group"
            style={{ backgroundColor: promo.bgColor }}
          >
            <Image 
              src={promo.image} 
              alt={promo.badge} 
              fill 
              className="object-cover mix-multiply transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-end justify-center pb-10">
              <span className="bg-white text-black px-8 py-3.5 rounded-full  font-semibold tracking-wider shadow-lg">
                {promo.badge}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </motion.section>
  );
}

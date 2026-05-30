"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/public/datas/homepage";

export default function OurPicks() {
  const { title, categories } = siteConfig.ourPicks;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="pt-20 pb-6 bg-white container mx-auto px-4"
    >
      <div className="mb-12 md:mb-16">
        <h2 className="text-3xl md:text-[48px] font-medium text-black">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-8">
        {categories.map((category, index) => (
          <Link 
            key={index} 
            href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="flex flex-col items-center group text-center"
          >
            {/* Circular Image Container */}
            <div className="relative w-[85%] aspect-square rounded-full overflow-hidden mb-6 bg-[#f7f7f7]">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Category Name & Count */}
            <div className="flex items-start">
              <span className="text-[16px] md:text-[20px] font-medium text-black">
                {category.name}
              </span>
              <sup className="ml-1 text-[11px] md:text-[14px] font-semibold text-black mt-1">
                {category.count}
              </sup>
            </div>
          </Link>
        ))}
      </div>
    </motion.section>
  );
}

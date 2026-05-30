"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/public/datas/homepage";

export default function DiscoverySection() {
  const { title, items } = siteConfig.discovery;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="py-20 md:py-28 bg-white container mx-auto px-4"
    >
      <div className="text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-[48px] font-semibold text-black mb-12 md:mb-16">
          {title}
        </h2>

        {/* Discovery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col items-center group">
              {/* Image Container */}
              <div className="relative aspect-[16/9] w-full overflow-hidden mb-8">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Text Content */}
              <h3 className="text-2xl md:text-[32px] font-semibold text-black mb-4">
                {item.title}
              </h3>
              <Link 
                href={item.href}
                className="uppercase text-xs md:text-[15px] font-black border-b border-black pb-1 hover:opacity-70 transition-opacity"
              >
                {item.linkText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

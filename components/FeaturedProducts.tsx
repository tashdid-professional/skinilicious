"use client";

import { products } from "@/public/datas/products";
import { siteConfig } from "@/public/datas/homepage";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

export default function FeaturedProducts() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="py-20 md:py-28 bg-white container mx-auto px-4"
    >
      <div className="text-center">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-[40px] font-semibold text-black mb-4">
            {siteConfig.featuredProducts.title}
          </h2>
          <p className="text-[#7e7e7e] text-sm md:text-[18px] font-medium">
            {siteConfig.featuredProducts.subtitle}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {featuredProducts.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}


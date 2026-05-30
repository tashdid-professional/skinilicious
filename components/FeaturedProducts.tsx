"use client";

import { products } from "@/public/datas/products";
import { featuredProductsData } from "@/public/datas/homepage";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FeaturedProducts() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="py-18  bg-white container mx-auto px-4"
    >
      <div>
        {/* Section Header */}
        <div className="mb-12 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4  ">
          <h2 className="text-3xl md:text-[48px] font-medium text-black leading-none">
            {featuredProductsData.title}
          </h2>
          <Link 
            href="/shop"
            className="uppercase hidden lg:flex text-sm md:text-[15px] font-semibold border-b border-black pb-1 hover:opacity-70 transition-opacity w-fit"
          >
            {featuredProductsData.subtitle}
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 gap-x-3 gap-y-12">
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


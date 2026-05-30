"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { blogs, Blog } from "@/public/datas/blogs";

const POSTS_PER_PAGE = 6;

export default function BlogListingPage() {
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination Logic
  const totalPages = Math.ceil(blogs.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentBlogs = blogs.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="bg-[#F8F8F8] py-24 md:py-32 flex flex-col items-center justify-center text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[48px] md:text-[64px] font-medium text-black mb-6"
        >
          Blogs
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2 text-[12px] uppercase tracking-widest text-neutral-500"
        >
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span className="text-neutral-300">—</span>
          <span className="text-black font-medium">Blogs</span>
        </motion.div>
      </section>

      {/* Blogs Grid */}
      <section className="py-24 container mx-auto px-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
        >
          {currentBlogs.map((blog: Blog) => (
            <motion.div key={blog.id} variants={itemVariants} className="group">
              <Link href={`/blog/${blog.slug}`} className="block">
                <div className="relative aspect-[3/2] overflow-hidden mb-6">
                  <Image 
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                <div className="flex items-center gap-2 text-[12px] uppercase tracking-widest text-neutral-400 mb-3 font-medium">
                  <span>{blog.category}</span>
                  <span className="text-neutral-300">|</span>
                  <span>{blog.date}</span>
                </div>

                <h2 className="text-[20px] font-medium text-black leading-tight group-hover:text-neutral-600 transition-colors">
                  {blog.title}
                </h2>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-20 flex items-center justify-center gap-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => {
                   setCurrentPage(page);
                   window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-medium transition-all ${
                  currentPage === page 
                  ? "bg-black text-white" 
                  : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

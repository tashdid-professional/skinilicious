"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getBlogs } from "@/src/services/api";
import type { Blog } from "@/src/types";

const POSTS_PER_PAGE = 6;

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getBlogs().then(setBlogs);
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(blogs.length / POSTS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentBlogs = blogs.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <main className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="bg-[#F8F8F8] py-16 md:py-24  flex flex-col items-center justify-center text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[32px] md:text-[48px] font-medium text-black mb-4 md:mb-6"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {currentBlogs.length === 0 && (
            <div className="col-span-full text-center py-20">
              <p className="text-neutral-400 text-sm tracking-widest uppercase animate-pulse">Loading...</p>
            </div>
          )}
          {currentBlogs.map((blog: Blog, index: number) => (
            <motion.div 
              key={blog.id} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 1.2, 
                ease: "easeOut",
                delay: (index % 3) * 0.1 
              }}
              className="group"
            >
              <Link href={`/blog/${blog.slug}`} className="block">
                <div className="relative aspect-16/9 overflow-hidden mb-6">
                  <Image 
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                
                <div className="flex items-center gap-2 text-[15px] uppercase tracking-widest text-neutral-400 mb-3 ">
                  <span>{blog.category}</span>
                  <span className="text-neutral-300">|</span>
                  <span>{blog.date}</span>
                </div>

                <h2 className="text-[24px] font-medium text-black leading-tight group-hover:text-neutral-600 transition-colors">
                  {blog.title}
                </h2>
              </Link>
            </motion.div>
          ))}
        </div>

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

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { blogs, Blog } from "@/public/datas/blogs";

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Blog not found</p>
      </div>
    );
  }

  const currentIndex = blogs.findIndex((b) => b.id === blog.id);
  const prevBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null;
  const nextBlog = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;

  // Related posts: pick 3 others from same category or just next 3
  const relatedPosts = blogs
    .filter((b) => b.id !== blog.id)
    .slice(0, 3);

  return (
    <main className="bg-white min-h-screen">
      {/* Breadcrumb Header */}
      <div className="bg-[#F8F8F8] py-4 border-b border-neutral-100">
        <div className="container mx-auto px-6 flex items-center justify-center gap-2 text-[12px] uppercase tracking-widest text-neutral-500 overflow-hidden text-ellipsis whitespace-nowrap">
          <Link href="/" className="hover:text-black transition-colors shrink-0">Home</Link>
          <span className="text-neutral-300">—</span>
          <Link href="/blog" className="hover:text-black transition-colors shrink-0">News</Link>
          <span className="text-neutral-300">—</span>
          <span className="text-black font-medium truncate">{blog.title}</span>
        </div>
      </div>

      {/* Blog Hero Section */}
      <section className="pt-20 pb-16 container mx-auto px-6 max-w-5xl text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <span className="text-[12px] uppercase tracking-[0.2em] text-neutral-400 font-bold mb-6 block font-satoshi">
            {blog.category}
          </span>
          <h1 className="text-[40px] md:text-[60px] font-medium text-black leading-[1.1] mb-8 tracking-tight max-w-4xl mx-auto font-satoshi">
            {blog.title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-[15px] text-neutral-500 font-satoshi">
            <span>By <span className="text-black font-medium">{blog.author}</span></span>
            <span className="text-neutral-300">|</span>
            <span>{blog.date}</span>
          </div>
        </motion.div>
      </section>

      {/* Main Image */}
      <section className="container mx-auto px-6 max-w-6xl mb-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative aspect-[16/9] w-full"
        >
          <Image 
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-6 max-w-3xl mb-32">
        <div className="prose prose-neutral prose-lg max-w-none">
          <p className="text-neutral-600 text-[18px] leading-[1.8] font-satoshi mb-8">
            {blog.description}
          </p>
          <p className="text-neutral-600 text-[18px] leading-[1.8] font-satoshi">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac scelerisque lorem. 
            Maecenas vel magna sodales, molestie magna id, tempus est. Duis interdum massa nisl, 
            quis sollicitudin orci sodales non. Curabitur sed lectus finibus, varius dui in, 
            efficitur nisl. Quisque id urna in ex tristique pretium.
          </p>
        </div>
      </section>

      {/* Previous/Next Navigation */}
      <section className="border-t border-neutral-100 py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between gap-12">
             {/* Previous */}
             {prevBlog ? (
               <div className="flex flex-col items-start gap-4 flex-1">
                 <span className="text-[12px] uppercase tracking-widest text-neutral-400 font-bold">Previous</span>
                 <Link href={`/blog/${prevBlog.slug}`} className="group flex items-center gap-4 text-black text-left">
                    <span className="text-2xl transition-transform group-hover:-translate-x-2 shrink-0">←</span>
                    <span className="text-[18px] font-medium hover:text-neutral-600 transition-colors line-clamp-2">
                      {prevBlog.title}
                    </span>
                 </Link>
               </div>
             ) : <div className="flex-1" />}

             {/* Next */}
             {nextBlog ? (
               <div className="flex flex-col items-end gap-4 flex-1 text-right">
                 <span className="text-[12px] uppercase tracking-widest text-neutral-400 font-bold">Next</span>
                 <Link href={`/blog/${nextBlog.slug}`} className="group flex items-center gap-4 text-black text-right justify-end">
                    <span className="text-[18px] font-medium hover:text-neutral-600 transition-colors line-clamp-2">
                      {nextBlog.title}
                    </span>
                    <span className="text-2xl transition-transform group-hover:translate-x-2 shrink-0">→</span>
                 </Link>
               </div>
             ) : <div className="flex-1" />}
          </div>
        </div>
      </section>

      {/* Related Posts Section */}
      <section className="py-24 bg-white border-t border-neutral-100">
        <div className="container mx-auto px-6">
          <h2 className="text-[36px] font-medium text-black text-center mb-16 font-satoshi">
            Related Posts
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {relatedPosts.map((post) => (
              <div key={post.id} className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative aspect-[3/2] overflow-hidden mb-6">
                    <Image 
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-neutral-400 mb-3 font-bold">
                    <span>{post.category}</span>
                    <span className="text-neutral-300">|</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-[18px] font-semibold text-black leading-tight group-hover:text-neutral-600 transition-colors font-satoshi">
                    {post.title}
                  </h3>
                </Link>
              </div>
            ))}
          </div>

          {/* Carousel dots indicator from design */}
          <div className="mt-16 flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full border border-black transition-colors" />
            <div className="w-2 h-2 rounded-full bg-black" />
          </div>
        </div>
      </section>
    </main>
  );
}

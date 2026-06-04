"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getContactData } from "@/src/services/api";
import type { ContactData } from "@/src/types";

export default function ContactPage() {
  const [data, setData] = useState<ContactData | null>(null);

  useEffect(() => {
    getContactData().then(setData);
  }, []);

  if (!data) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-neutral-400 text-sm tracking-widest uppercase animate-pulse">Loading...</p>
      </main>
    );
  }

  const { header, info } = data;

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
          {header.title}
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2 text-[12px] uppercase tracking-widest text-neutral-500"
        >
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span className="text-neutral-300">—</span>
          <span className="text-black font-medium">Contact Us</span>
        </motion.div>
      </section>

      {/* Main Content Section */}
      <section className="max-w-6xl py-24 md:py-32 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">
          
          {/* Form Side */}
          <div className="w-full lg:w-[65%]">
            <h2 className="text-[32px] md:text-[42px] font-medium text-black mb-12">
              Send A Message
            </h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Name"
                  className="w-full bg-neutral-100 border-0 px-6 py-4 text-[15px] focus:ring-1 focus:ring-black outline-none transition-all"
                />
                <input 
                  type="email" 
                  placeholder="Email"
                  className="w-full bg-neutral-100 border-0 px-6 py-4 text-[15px] focus:ring-1 focus:ring-black outline-none transition-all"
                />
              </div>
              
              <input 
                type="tel" 
                placeholder="Mobile Number"
                className="w-full bg-neutral-100 border-0 px-6 py-4 text-[15px] focus:ring-1 focus:ring-black outline-none transition-all"
              />
              
              <textarea 
                placeholder="Message"
                rows={8}
                className="w-full bg-neutral-100 border-0 px-6 py-4 text-[15px] focus:ring-1 focus:ring-black outline-none transition-all resize-none"
              />

              <button 
                type="submit"
                className="bg-[#F9EFC3] hover:bg-[#f5e4a1] text-black font-bold uppercase tracking-widest text-[12px] px-10 py-4 rounded-full transition-colors mt-4"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Info Side */}
          <div className="w-full lg:w-[35%] space-y-16">
            
            {/* Address Section */}
            <div>
              <h3 className="text-[20px] font-medium text-black mb-6">Address</h3>
              <div className="space-y-6">
                {info.addresses.map((addr, idx) => (
                  <p key={idx} className="text-[#7e7e7e] text-[15px] leading-relaxed">
                    {addr.line1}<br />
                    {addr.line2}
                  </p>
                ))}
              </div>
              
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-[20px] font-medium text-black mb-6">Contact</h3>
              <div className="space-y-3">
                <p className="text-[15px]">
                  <span className="text-[#7e7e7e]">Mobile:</span> <span className="text-black font-medium">{info.contact.mobile}</span>
                </p>
                <p className="text-[15px]">
                  <span className="text-[#7e7e7e]">Hotline:</span> <span className="text-black font-medium">{info.contact.hotline}</span>
                </p>
                <p className="text-[15px]">
                  <span className="text-[#7e7e7e]">E-mail:</span> <span className="text-black font-medium">{info.contact.email}</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

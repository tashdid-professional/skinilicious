"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { legalData } from "@/public/datas/legal";
import Link from "next/link";

export default function FAQPage() {
  const { faq } = legalData;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-[#F8F8F8] py-24 flex flex-col items-center justify-center text-center">
        <h1 className="text-[42px] md:text-[48px] font-medium text-black mb-4">
          {faq.title}
        </h1>
        <div className="flex items-center gap-2 text-[12px] uppercase tracking-widest text-neutral-500">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span className="text-neutral-300">—</span>
          <span className="text-black font-medium">FAQ</span>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 container mx-auto px-6 max-w-3xl">
        <div className="space-y-4">
          {faq.items.map((item, idx) => (
            <div key={idx} className="border-b border-neutral-100 last:border-0">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full py-6 flex items-center justify-between text-left group"
              >
                <span className={`text-[18px] font-medium transition-colors ${openIndex === idx ? 'text-black' : 'text-neutral-600 group-hover:text-black'}`}>
                  {item.question}
                </span>
                <span className={`text-2xl transition-transform duration-300 ${openIndex === idx ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-neutral-500 leading-relaxed text-[16px]">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

"use client";

import React from "react";
import { legalData } from "@/public/datas/legal";
import Link from "next/link";

export default function TermsPage() {
  const { terms } = legalData;

  return (
    <main className="bg-white min-h-screen">
      <section className="bg-[#F8F8F8] py-20 flex flex-col items-center justify-center text-center">
        <h1 className="text-[42px] md:text-[56px] font-medium text-black mb-4">
          {terms.title}
        </h1>
        <div className="flex items-center gap-2 text-[12px] uppercase tracking-widest text-neutral-500">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span className="text-neutral-300">—</span>
          <span className="text-black font-medium text-nowrap">Terms & Conditions</span>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6 max-w-4xl">
        <p className="text-neutral-400 text-[14px] mb-12 uppercase tracking-widest">
          Last Updated: {terms.lastUpdated}
        </p>
        <div className="space-y-12">
          {terms.content.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-[24px] font-medium text-black mb-4">{section.heading}</h2>
              <p className="text-neutral-500 leading-relaxed text-[16px]">
                {section.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

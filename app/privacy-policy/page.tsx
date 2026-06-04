"use client";

import React, { useState, useEffect } from "react";
import { getLegalData } from "@/src/services/api";
import type { LegalData } from "@/src/types";
import Link from "next/link";

export default function PrivacyPage() {
  const [data, setData] = useState<LegalData | null>(null);

  useEffect(() => {
    getLegalData().then(setData);
  }, []);

  if (!data) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-neutral-400 text-sm tracking-widest uppercase animate-pulse">Loading...</p>
      </main>
    );
  }

  const { privacy } = data;

  return (
    <main className="bg-white min-h-screen">
      <section className="bg-[#F8F8F8] py-16 md:py-24 flex flex-col items-center justify-center text-center">
        <h1 className="text-[32px] md:text-[48px] font-medium text-black mb-4">
          {privacy.title}
        </h1>
        <div className="flex items-center gap-2 text-[12px] uppercase tracking-widest text-neutral-500">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span className="text-neutral-300">—</span>
          <span className="text-black font-medium text-nowrap">Privacy Policy</span>
        </div>
      </section>

      <section className="py-16 md:py-24 container mx-auto px-6 max-w-4xl">
        <p className="text-neutral-400 text-[14px] mb-12 uppercase tracking-widest">
          Last Updated: {privacy.lastUpdated}
        </p>
        <div className="space-y-12">
          {privacy.content.map((section, idx) => (
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

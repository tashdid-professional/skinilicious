"use client";

import Link from "next/link";
import Image from "next/image";
import { footerData, siteName } from "@/public/datas/homepage";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi";

export default function Footer() {
  const { newsletter, sections, socials } = footerData;

  const renderSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "fb": return <FaFacebookF />;
      case "insta": return <FaInstagram />;
      case "tiktok": return <FaTiktok />;
      default: return null;
    }
  };

  return (
    <footer className="bg-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          {/* Newsletter Column */}
          <div className="lg:col-span-5">
            <h2 className="text-[32px] md:text-[36px] font-semibold text-black leading-tight mb-4">
              {newsletter.title.split(',').map((part, i) => (
                <span key={i} className="block">{part.trim()}{i === 0 ? ',' : ''}</span>
              ))}
            </h2>
            <p className="text-[#7e7e7e] text-[16px] mb-8">
              {newsletter.subtitle}
            </p>
            <div className="relative max-w-md">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-[#f5f5f5] border-none rounded-sm py-4 px-6 text-[#7e7e7e] focus:ring-1 focus:ring-black outline-none transition-all"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-black hover:translate-x-1 transition-transform">
                <HiOutlineArrowRight size={24} />
              </button>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-1"></div> {/* Spacer */}
          
          {sections.map((section, idx) => (
            <div key={idx} className="lg:col-span-3">
              <h3 className="text-[18px] font-semibold text-black mb-6">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link, lidx) => (
                  <li key={lidx}>
                    <Link 
                      href={link.href}
                      className="text-[#7e7e7e] hover:text-black transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-10 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 items-center gap-8">
          {/* Copyright */}
          <div className="text-[#7e7e7e] text-sm order-3 md:order-1 text-center md:text-left">
            © Skinilicious 2026 | Powered by <a href="https://thebigdogdigital.com" target="_blank" className="hover:text-black font-bold transition-colors">
              BigDog Digital
            </a>
          </div>

          {/* Logo */}
          <div className="order-1 md:order-2 flex justify-center">
            <Link href="/" className="inline-block">
              <Image 
                src="/images/logo.png"
                alt={siteName}
                width={150}
                height={40}
                className="h-8 md:h-10 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center md:justify-end gap-6 order-2 md:order-3">
            {socials.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black text-xl hover:opacity-60 transition-opacity"
                aria-label={social.name}
              >
                {renderSocialIcon(social.icon)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

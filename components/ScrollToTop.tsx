"use client";

import React, { useEffect, useState } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Show button when page is scrolled down and update progress
  const handleScroll = () => {
    // Visibility
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    // Progress calculation
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    setScrollProgress(Math.min(100, Math.ceil(progress)));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Circle properties
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className={`fixed bottom-8 right-8 z-999 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      <button 
        onClick={scrollToTop}
        className="relative w-11 h-11 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex items-center justify-center transition-all cursor-pointer group hover:bg-black"
        aria-label="Scroll to top"
      >
        {/* Progress Circle SVG */}
        <svg className="absolute -rotate-90 w-full h-full" viewBox="0 0 50 50">
          {/* Background Track */}
          <circle
            cx="25"
            cy="25"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-gray-100"
          />
          {/* Progress Fill */}
          <circle
            cx="25"
            cy="25"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray={circumference}
            style={{ 
              strokeDashoffset: dashOffset,
              transition: 'stroke-dashoffset 0.1s ease-out'
            }}
            className="text-green-800 group-hover:text-white"
          />
        </svg>

        {/* Arrow Icon - Always Visible */}
        <div className="relative z-10">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-[#0b8236] group-hover:text-white transition-colors duration-300"
          >
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </div>
      </button>

    </div>
  );
};


export default ScrollToTop;

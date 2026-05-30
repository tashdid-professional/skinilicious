"use client";

import { motion } from "framer-motion";

const Marquee = () => {
  const marqueeItems = [
    "FOLLOW US ON INSTAGRAM",
    "@Skinilicious",
    "FOLLOW US ON INSTAGRAM",
    "@Skinilicious",
    "FOLLOW US ON INSTAGRAM",
    "@Skinilicious",
    "FOLLOW US ON INSTAGRAM",
    "@Skinilicious",
  ];

  return (
    <div className=" py-6 overflow-hidden whitespace-nowrap flex ]">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{
          duration: 150,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex shrink-0 items-center"
      >
        {/* Double the items to create a seamless loop */}
        {[...marqueeItems, ...marqueeItems].map((text, index) => (
          <span
            key={index}
            className={`px-8 text-[14px] md:text-[18px] font-black tracking-[0.1em] uppercase ${
              text.startsWith("@") ? "text-[#b297e6]" : "text-[#b297e6]"
            }`}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;

import React from 'react';
import { useHomeSection, useLocalized } from '../../content/siteContent';

export default function ScaleOfImpact() {
  const c = useHomeSection('impact');
  const tx = useLocalized();

  const stats = c.stats;

  return (
    <section className="w-full bg-[#FAF7F2] border-y border-[#E8DEC8] py-8 sm:py-9 lg:py-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Heading */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-serif text-[#96681E] font-medium tracking-wide mb-6 sm:mb-7">
          {tx(c.heading)}
        </h2>

        {/* 4 Stats Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 md:gap-y-0">
          {stats.map((stat, idx) => {
            const isLast = idx === stats.length - 1;
            return (
              <div
                key={idx}
                className="relative flex flex-col items-center justify-center px-4 py-1"
              >
                {/* Large Serif Number with Clear Lining 1,600 Styling */}
                <span className="font-['Lora',serif] text-4xl sm:text-5xl md:text-6xl text-[#651B12] font-semibold tracking-tight leading-none [font-variant-numeric:lining-nums]">
                  {tx(stat.value)}
                </span>

                {/* Uppercase Sans Label */}
                <span className="font-sans text-[10px] sm:text-[11px] font-bold text-[#5C443C] tracking-[0.2em] uppercase mt-2.5 sm:mt-3">
                  {tx(stat.label)}
                </span>

                {/* Vertical Golden Divider Line (Centered & Proportioned) */}
                {!isLast && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-12 lg:h-14 w-[1px] bg-[#D6A33A]/40" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

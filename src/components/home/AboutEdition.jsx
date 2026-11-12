import React from 'react';
import { useHomeSection, useLocalized } from '../../content/siteContent';
import { resolveImage } from '../../content/assets';

export default function AboutEdition() {
  const c = useHomeSection('about');
  const tx = useLocalized();

  const points = c.points;

  return (
    <section id="about" className="w-full bg-white py-12 sm:py-16 lg:py-20 border-b border-stone-100">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-start">
          {/* Left Column: Heading, Intro, and Narrative Points (Top-Aligned) */}
          <div className="flex flex-col items-start text-left">
            {/* Section Title */}
            <h2 className="font-serif text-[#1A0502] text-2xl sm:text-3xl lg:text-[34px] font-normal tracking-tight leading-tight">
              {tx(c.heading)}
            </h2>

            {/* Intro Narrative */}
            <p className="mt-4 sm:mt-5 text-xs sm:text-[13.5px] text-[#5C443C] leading-relaxed font-sans max-w-[480px]">
              {tx(c.intro)}
            </p>

            {/* 4 Key Points with Bold Leads */}
            <div className="mt-6 sm:mt-7 space-y-3.5 sm:space-y-4">
              {points.map((pt, idx) => (
                <div
                  key={idx}
                  className="text-xs sm:text-[13px] text-[#5C443C] leading-relaxed font-sans max-w-[480px]"
                >
                  <strong className="font-bold text-[#1A0502] mr-1">
                    {tx(pt.title)}
                  </strong>
                  <span>{tx(pt.text)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Image with exact top alignment & aspect ratio */}
          <div className="w-full flex items-start justify-center lg:justify-end">
            <div className="w-full max-w-[540px] overflow-hidden rounded-xl sm:rounded-2xl shadow-md border border-stone-200/60 aspect-[16/11]">
              <img
                src={resolveImage(c.image)}
                alt={tx(c.imageAlt)}
                className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

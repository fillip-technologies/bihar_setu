import React from 'react';
import { useHomeSection, useLocalized } from '../../content/siteContent';
import CmsLink from '../../content/CmsLink';

export default function ActivationEcosystem() {
  const c = useHomeSection('activation');
  const tx = useLocalized();

  const columns = c.columns;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 w-full border-t border-[#F0EBE3]">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-serif text-[#1F0E0A] text-3xl sm:text-4xl lg:text-[40px] font-normal tracking-tight">
            {tx(c.heading)}
          </h2>
        </div>

        {/* 4 Thematic Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {columns.map((col, idx) => (
            <div key={idx} className="flex flex-col justify-start">
              <h3 className="font-serif text-[#1F0E0A] text-lg sm:text-[19px] font-normal leading-snug mb-2">
                {tx(col.title)}
              </h3>
              <p className="text-[#6B5A52] text-xs sm:text-sm leading-relaxed">
                {tx(col.description)}
              </p>
            </div>
          ))}
        </div>

        {/* Centered CTA Button */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <CmsLink
            to={c.buttonLink}
            className="inline-flex items-center justify-center px-8 py-3 bg-[#D6A33A] hover:bg-[#C49129] text-[#1E0904] font-bold text-xs uppercase tracking-wider rounded-full shadow-md transition-all duration-200 active:scale-95 cursor-pointer"
          >
            {tx(c.buttonLabel)}
          </CmsLink>
        </div>
      </div>
    </section>
  );
}


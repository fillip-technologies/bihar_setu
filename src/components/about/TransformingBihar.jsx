import React from 'react';
import { useAboutSection, useLocalized } from '../../content/siteContent';

export default function TransformingBihar() {
  const c = useAboutSection('transform');
  const tx = useLocalized();

  return (
    <section className="bg-[#FAF7F2] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 w-full border-t border-[#EFE8DC]">
      <div className="max-w-6xl mx-auto">
        {/* Transforming Every Dimension of Bihar */}
        <div className="mb-14 sm:mb-18">
          <h2 className="font-serif text-[#1F0E0A] text-2xl sm:text-3xl lg:text-[34px] font-normal tracking-tight mb-2">
            {tx(c.heading)}
          </h2>
          <p className="text-[#6B5A52] text-xs sm:text-sm max-w-4xl leading-relaxed mb-10 sm:mb-12">
            {tx(c.subtitle)}
          </p>

          {/* Dimension Blocks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {c.dimensions.map((dim, idx) => (
              <div key={idx} className="flex flex-col">
                <h3 className="font-serif text-[#1F0E0A] text-base sm:text-[17px] font-medium leading-snug mb-1.5">
                  {tx(dim.title)}
                </h3>
                <p className="text-[#6B5A52] text-xs sm:text-sm leading-relaxed">
                  {tx(dim.description)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* From Idea to Measurable Impact */}
        <div className="pt-6 border-t border-[#E8DEC8]">
          <h3 className="font-serif text-[#1F0E0A] text-xl sm:text-2xl font-normal leading-snug mb-2">
            {tx(c.impactHeading)}
          </h3>
          <p className="text-[#6B5A52] text-xs sm:text-sm max-w-4xl leading-relaxed">
            {tx(c.impactDesc)}
          </p>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Sparkles } from 'lucide-react';
import { useHomeSection, useLocalized } from '../../content/siteContent';
import { SECTOR_ICONS } from '../../content/icons';

export default function SectorsRepresented() {
  const c = useHomeSection('sectors');
  const tx = useLocalized();

  const sectors = c.sectors;

  return (
    <section className="bg-[#FAF7F2] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 w-full border-t border-[#EFE8DC]">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-serif text-[#1F0E0A] text-3xl sm:text-4xl lg:text-[40px] font-normal tracking-tight">
            {tx(c.heading)}
          </h2>
        </div>

        {/* 12 Sectors Grid: 6 columns on lg, 3 on md, 2 on sm */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 sm:gap-x-8 gap-y-10 sm:gap-y-12">
          {sectors.map((sector, idx) => {
            const Icon = SECTOR_ICONS[sector.icon] || Sparkles;
            return (
              <div
                key={idx}
                className="group flex flex-col items-center justify-between text-center"
              >
                {/* Golden Circular Badge with Subtle Icon */}
                <div className="w-12 h-12 rounded-full border border-[#C69A45] flex items-center justify-center transition-all duration-300 group-hover:border-[#A47625] group-hover:bg-[#FAF0DC] group-hover:scale-105 mb-3.5 shadow-xs">
                  <Icon
                    size={20}
                    strokeWidth={1.5}
                    className="text-[#96681E] group-hover:text-[#7A2217] transition-colors"
                  />
                </div>

                {/* Sector Label */}
                <span className="text-[#24120C] text-xs sm:text-sm font-medium tracking-normal leading-snug px-1 flex-1 flex items-center justify-center">
                  {tx(sector.label)}
                </span>

                {/* Bottom Separator Line */}
                <div className="w-full border-b border-[#E8DEC8] mt-6 sm:mt-7" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


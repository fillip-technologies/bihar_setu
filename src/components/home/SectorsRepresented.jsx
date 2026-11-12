import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Landmark,
  Compass,
  Sparkles,
  Home,
  Building2,
  UtensilsCrossed,
  Palette,
  Trees,
  Bus,
  Plane,
  Calendar,
  Globe,
} from 'lucide-react';

export default function SectorsRepresented() {
  const { t } = useTranslation();

  const sectors = [
    { key: 'sectorsSection.sector1', icon: Landmark },
    { key: 'sectorsSection.sector2', icon: Compass },
    { key: 'sectorsSection.sector3', icon: Sparkles },
    { key: 'sectorsSection.sector4', icon: Home },
    { key: 'sectorsSection.sector5', icon: Building2 },
    { key: 'sectorsSection.sector6', icon: UtensilsCrossed },
    { key: 'sectorsSection.sector7', icon: Palette },
    { key: 'sectorsSection.sector8', icon: Trees },
    { key: 'sectorsSection.sector9', icon: Bus },
    { key: 'sectorsSection.sector10', icon: Plane },
    { key: 'sectorsSection.sector11', icon: Calendar },
    { key: 'sectorsSection.sector12', icon: Globe },
  ];

  return (
    <section className="bg-[#FAF7F2] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 w-full border-t border-[#EFE8DC]">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-serif text-[#1F0E0A] text-3xl sm:text-4xl lg:text-[40px] font-normal tracking-tight">
            {t('sectorsSection.heading')}
          </h2>
        </div>

        {/* 12 Sectors Grid: 6 columns on lg, 3 on md, 2 on sm */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 sm:gap-x-8 gap-y-10 sm:gap-y-12">
          {sectors.map((sector) => {
            const Icon = sector.icon;
            return (
              <div
                key={sector.key}
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
                  {t(sector.key)}
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


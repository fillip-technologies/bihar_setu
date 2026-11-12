import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ScaleOfImpact() {
  const { t } = useTranslation();

  const stats = [
    { valueKey: 'impact.stat1Value', labelKey: 'impact.stat1Label' },
    { valueKey: 'impact.stat2Value', labelKey: 'impact.stat2Label' },
    { valueKey: 'impact.stat3Value', labelKey: 'impact.stat3Label' },
    { valueKey: 'impact.stat4Value', labelKey: 'impact.stat4Label' },
  ];

  return (
    <section className="w-full bg-[#7A2217] border-t border-[#8E281C] py-7 sm:py-8 lg:py-9">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Heading */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-serif text-[#F7C568] font-normal tracking-wide mb-6 sm:mb-7">
          {t('impact.heading')}
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
                <span className="font-['Lora',serif] text-4xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight leading-none [font-variant-numeric:lining-nums]">
                  {t(stat.valueKey)}
                </span>

                {/* Uppercase Sans Label */}
                <span className="font-sans text-[10px] sm:text-[11px] font-bold text-white tracking-[0.2em] uppercase mt-2.5 sm:mt-3">
                  {t(stat.labelKey)}
                </span>

                {/* Vertical Golden Divider Line (Centered & Proportioned) */}
                {!isLast && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-12 lg:h-14 w-[1px] bg-[#9C5418]" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

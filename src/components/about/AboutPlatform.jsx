import React from 'react';
import { useTranslation } from 'react-i18next';

export default function AboutPlatform() {
  const { t } = useTranslation();

  const stats = [
    { valueKey: 'aboutPage.stat1Value', labelKey: 'aboutPage.stat1Label' },
    { valueKey: 'aboutPage.stat2Value', labelKey: 'aboutPage.stat2Label' },
    { valueKey: 'aboutPage.stat3Value', labelKey: 'aboutPage.stat3Label' },
  ];

  const pillars = [
    {
      titleKey: 'aboutPage.pillar1Title',
      descKey: 'aboutPage.pillar1Desc',
    },
    {
      titleKey: 'aboutPage.pillar2Title',
      descKey: 'aboutPage.pillar2Desc',
    },
    {
      titleKey: 'aboutPage.pillar3Title',
      descKey: 'aboutPage.pillar3Desc',
    },
    {
      titleKey: 'aboutPage.pillar4Title',
      descKey: 'aboutPage.pillar4Desc',
    },
  ];

  return (
    <section className="bg-[#FAF7F2] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 w-full border-t border-[#EFE8DC]">
      <div className="max-w-6xl mx-auto">
        {/* Top Block: About Bihar Setu & Stats */}
        <div className="mb-14 sm:mb-16">
          <h2 className="font-serif text-[#1F0E0A] text-2xl sm:text-3xl lg:text-[34px] font-normal tracking-tight mb-3">
            {t('aboutPage.platformHeading')}
          </h2>
          <p className="text-[#6B5A52] text-xs sm:text-sm max-w-4xl leading-relaxed mb-8">
            {t('aboutPage.platformIntro')}
          </p>

          {/* 3 Stats */}
          <div className="flex items-center gap-10 sm:gap-14 pt-2">
            {stats.map((stat) => (
              <div key={stat.labelKey} className="flex flex-col">
                <span className="font-serif text-[#1F0E0A] text-3xl sm:text-4xl font-normal leading-none">
                  {t(stat.valueKey)}
                </span>
                <span className="text-[#6B5A52] text-xs sm:text-[13px] font-normal mt-1">
                  {t(stat.labelKey)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Block: Vision & 4 Pillars */}
        <div className="pt-6">
          <h3 className="font-serif text-[#1F0E0A] text-xl sm:text-2xl font-normal leading-snug mb-2">
            {t('aboutPage.visionHeading')}
          </h3>
          <p className="text-[#6B5A52] text-xs sm:text-sm max-w-4xl leading-relaxed mb-8 sm:mb-10">
            {t('aboutPage.visionIntro')}
          </p>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {pillars.map((pillar) => (
              <div key={pillar.titleKey} className="flex flex-col">
                <h4 className="font-serif text-[#1F0E0A] text-base sm:text-[17px] font-medium leading-snug mb-1.5">
                  {t(pillar.titleKey)}
                </h4>
                <p className="text-[#6B5A52] text-xs sm:text-sm leading-relaxed">
                  {t(pillar.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Banner Box */}
        <div className="mt-12 sm:mt-16 bg-[#5E180F] rounded-lg sm:rounded-xl p-6 sm:p-8 text-white shadow-md">
          <p className="font-serif text-lg sm:text-xl md:text-2xl font-normal italic leading-relaxed text-white">
            {t('aboutPage.quote')}
          </p>
          <span className="text-[#D6A33A] text-xs font-semibold uppercase tracking-wider mt-3 block">
            {t('aboutPage.quoteAuthor')}
          </span>
        </div>
      </div>
    </section>
  );
}


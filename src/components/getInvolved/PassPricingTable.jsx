import React from 'react';
import { useLocalized, usePageSection } from '../../content/siteContent';
import CmsLink from '../../content/CmsLink';

export default function PassPricingTable() {
  const c = usePageSection('getInvolved', 'pricing');
  const tx = useLocalized();

  const passes = c.passes;
  // The feature column plus one column per pass, all equally wide.
  const colWidth = { width: `${100 / (passes.length + 1)}%` };

  return (
    <section className="bg-white py-14 sm:py-18 lg:py-20 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <h2 className="font-serif text-[#1F0E0A] text-2xl sm:text-3xl lg:text-[34px] font-normal tracking-tight mb-8">
          {tx(c.heading)}
        </h2>

        {/* Comparison Table Container */}
        <div className="overflow-x-auto rounded-lg border border-[#E8DEC8] shadow-xs">
          <table className="w-full text-left border-collapse min-w-[620px]">
            {/* Table Header */}
            <thead>
<<<<<<< HEAD
              <tr className="bg-[#052E67] text-white">
                <th className="py-4 sm:py-5 px-6 font-medium text-xs sm:text-sm text-center w-1/4">
                  {t('getInvolvedPage.colFeature')}
                </th>
                <th className="py-4 sm:py-5 px-6 font-medium text-xs sm:text-sm text-center w-1/4 border-l border-[#0E448B]">
                  {t('getInvolvedPage.colConference')}
                </th>
                <th className="py-4 sm:py-5 px-6 font-medium text-xs sm:text-sm text-center w-1/4 border-l border-[#0E448B]">
                  {t('getInvolvedPage.colStudent')}
                </th>
                <th className="py-4 sm:py-5 px-6 font-medium text-xs sm:text-sm text-center w-1/4 border-l border-[#0E448B]">
                  {t('getInvolvedPage.colExpo')}
=======
              <tr className="bg-[#651B12] text-white">
                <th className="py-4 sm:py-5 px-6 font-medium text-xs sm:text-sm text-center" style={colWidth}>
                  {tx(c.featureHeading)}
>>>>>>> 3d8d3a01c34975c2ef615ead578541491b808607
                </th>
                {passes.map((pass, idx) => (
                  <th key={idx} className="py-4 sm:py-5 px-6 font-medium text-xs sm:text-sm text-center border-l border-[#8C4A42]" style={colWidth}>
                    {tx(pass.name)}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#E8DEC8] text-[#1F0E0A]">
              {/* Price Row */}
              <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                <td className="py-4 sm:py-5 px-6 font-normal text-xs sm:text-sm text-[#1F0E0A]">
                  {tx(c.priceLabel)}
                </td>
                {passes.map((pass, idx) => (
                  <td key={idx} className="py-4 sm:py-5 px-6 text-center text-xs sm:text-sm border-l border-[#E8DEC8]">
                    <span className="font-normal">{tx(pass.price)}</span>
                  </td>
                ))}
              </tr>

              {/* Feature Rows: a tick for every pass that includes the feature */}
              {c.features.map((feature, idx) => (
                <tr key={idx} className="hover:bg-[#FAF7F2]/60 transition-colors">
                  <td className="py-4 sm:py-5 px-6 font-normal text-xs sm:text-sm text-[#1F0E0A]">
                    {tx(feature.label)}
                  </td>
                  {passes.map((pass, i) => (
                    <td key={i} className="py-4 sm:py-5 px-6 text-center text-xs sm:text-sm border-l border-[#E8DEC8]">
                      {feature.passes?.includes(pass.id) ? (
                        <span className="text-[#1F0E0A] text-sm">✓</span>
                      ) : (
                        <span className="text-[#8A7972] text-sm">✗</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Action Buttons Row */}
              <tr className="bg-[#FAF7F2]/40">
                <td className="py-5 px-6" />
                {passes.map((pass, idx) => (
                  <td key={idx} className="py-5 px-6 text-center border-l border-[#E8DEC8]">
                    {pass.status === 'soldOut' ? (
                      <button
                        type="button"
                        disabled
                        className="inline-flex items-center justify-center px-6 py-2.5 bg-[#EFE5D7] text-[#A8988B] font-bold text-xs uppercase tracking-wider rounded-full cursor-not-allowed whitespace-nowrap"
                      >
                        {tx(c.soldOutLabel)}
                      </button>
                    ) : (
                      <CmsLink
                        to={pass.buttonLink}
                        className="inline-flex items-center justify-center px-6 py-2.5 bg-[#D6A33A] hover:bg-[#C28F27] text-[#1E0904] font-bold text-xs uppercase tracking-wider rounded-full shadow-xs transition-all duration-200 cursor-pointer active:scale-95 whitespace-nowrap"
                      >
                        {tx(pass.buttonLabel)}
                      </CmsLink>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

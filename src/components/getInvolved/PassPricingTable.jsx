import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function PassPricingTable() {
  const { t } = useTranslation();

  const rows = [
    {
      featureKey: 'getInvolvedPage.rowPrice',
      conf: t('getInvolvedPage.priceValue'),
      student: t('getInvolvedPage.priceValue'),
      expo: t('getInvolvedPage.priceValue'),
      isText: true,
    },
    {
      featureKey: 'getInvolvedPage.rowConferenceSessions',
      conf: true,
      student: true,
      expo: false,
    },
    {
      featureKey: 'getInvolvedPage.rowExpoAccess',
      conf: true,
      student: true,
      expo: true,
    },
    {
      featureKey: 'getInvolvedPage.rowLunchNetworking',
      conf: true,
      student: false,
      expo: false,
    },
  ];

  return (
    <section className="bg-white py-14 sm:py-18 lg:py-20 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <h2 className="font-serif text-[#1F0E0A] text-2xl sm:text-3xl lg:text-[34px] font-normal tracking-tight mb-8">
          {t('getInvolvedPage.tableHeading')}
        </h2>

        {/* Comparison Table Container */}
        <div className="overflow-x-auto rounded-lg border border-[#E8DEC8] shadow-xs">
          <table className="w-full text-left border-collapse min-w-[620px]">
            {/* Table Header */}
            <thead>
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
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#E8DEC8] text-[#1F0E0A]">
              {rows.map((row) => (
                <tr
                  key={row.featureKey}
                  className="hover:bg-[#FAF7F2]/60 transition-colors"
                >
                  {/* Feature Label */}
                  <td className="py-4 sm:py-5 px-6 font-normal text-xs sm:text-sm text-[#1F0E0A]">
                    {t(row.featureKey)}
                  </td>

                  {/* Conference Column */}
                  <td className="py-4 sm:py-5 px-6 text-center text-xs sm:text-sm border-l border-[#E8DEC8]">
                    {row.isText ? (
                      <span className="font-normal">{row.conf}</span>
                    ) : row.conf ? (
                      <span className="text-[#1F0E0A] text-sm">✓</span>
                    ) : (
                      <span className="text-[#8A7972] text-sm">✗</span>
                    )}
                  </td>

                  {/* Student Column */}
                  <td className="py-4 sm:py-5 px-6 text-center text-xs sm:text-sm border-l border-[#E8DEC8]">
                    {row.isText ? (
                      <span className="font-normal">{row.student}</span>
                    ) : row.student ? (
                      <span className="text-[#1F0E0A] text-sm">✓</span>
                    ) : (
                      <span className="text-[#8A7972] text-sm">✗</span>
                    )}
                  </td>

                  {/* Expo Column */}
                  <td className="py-4 sm:py-5 px-6 text-center text-xs sm:text-sm border-l border-[#E8DEC8]">
                    {row.isText ? (
                      <span className="font-normal">{row.expo}</span>
                    ) : row.expo ? (
                      <span className="text-[#1F0E0A] text-sm">✓</span>
                    ) : (
                      <span className="text-[#8A7972] text-sm">✗</span>
                    )}
                  </td>
                </tr>
              ))}

              {/* Action Buttons Row */}
              <tr className="bg-[#FAF7F2]/40">
                <td className="py-5 px-6" />
                {/* Conference Button */}
                <td className="py-5 px-6 text-center border-l border-[#E8DEC8]">
                  <Link
                    to="/agenda#register-form"
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-[#D6A33A] hover:bg-[#C28F27] text-[#1E0904] font-bold text-xs uppercase tracking-wider rounded-full shadow-xs transition-all duration-200 cursor-pointer active:scale-95 whitespace-nowrap"
                  >
                    {t('getInvolvedPage.btnRegister')}
                  </Link>
                </td>

                {/* Student Button */}
                <td className="py-5 px-6 text-center border-l border-[#E8DEC8]">
                  <Link
                    to="/agenda#register-form"
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-[#D6A33A] hover:bg-[#C28F27] text-[#1E0904] font-bold text-xs uppercase tracking-wider rounded-full shadow-xs transition-all duration-200 cursor-pointer active:scale-95 whitespace-nowrap"
                  >
                    {t('getInvolvedPage.btnRegister')}
                  </Link>
                </td>

                {/* Expo Button (Sold Out) */}
                <td className="py-5 px-6 text-center border-l border-[#E8DEC8]">
                  <button
                    type="button"
                    disabled
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-[#EFE5D7] text-[#A8988B] font-bold text-xs uppercase tracking-wider rounded-full cursor-not-allowed whitespace-nowrap"
                  >
                    {t('getInvolvedPage.btnSoldOut')}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}


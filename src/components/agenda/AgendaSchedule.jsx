import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, User } from 'lucide-react';

export default function AgendaSchedule() {
  const { t } = useTranslation();
  const [activeDay, setActiveDay] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const day1Panels = [
    {
      id: 1,
      panelNumber: 1,
      duration: 'agendaPage.panelDuration',
      titleKey: 'agendaPage.day1.panel1Title',
    },
    {
      id: 2,
      panelNumber: 2,
      duration: 'agendaPage.panelDuration',
      titleKey: 'agendaPage.day1.panel2Title',
    },
    {
      id: 3,
      panelNumber: 3,
      duration: 'agendaPage.panelDuration',
      titleKey: 'agendaPage.day1.panel3Title',
    },
    {
      id: 4,
      panelNumber: 4,
      duration: 'agendaPage.panelDuration',
      titleKey: 'agendaPage.day1.panel4Title',
    },
  ];

  const day2Panels = [
    {
      id: 5,
      panelNumber: 5,
      duration: 'agendaPage.panelDuration',
      titleKey: 'agendaPage.day2.panel5Title',
    },
    {
      id: 6,
      panelNumber: 6,
      duration: 'agendaPage.panelDuration',
      titleKey: 'agendaPage.day2.panel6Title',
    },
    {
      id: 7,
      panelNumber: 7,
      duration: 'agendaPage.panelDuration',
      titleKey: 'agendaPage.day2.panel7Title',
    },
    {
      id: 8,
      panelNumber: 8,
      duration: 'agendaPage.panelDuration',
      titleKey: 'agendaPage.day2.panel8Title',
    },
  ];

  const currentPanels = activeDay === 1 ? day1Panels : day2Panels;

  // Filter panels by search query
  const filteredPanels = currentPanels.filter((panel) => {
    const title = t(panel.titleKey).toLowerCase();
    return title.includes(searchQuery.toLowerCase());
  });

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 w-full">
      <div className="max-w-5xl mx-auto">
        {/* Day Selector Pills */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
          <button
            type="button"
            onClick={() => setActiveDay(1)}
            className={`px-6 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeDay === 1
                ? 'bg-[#D6A33A] text-[#1F0E0A] shadow-xs'
                : 'border border-[#D6A33A] text-[#5C443C] hover:bg-[#FAF5EC]'
            }`}
          >
            {t('agendaPage.day1Tab')}
          </button>
          <button
            type="button"
            onClick={() => setActiveDay(2)}
            className={`px-6 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeDay === 2
                ? 'bg-[#D6A33A] text-[#1F0E0A] shadow-xs'
                : 'border border-[#D6A33A] text-[#5C443C] hover:bg-[#FAF5EC]'
            }`}
          >
            {t('agendaPage.day2Tab')}
          </button>
        </div>

        {/* Search & Stage Meta Information */}
        <div className="border-b border-[#E8DEC8] pb-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative w-full sm:w-72">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A7972]"
              />
              <input
                type="text"
                placeholder={t('agendaPage.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-[#E8DEC8] rounded-md bg-white text-[#1F0E0A] placeholder-[#8A7972] focus:outline-hidden focus:border-[#D6A33A]"
              />
            </div>

            {/* Venue Tag */}
            <div className="text-xs sm:text-sm text-[#6B5A52] font-medium">
              {t('agendaPage.stageVenue')}
            </div>
          </div>

          {/* Timing Note */}
          <p className="text-xs text-[#8A7972] mt-3 leading-relaxed">
            {t('agendaPage.timingNote')}
          </p>
        </div>

        {/* Panels List */}
        <div className="space-y-8 sm:space-y-10">
          {filteredPanels.map((panel) => (
            <div
              key={panel.id}
              className="border-t-4 border-[#651B12] pt-6 transition-all"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                {/* Left: Panel Number & Duration */}
                <div className="md:col-span-3 flex flex-col justify-start">
                  <span className="text-[#A47625] font-semibold text-sm sm:text-base">
                    Panel {panel.panelNumber}
                  </span>
                  <span className="text-[#8A7972] text-xs mt-0.5">
                    {t(panel.duration)}
                  </span>
                </div>

                {/* Right: Panel Title & Speaker Placeholder Avatars */}
                <div className="md:col-span-9 flex flex-col justify-start">
                  <h3 className="font-serif text-[#1F0E0A] text-lg sm:text-xl font-normal leading-snug">
                    {t(panel.titleKey)}
                  </h3>

                  {/* Speaker Avatars Chips */}
                  <div className="flex items-center gap-3 mt-4">
                    <div
                      className="w-10 h-10 rounded-full bg-[#FAF5EB] border border-[#E8DEC8] flex items-center justify-center text-[#B0998B] shadow-2xs"
                      title="Distinguished Speaker"
                    >
                      <User size={18} strokeWidth={1.5} className="text-[#96681E]/60" />
                    </div>
                    <div
                      className="w-10 h-10 rounded-full bg-[#FAF5EB] border border-[#E8DEC8] flex items-center justify-center text-[#B0998B] shadow-2xs"
                      title="Keynote Panelist"
                    >
                      <User size={18} strokeWidth={1.5} className="text-[#96681E]/60" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredPanels.length === 0 && (
            <div className="text-center py-12 text-[#6B5A52] text-sm">
              No sessions found matching your search.
            </div>
          )}
        </div>

        {/* Evening Programme Banner */}
        <div className="mt-12 sm:mt-14 bg-[#FAF5EB] rounded-lg p-5 sm:p-6 border border-[#EFE5D7]">
          <h4 className="text-[#1F0E0A] font-medium text-sm sm:text-base leading-snug">
            {activeDay === 1
              ? t('agendaPage.day1.eveningTitle')
              : t('agendaPage.day2.eveningTitle')}
          </h4>
          <p className="text-[#6B5A52] text-xs sm:text-sm mt-1.5 leading-relaxed">
            {activeDay === 1
              ? t('agendaPage.day1.eveningDesc')
              : t('agendaPage.day2.eveningDesc')}
          </p>
        </div>

        {/* Smooth scroll to registration form */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-gradient-to-r from-[#FAF5EB] to-[#FFF9EE] border border-[#EFE5D7]">
          <div>
            <h4 className="font-serif text-[#1F0E0A] text-base sm:text-lg font-normal">
              {t('agendaPage.registerForm.heading')}
            </h4>
            <p className="text-xs text-[#5C443C] mt-0.5">
              {t('agendaPage.registerForm.subtitle')}
            </p>
          </div>
          <a
            href="#register-form"
            className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 bg-[#D6A33A] hover:bg-[#C28F27] text-[#1E0904] font-bold text-xs uppercase tracking-wider rounded-full shadow-xs transition-all duration-200 cursor-pointer active:scale-95 whitespace-nowrap"
          >
            <span>{t('agendaPage.registerForm.submitBtn')}</span>
            <span className="text-sm">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}


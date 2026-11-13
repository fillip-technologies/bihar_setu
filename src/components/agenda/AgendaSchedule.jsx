import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Search,
  User,
  ClipboardCheck,
  MapPin,
  TrendingUp,
  ShieldCheck,
  Landmark,
  Handshake,
  Laptop,
  Binoculars,
  Drama,
  Bus,
  Flower2,
  Trophy,
  Sprout,
  Users,
  BookOpen,
} from 'lucide-react';

export default function AgendaSchedule() {
  const { t } = useTranslation();
  const [activeDay, setActiveDay] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const day1Panels = [
    {
      id: 1,
      panelNumber: 1,
      icon: ClipboardCheck,
      duration: 'agendaPage.panelDuration',
      titleKey: 'agendaPage.day1.panel1Title',
    },
    {
      id: 2,
      panelNumber: 2,
      icon: MapPin,
      duration: 'agendaPage.panelDuration',
      titleKey: 'agendaPage.day1.panel2Title',
    },
    {
      id: 3,
      panelNumber: 3,
      icon: TrendingUp,
      duration: 'agendaPage.panelDuration',
      titleKey: 'agendaPage.day1.panel3Title',
    },
  ];

  const day2Panels = [
    {
      id: 4,
      panelNumber: 1,
      icon: ShieldCheck,
      duration: 'agendaPage.panelDuration',
      titleKey: 'agendaPage.day2.panel1Title',
    },
    {
      id: 5,
      panelNumber: 2,
      icon: Landmark,
      duration: 'agendaPage.panelDuration',
      titleKey: 'agendaPage.day2.panel2Title',
    },
    {
      id: 6,
      panelNumber: 3,
      icon: Handshake,
      duration: 'agendaPage.panelDuration',
      titleKey: 'agendaPage.day2.panel3Title',
    },
    {
      id: 7,
      panelNumber: 4,
      icon: Laptop,
      duration: 'agendaPage.panelDuration',
      titleKey: 'agendaPage.day2.panel4Title',
    },
  ];

  const day1Evening = [
    {
      id: 'd1-e1',
      icon: Binoculars,
      titleKey: 'agendaPage.day1.evening1Title',
      speakerKey: 'agendaPage.day1.evening1Speaker',
    },
    {
      id: 'd1-e2',
      icon: Drama,
      titleKey: 'agendaPage.day1.evening2Title',
      speakerKey: 'agendaPage.day1.evening2Speaker',
    },
    {
      id: 'd1-e3',
      icon: Bus,
      titleKey: 'agendaPage.day1.evening3Title',
      speakerKey: 'agendaPage.day1.evening3Speaker',
    },
    {
      id: 'd1-e4',
      icon: Flower2,
      titleKey: 'agendaPage.day1.evening4Title',
      speakerKey: 'agendaPage.day1.evening4Speaker',
    },
  ];

  const day2Evening = [
    {
      id: 'd2-e1',
      icon: Trophy,
      titleKey: 'agendaPage.day2.evening1Title',
      speakerKey: 'agendaPage.day2.evening1Speaker',
    },
    {
      id: 'd2-e2',
      icon: Sprout,
      titleKey: 'agendaPage.day2.evening2Title',
      speakerKey: 'agendaPage.day2.evening2Speaker',
    },
    {
      id: 'd2-e3',
      icon: Users,
      titleKey: 'agendaPage.day2.evening3Title',
      speakerKey: 'agendaPage.day2.evening3Speaker',
    },
    {
      id: 'd2-e4',
      icon: BookOpen,
      titleKey: 'agendaPage.day2.evening4Title',
      speakerKey: 'agendaPage.day2.evening4Speaker',
    },
  ];

  const currentPanels = activeDay === 1 ? day1Panels : day2Panels;
  const currentEvening = activeDay === 1 ? day1Evening : day2Evening;

  const query = searchQuery.trim().toLowerCase();

  // Filter panels by search query
  const filteredPanels = currentPanels.filter((panel) => {
    if (!query) return true;
    const title = t(panel.titleKey).toLowerCase();
    return title.includes(query);
  });

  // Filter evening programmes by search query
  const filteredEvening = currentEvening.filter((item) => {
    if (!query) return true;
    const title = t(item.titleKey).toLowerCase();
    const speaker = t(item.speakerKey).toLowerCase();
    return title.includes(query) || speaker.includes(query);
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
        <div className="border-b border-[#E8DEC8] pb-6 mb-8 sm:mb-10">
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

        {/* Agenda Highlights Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2.5 mb-6 sm:mb-8">
            <div className="h-5 w-1 bg-[#D6A33A] rounded-full" />
            <h3 className="font-serif text-[#1F0E0A] text-lg sm:text-xl font-medium tracking-wide uppercase">
              {t('agendaPage.highlightsHeading')}
            </h3>
          </div>

          {/* Panels List */}
          <div className="space-y-8 sm:space-y-10">
            {filteredPanels.map((panel) => {
              const PanelIcon = panel.icon;
              return (
                <div
                  key={panel.id}
                  className="border-t-4 border-[#651B12] pt-6 transition-all"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                    {/* Left: Panel Number & Duration */}
                    <div className="md:col-span-3 flex flex-col justify-start">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#FAF5EB] border border-[#E8DEC8] flex items-center justify-center text-[#651B12] shrink-0">
                          <PanelIcon size={16} strokeWidth={1.8} />
                        </div>
                        <div>
                          <span className="text-[#A47625] font-semibold text-sm sm:text-base block">
                            Panel {panel.panelNumber}
                          </span>
                          <span className="text-[#8A7972] text-xs">
                            {t(panel.duration)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Panel Title & Speaker Placeholder Avatars */}
                    <div className="md:col-span-9 flex flex-col justify-start">
                      <h4 className="font-serif text-[#1F0E0A] text-lg sm:text-xl font-normal leading-snug">
                        {t(panel.titleKey)}
                      </h4>

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
              );
            })}

            {filteredPanels.length === 0 && (
              <div className="text-center py-8 text-[#6B5A52] text-sm bg-[#FAF5EB] rounded-lg border border-[#EFE5D7]">
                No panels found matching your search.
              </div>
            )}
          </div>
        </div>

        {/* Evening Ministerial Programme Section */}
        {filteredEvening.length > 0 && (
          <div className="mt-12 sm:mt-14 bg-[#FAF5EB] rounded-xl p-6 sm:p-8 border border-[#EFE5D7]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-[#E8DEC8]">
              <div className="flex items-center gap-2.5">
                <div className="h-5 w-1 bg-[#D6A33A] rounded-full" />
                <h4 className="font-serif text-[#1F0E0A] text-lg sm:text-xl font-medium tracking-wide uppercase">
                  {t('agendaPage.eveningHeading')}
                </h4>
              </div>
              <span className="text-xs font-semibold text-[#8C291D] bg-white border border-[#E8DEC8] px-3.5 py-1 rounded-full w-fit">
                {activeDay === 1 ? t('agendaPage.day1.dayDate') : t('agendaPage.day2.dayDate')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mt-6">
              {filteredEvening.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg p-4 sm:p-5 border border-[#E8DEC8] flex items-start gap-3.5 transition-all shadow-2xs hover:border-[#D6A33A]/60"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#FAF5EB] border border-[#E8DEC8] flex items-center justify-center shrink-0 text-[#651B12] mt-0.5">
                      <ItemIcon size={18} strokeWidth={1.8} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-[#1F0E0A] text-sm sm:text-base leading-snug">
                        {t(item.titleKey)}
                      </h5>
                      <p className="text-xs sm:text-sm text-[#8C291D] font-medium mt-1">
                        — {t(item.speakerKey)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

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



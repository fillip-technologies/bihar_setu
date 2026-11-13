import React, { useState } from 'react';
import { Search, Sparkles, User } from 'lucide-react';
import { useLocalized, usePageSection } from '../../content/siteContent';
import { CONTENT_ICONS } from '../../content/icons';

export default function AgendaSchedule() {
  const c = usePageSection('agenda', 'schedule');
  const register = usePageSection('agenda', 'register');
  const tx = useLocalized();
  const [activeDay, setActiveDay] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // The saved list may have fewer days than the tab that was selected.
  const dayIndex = Math.min(activeDay, c.days.length - 1);
  const currentDay = c.days[dayIndex];
  // Panels are numbered from 1 on each day.
  const currentPanels = (currentDay?.panels ?? []).map((panel, idx) => ({ ...panel, number: idx + 1 }));
  const currentEvening = currentDay?.evening ?? [];

  const query = searchQuery.trim().toLowerCase();

  // Filter panels by search query
  const filteredPanels = currentPanels.filter((panel) => {
    if (!query) return true;
    const title = tx(panel.title).toLowerCase();
    return title.includes(query);
  });

  // Filter evening programmes by search query
  const filteredEvening = currentEvening.filter((item) => {
    if (!query) return true;
    const title = tx(item.title).toLowerCase();
    const speaker = tx(item.speaker).toLowerCase();
    return title.includes(query) || speaker.includes(query);
  });

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 w-full">
      <div className="max-w-5xl mx-auto">
        {/* Day Selector Pills */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
          {c.days.map((day, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveDay(idx)}
              className={`px-6 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                idx === dayIndex
                  ? 'bg-[#D6A33A] text-[#1F0E0A] shadow-xs'
                  : 'border border-[#D6A33A] text-[#5C443C] hover:bg-[#FAF5EC]'
              }`}
            >
              {tx(day.tab)}
            </button>
          ))}
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
                placeholder={tx(c.searchPlaceholder)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-[#E8DEC8] rounded-md bg-white text-[#1F0E0A] placeholder-[#8A7972] focus:outline-hidden focus:border-[#D6A33A]"
              />
            </div>

            {/* Venue Tag */}
            <div className="text-xs sm:text-sm text-[#6B5A52] font-medium">
              {tx(c.venue)}
            </div>
          </div>

          {/* Timing Note */}
          <p className="text-xs text-[#8A7972] mt-3 leading-relaxed">
            {tx(c.timingNote)}
          </p>
        </div>

        {/* Agenda Highlights Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2.5 mb-6 sm:mb-8">
            <div className="h-5 w-1 bg-[#D6A33A] rounded-full" />
            <h3 className="font-serif text-[#1F0E0A] text-lg sm:text-xl font-medium tracking-wide uppercase">
              {tx(c.highlightsHeading)}
            </h3>
          </div>

          {/* Panels List */}
          <div className="space-y-8 sm:space-y-10">
            {filteredPanels.map((panel) => {
              const PanelIcon = CONTENT_ICONS[panel.icon] || Sparkles;
              return (
                <div
                  key={panel.number}
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
                            {tx(c.panelLabel)} {panel.number}
                          </span>
                          <span className="text-[#8A7972] text-xs">
                            {tx(panel.duration)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Panel Title & Speaker Placeholder Avatars */}
                    <div className="md:col-span-9 flex flex-col justify-start">
                      <h4 className="font-serif text-[#1F0E0A] text-lg sm:text-xl font-normal leading-snug">
                        {tx(panel.title)}
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
                {tx(c.noResults)}
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
                  {tx(c.eveningHeading)}
                </h4>
              </div>
              <span className="text-xs font-semibold text-[#8C291D] bg-white border border-[#E8DEC8] px-3.5 py-1 rounded-full w-fit">
                {tx(currentDay.date)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mt-6">
              {filteredEvening.map((item, idx) => {
                const ItemIcon = CONTENT_ICONS[item.icon] || Sparkles;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-4 sm:p-5 border border-[#E8DEC8] flex items-start gap-3.5 transition-all shadow-2xs hover:border-[#D6A33A]/60"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#FAF5EB] border border-[#E8DEC8] flex items-center justify-center shrink-0 text-[#651B12] mt-0.5">
                      <ItemIcon size={18} strokeWidth={1.8} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-[#1F0E0A] text-sm sm:text-base leading-snug">
                        {tx(item.title)}
                      </h5>
                      <p className="text-xs sm:text-sm text-[#8C291D] font-medium mt-1">
                        — {tx(item.speaker)}
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
              {tx(register.heading)}
            </h4>
            <p className="text-xs text-[#5C443C] mt-0.5">
              {tx(register.subtitle)}
            </p>
          </div>
          <a
            href="#register-form"
            className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 bg-[#D6A33A] hover:bg-[#C28F27] text-[#1E0904] font-bold text-xs uppercase tracking-wider rounded-full shadow-xs transition-all duration-200 cursor-pointer active:scale-95 whitespace-nowrap"
          >
            <span>{tx(register.submitLabel)}</span>
            <span className="text-sm">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}

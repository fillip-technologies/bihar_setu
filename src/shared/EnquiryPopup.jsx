import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquareText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function EnquiryPopup() {
  const { t } = useTranslation();
  const location = useLocation();

  // Hide the floating button when already on the Enquire page
  if (location.pathname === '/enquire') {
    return null;
  }

  return (
    <div className="fixed right-4 sm:right-6 bottom-6 z-40">
      <Link
        to="/enquire"
        className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#052E67] hover:bg-[#07387B] text-white shadow-2xl border-2 border-[#D6A33A] cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 group"
        title="Enquire Now"
      >
        <div className="relative">
          <MessageSquareText size={18} className="text-[#D6A33A] group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#D6A33A] rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#D6A33A] rounded-full" />
        </div>
        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FAF7F2]">
          {t('enquiryPopup.triggerBtn')}
        </span>
      </Link>
    </div>
  );
}

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants/navigation';
import { useHomeSection, useLocalized } from '../content/siteContent';
import CmsLink from '../content/CmsLink';
import navbarLogoDark from '../assets/bihar-setu-navbar-logo-dark.png';

// Content field holding each menu item's label.
const NAV_LABEL_FIELDS = {
  home: 'navHome',
  about: 'navAbout',
  agenda: 'navAgenda',
  speakers: 'navSpeakers',
  partners: 'navPartners',
  getInvolved: 'navGetInvolved',
};

export default function Navbar() {
  const { i18n } = useTranslation();
  const header = useHomeSection('header');
  const tx = useLocalized();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentLang = i18n.language || 'en';

  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('i18nextLng', lang);
    }
  };

  const getIsActive = (link) => {
    if (link.id === 'speakers' && location.pathname === '/speakers') return true;
    if (link.id === 'partners' && location.pathname === '/partners') return true;
    if (link.id === 'get-involved' && location.pathname === '/get-involved') return true;
    if (link.id === 'agenda' && location.pathname === '/agenda') return true;
    if (link.id === 'about' && location.pathname === '/about') return true;
    if (link.id === 'home' && location.pathname === '/') return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF7F2] border-b border-[#E8DEC8] shadow-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Left: Brand Logo */}
          <div className="flex items-center shrink-0">
            <Link to="/" className="flex items-center group py-0.5">
              <img
                src={navbarLogoDark}
                alt="Bihar Setu Logo"
                className="h-11 sm:h-13 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = getIsActive(link);
              return (
                <Link
                  key={link.id}
                  to={link.href}
                  className={`text-[13px] font-bold tracking-wider transition-colors duration-200 uppercase ${
                    isActive
                      ? 'text-[#651B12] border-b-2 border-[#D6A33A] pb-0.5'
                      : 'text-[#2D0B02] hover:text-[#B8800B]'
                  }`}
                >
                  {tx(header[NAV_LABEL_FIELDS[link.key]])}
                </Link>
              );
            })}
          </nav>

          {/* Right: Language Toggle & CTA Buttons */}
          <div className="hidden md:flex items-center gap-3 xl:gap-4 shrink-0">
            {/* Language Toggle Pill: EN | हिंदी */}
            <div className="flex items-center rounded-full border border-[#D6A33A]/70 bg-[#FFF9EE] p-0.5 shadow-2xs">
              <button
                type="button"
                onClick={() => switchLanguage('en')}
                className={`text-[11px] font-bold px-3 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                  currentLang.startsWith('en')
                    ? 'bg-[#D6A33A] text-[#1E0904] shadow-xs'
                    : 'text-[#5C443C] hover:text-[#1E0904]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => switchLanguage('hi')}
                className={`text-[11px] font-bold px-3 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                  currentLang.startsWith('hi')
                    ? 'bg-[#D6A33A] text-[#1E0904] shadow-xs'
                    : 'text-[#5C443C] hover:text-[#1E0904]'
                }`}
              >
                हिंदी
              </button>
            </div>

            {/* CTA 1: GET YOUR PASS (Filled Gold) */}
            <CmsLink
              to={header.passLink}
              className="bg-[#D6A33A] hover:bg-[#C28F27] text-[#1E0904] font-bold text-xs tracking-wider uppercase px-5 py-2.5 rounded-full shadow-xs transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap inline-flex items-center justify-center"
            >
              {tx(header.passLabel)}
            </CmsLink>

            {/* CTA 2: ENQUIRE NOW (Outlined) */}
            <CmsLink
              to={header.enquireLink}
              className="border border-[#651B12] hover:bg-[#651B12] text-[#651B12] hover:text-white font-bold text-xs tracking-wider uppercase px-5 py-2.5 rounded-full transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap inline-flex items-center justify-center"
            >
              {tx(header.enquireLabel)}
            </CmsLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {/* Language Pill Mobile */}
            <div className="flex items-center rounded-full border border-[#D6A33A]/70 bg-[#FFF9EE] p-0.5">
              <button
                type="button"
                onClick={() => switchLanguage('en')}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  currentLang.startsWith('en')
                    ? 'bg-[#D6A33A] text-[#1E0904]'
                    : 'text-[#5C443C]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => switchLanguage('hi')}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  currentLang.startsWith('hi')
                    ? 'bg-[#D6A33A] text-[#1E0904]'
                    : 'text-[#5C443C]'
                }`}
              >
                हिंदी
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-[#2D0B02] hover:text-[#D6A33A] focus:outline-hidden cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-t border-[#E8DEC8] px-4 pt-3 pb-6 space-y-3 shadow-md">
          <div className="flex flex-col space-y-2">
            {NAV_LINKS.map((link) => {
              const isActive = getIsActive(link);
              return (
                <Link
                  key={link.id}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-bold tracking-wider uppercase transition-colors ${
                    isActive
                      ? 'text-[#651B12] bg-[#EFE5D7]'
                      : 'text-[#2D0B02] hover:bg-[#EFE5D7]/60 hover:text-[#651B12]'
                  }`}
                >
                  {tx(header[NAV_LABEL_FIELDS[link.key]])}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E8DEC8] flex flex-col sm:flex-row gap-2">
            <CmsLink
              to={header.passLink}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full bg-[#D6A33A] hover:bg-[#C28F27] text-[#1E0904] font-bold text-xs tracking-wider uppercase py-2.5 rounded-full shadow-xs transition-all text-center inline-flex items-center justify-center"
            >
              {tx(header.passLabel)}
            </CmsLink>
            <CmsLink
              to={header.enquireLink}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full border border-[#651B12] hover:bg-[#651B12] text-[#651B12] hover:text-white font-bold text-xs tracking-wider uppercase py-2.5 rounded-full transition-all text-center inline-flex items-center justify-center"
            >
              {tx(header.enquireLabel)}
            </CmsLink>
          </div>
        </div>
      )}
    </header>
  );
}

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants/navigation';
import { useHomeSection, useLocalized } from '../content/siteContent';
import { resolveImage } from '../content/assets';
import CmsLink from '../content/CmsLink';

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
    <header className="sticky top-0 z-50 w-full bg-[#521810] border-b border-[#3B0E07]/80 shadow-md">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Left: Brand Logo */}
          <div className="flex items-center shrink-0">
            <Link to="/" className="flex items-center group py-0.5">
              <img
                src={resolveImage(header.logo)}
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
                      ? 'text-[#CB9010]'
                      : 'text-white hover:text-[#CB9010]'
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
            <div className="flex items-center rounded-full border border-[#CB9010]/80 bg-[#3B0E07]/60 p-0.5">
              <button
                type="button"
                onClick={() => switchLanguage('en')}
                className={`text-[11px] font-bold px-3 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                  currentLang.startsWith('en')
                    ? 'bg-[#CB9010] text-[#370C01] shadow-xs'
                    : 'text-white hover:text-[#CB9010]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => switchLanguage('hi')}
                className={`text-[11px] font-bold px-3 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                  currentLang.startsWith('hi')
                    ? 'bg-[#CB9010] text-[#370C01] shadow-xs'
                    : 'text-white hover:text-[#CB9010]'
                }`}
              >
                हिंदी
              </button>
            </div>

            {/* CTA 1: GET YOUR PASS (Filled Gold) */}
            <CmsLink
              to={header.passLink}
              className="bg-[#CB9010] hover:bg-[#B8800B] text-[#370C01] font-bold text-xs tracking-wider uppercase px-5 py-2.5 rounded-full shadow-xs transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap inline-flex items-center justify-center"
            >
              {tx(header.passLabel)}
            </CmsLink>

            {/* CTA 2: ENQUIRE NOW (Outlined Gold) */}
            <CmsLink
              to={header.enquireLink}
              className="border border-[#CB9010] hover:bg-[#CB9010]/15 text-[#CB9010] hover:text-[#E0A62E] font-bold text-xs tracking-wider uppercase px-5 py-2.5 rounded-full transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap inline-flex items-center justify-center"
            >
              {tx(header.enquireLabel)}
            </CmsLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {/* Language Pill Mobile */}
            <div className="flex items-center rounded-full border border-[#CB9010]/80 bg-[#3B0E07]/60 p-0.5">
              <button
                type="button"
                onClick={() => switchLanguage('en')}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  currentLang.startsWith('en')
                    ? 'bg-[#CB9010] text-[#370C01]'
                    : 'text-white'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => switchLanguage('hi')}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  currentLang.startsWith('hi')
                    ? 'bg-[#CB9010] text-[#370C01]'
                    : 'text-white'
                }`}
              >
                हिंदी
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:text-[#CB9010] focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#3B0E07] border-t border-[#521810] px-4 pt-3 pb-6 space-y-3">
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
                      ? 'text-[#CB9010] bg-[#521810]'
                      : 'text-white hover:bg-[#521810]/60 hover:text-[#CB9010]'
                  }`}
                >
                  {tx(header[NAV_LABEL_FIELDS[link.key]])}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#521810] flex flex-col sm:flex-row gap-2">
            <CmsLink
              to={header.passLink}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full bg-[#CB9010] hover:bg-[#B8800B] text-[#370C01] font-bold text-xs tracking-wider uppercase py-2.5 rounded-full shadow-xs transition-all text-center"
            >
              {tx(header.passLabel)}
            </CmsLink>
            <CmsLink
              to={header.enquireLink}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full border border-[#CB9010] hover:bg-[#CB9010]/15 text-[#CB9010] font-bold text-xs tracking-wider uppercase py-2.5 rounded-full transition-all text-center inline-flex items-center justify-center"
            >
              {tx(header.enquireLabel)}
            </CmsLink>
          </div>
        </div>
      )}
    </header>
  );
}

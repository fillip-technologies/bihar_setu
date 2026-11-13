import { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { HOME_DEFAULTS } from './homeDefaults';
import { ABOUT_DEFAULTS } from './aboutDefaults';

// Built-in content of every editable page. SiteContentProvider loads the saved content of each of these pages.
export const PAGE_DEFAULTS = { home: HOME_DEFAULTS, about: ABOUT_DEFAULTS };

// Saved sections from the admin panel, keyed by page: { home: { hero: {...}, ... }, about: { ... } }.
export const SiteContentContext = createContext({ home: {}, about: {} });

const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

// Saved values win; objects merge key by key so new default fields still show up, lists are replaced as a whole.
export function mergeContent(defaults, saved) {
  if (saved === undefined || saved === null) return defaults;
  if (isObject(defaults) && isObject(saved)) {
    const out = { ...defaults };
    for (const key of Object.keys(saved)) out[key] = mergeContent(defaults[key], saved[key]);
    return out;
  }
  return saved;
}

export function usePageSection(page, key) {
  const pages = useContext(SiteContentContext);
  return mergeContent(PAGE_DEFAULTS[page][key], pages[page]?.[key]);
}

export const useHomeSection = (key) => usePageSection('home', key);
export const useAboutSection = (key) => usePageSection('about', key);

// Picks the current language from a { en, hi } text, falling back to English.
export function useLocalized() {
  const { i18n } = useTranslation();
  const lang = (i18n.language || 'en').startsWith('hi') ? 'hi' : 'en';
  return (text) => (typeof text === 'string' ? text : text?.[lang] || text?.en || '');
}

// Only allow normal link targets from editable content.
export function safeHref(url) {
  const value = String(url ?? '').trim();
  if (/^(https?:|mailto:|tel:)/i.test(value) || value.startsWith('/') || value.startsWith('#')) return value;
  return value ? `https://${value}` : '#';
}

// Internal links ("/agenda") use the router; everything else is a normal anchor.
export const isInternalLink = (url) => String(url ?? '').startsWith('/') && !String(url).startsWith('//');

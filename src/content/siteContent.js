import { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { HOME_DEFAULTS } from './homeDefaults';
import { ABOUT_DEFAULTS } from './aboutDefaults';
import { AGENDA_DEFAULTS } from './agendaDefaults';
import { SPEAKERS_DEFAULTS } from './speakersDefaults';
import { PARTNERS_DEFAULTS } from './partnersDefaults';
import { GET_INVOLVED_DEFAULTS } from './getInvolvedDefaults';
import { ENQUIRE_DEFAULTS } from './enquireDefaults';

// Built-in content of every editable page, keyed like the server's PAGE_SECTIONS.
export const PAGE_DEFAULTS = {
  home: HOME_DEFAULTS,
  about: ABOUT_DEFAULTS,
  agenda: AGENDA_DEFAULTS,
  speakers: SPEAKERS_DEFAULTS,
  partners: PARTNERS_DEFAULTS,
  getInvolved: GET_INVOLVED_DEFAULTS,
  enquire: ENQUIRE_DEFAULTS,
};

// Saved sections from the admin panel, keyed by page: { home: { hero: {...}, ... }, about: { ... }, ... }.
export const SiteContentContext = createContext({});

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

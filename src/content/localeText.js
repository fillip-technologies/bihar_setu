// Built-in page text comes from the locale files so English and Hindi stay in sync.
import en from '../i18n/locales/en.json';
import hi from '../i18n/locales/hi.json';

const get = (obj, path) => path.split('.').reduce((o, k) => o?.[k], obj) ?? '';

// { en, hi } text for a locale key, e.g. L('hero.venue').
export const L = (path) => ({ en: get(en, path), hi: get(hi, path) });

// range(3, fn) -> [fn(1), fn(2), fn(3)], for numbered locale keys like stat1Value, stat2Value, ...
export const range = (n, fn) => Array.from({ length: n }, (_, i) => fn(i + 1));

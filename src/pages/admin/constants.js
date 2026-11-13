import { HOME_SECTIONS } from '../../content/homeSchema';
import { ABOUT_SECTIONS } from '../../content/aboutSchema';

// Where each form lives on the public website.
export const PUBLIC_PATHS = { agenda: '/agenda#register-form', enquire: '/enquire' };

// Website pages with editable content. Each has an editor at /admin/<key>/<section>.
// `shared` lists sections a page shows from another page: they are edited there and only linked from here.
export const CONTENT_PAGES = [
  { key: 'home', title: 'Home page', path: '/', sections: HOME_SECTIONS },
  {
    key: 'about',
    title: 'About page',
    path: '/about',
    sections: ABOUT_SECTIONS,
    shared: [
      { page: 'home', section: 'about', title: 'First Edition' },
      { page: 'home', section: 'contact', title: 'Get in Touch' },
    ],
  },
];

export const FIELD_TYPES = [
  { value: 'text', label: 'Short text' },
  { value: 'email', label: 'Email address' },
  { value: 'tel', label: 'Mobile number (10 digits)' },
  { value: 'number', label: 'Number' },
  { value: 'date', label: 'Date' },
  { value: 'textarea', label: 'Paragraph (long text)' },
  { value: 'select', label: 'Dropdown' },
  { value: 'radio', label: 'Single choice (cards)' },
  { value: 'checkboxes', label: 'Multiple choice (checkboxes)' },
  { value: 'checkbox', label: 'Agreement checkbox (yes / no)' },
];

export const typeLabel = (type) => FIELD_TYPES.find((t) => t.value === type)?.label ?? type;

export const OPTION_TYPES = ['select', 'radio', 'checkboxes'];
export const PLACEHOLDER_TYPES = ['text', 'email', 'tel', 'number', 'textarea', 'select'];
// Other types always span the full form width.
export const HALF_WIDTH_TYPES = ['text', 'email', 'tel', 'number', 'date', 'select'];

// Same shape (and key order) as the server returns, so drafts can be compared with the saved version.
export function normalizeField(f) {
  return {
    key: f.key,
    type: f.type,
    label: { en: f.label?.en ?? '', hi: f.label?.hi ?? '' },
    placeholder: { en: f.placeholder?.en ?? '', hi: f.placeholder?.hi ?? '' },
    required: Boolean(f.required),
    hidden: Boolean(f.hidden),
    width: f.width === 'full' ? 'full' : 'half',
    options: (f.options ?? []).map((o) => ({ value: o.value, label: { en: o.label?.en ?? '', hi: o.label?.hi ?? '' } })),
    defaultValue: f.defaultValue ?? '',
  };
}

// "Company website" -> "companyWebsite"; non-Latin characters are dropped.
export function keyFromLabel(label, takenKeys) {
  const words = String(label).replace(/[^A-Za-z0-9]+/g, ' ').trim().split(' ').filter(Boolean);
  let key = words.map((w, i) => (i ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w.toLowerCase())).join('');
  if (!/^[a-zA-Z]/.test(key)) key = `field${key}`;
  key = key.slice(0, 36);
  let candidate = key;
  for (let n = 2; takenKeys.has(candidate); n++) candidate = `${key}${n}`;
  return candidate;
}

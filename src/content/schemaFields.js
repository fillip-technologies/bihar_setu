// Building blocks for the admin schemas of each editable page (homeSchema.js, aboutSchema.js, ...).
// Field types: text / textarea (English + Hindi), string (single value: link, email, phone), image, icon, select, list,
// id (hidden, generated once for a new list item), checklist (ticks items of another list in the same section, by id).
import { CONTENT_ICONS } from './icons';

export const text = (key, label) => ({ key, label, type: 'text' });
export const textarea = (key, label) => ({ key, label, type: 'textarea' });
export const string = (key, label, hint) => ({ key, label, type: 'string', hint });
export const image = (key, label) => ({ key, label, type: 'image' });
export const select = (key, label, options) => ({ key, label, type: 'select', options });
export const list = (key, label, itemLabel, fields) => ({ key, label, type: 'list', itemLabel, fields });
export const link = (key, label) => string(key, label, 'A page like /agenda, or a full https:// link');
export const icon = (key, label) => ({ key, label, type: 'icon', options: Object.keys(CONTENT_ICONS) });
export const id = (key) => ({ key, type: 'id' });
// `from` is the key of a list in the same section whose items have an `id` and a `name`.
export const checklist = (key, label, from) => ({ key, label, type: 'checklist', from });

// The title banner every inner page starts with (rendered by shared/PageHero.jsx).
export const heroSection = {
  key: 'hero',
  title: 'Hero Banner',
  fields: [image('image', 'Background image'), text('imageAlt', 'Image description'), text('title', 'Title')],
};

// Empty value for a newly added list item.
export function emptyItem(fields) {
  return Object.fromEntries(
    fields.map((f) => {
      if (f.type === 'text' || f.type === 'textarea') return [f.key, { en: '', hi: '' }];
      if (f.type === 'icon') return [f.key, f.options[0]];
      if (f.type === 'select') return [f.key, f.options[0].value];
      if (f.type === 'list' || f.type === 'checklist') return [f.key, []];
      if (f.type === 'id') return [f.key, Math.random().toString(36).slice(2, 10)];
      return [f.key, ''];
    }),
  );
}

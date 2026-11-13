// Building blocks for the admin schemas of each editable page (homeSchema.js, aboutSchema.js).
// Field types: text / textarea (English + Hindi), string (single value: link, email, phone), image, icon, select, list.
export const text = (key, label) => ({ key, label, type: 'text' });
export const textarea = (key, label) => ({ key, label, type: 'textarea' });
export const string = (key, label, hint) => ({ key, label, type: 'string', hint });
export const image = (key, label) => ({ key, label, type: 'image' });
export const list = (key, label, itemLabel, fields) => ({ key, label, type: 'list', itemLabel, fields });
export const link = (key, label) => string(key, label, 'A page like /agenda, or a full https:// link');

// Empty value for a newly added list item.
export function emptyItem(fields) {
  return Object.fromEntries(
    fields.map((f) => {
      if (f.type === 'text' || f.type === 'textarea') return [f.key, { en: '', hi: '' }];
      if (f.type === 'icon') return [f.key, f.options[0]];
      if (f.type === 'select') return [f.key, f.options[0].value];
      if (f.type === 'list') return [f.key, []];
      return [f.key, ''];
    }),
  );
}

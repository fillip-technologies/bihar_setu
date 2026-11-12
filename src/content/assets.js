// Built-in images are referenced in content as "asset:<path under src/assets>", e.g. "asset:hero/heros-1.jpg",
// so they keep working after a production build renames the files. Uploaded images are "/uploads/..." paths
// (local server folder) or full Cloudinary URLs.
const files = import.meta.glob('../assets/**/*.{png,jpg,jpeg,avif,webp,svg}', { eager: true, import: 'default' });

const byPath = Object.fromEntries(Object.entries(files).map(([path, url]) => [path.replace('../assets/', ''), url]));

// Images in the server's uploads folder live on the API host.
const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export function resolveImage(value) {
  if (typeof value !== 'string' || !value) return '';
  if (value.startsWith('asset:')) return byPath[value.slice(6)] || '';
  if (value.startsWith('/uploads/')) return `${API_BASE}${value}`;
  return /^https?:\/\//.test(value) ? value : '';
}

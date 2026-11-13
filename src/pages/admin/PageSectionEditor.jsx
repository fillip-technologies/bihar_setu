import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ExternalLink, ImagePlus, Loader2, Plus, Trash2 } from 'lucide-react';
import { adminRequest, getPageContent, uploadAdminImage } from '../../utils/api';
import { emptyItem } from '../../content/schemaFields';
import { PAGE_DEFAULTS, mergeContent } from '../../content/siteContent';
import { resolveImage } from '../../content/assets';
import { SECTOR_ICONS } from '../../content/icons';
import { CONTENT_PAGES } from './constants';
import { PageHeader, iconButton, inputClass, labelClass, primaryButton, secondaryButton } from './ui';

function TextField({ field, value, onChange, multiline }) {
  const Input = multiline ? 'textarea' : 'input';
  const v = value && typeof value === 'object' ? value : { en: value || '', hi: '' };
  return (
    <div>
      <p className={labelClass}>{field.label}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {['en', 'hi'].map((lang) => (
          <label key={lang} className="block">
            <span className="mb-1 block text-[11px] text-[#8A7972]">{lang === 'en' ? 'English' : 'Hindi'}</span>
            <Input
              lang={lang}
              rows={multiline ? 3 : undefined}
              value={v[lang] || ''}
              onChange={(e) => onChange({ ...v, [lang]: e.target.value })}
              className={inputClass}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

function ImageField({ field, value, onChange }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const src = resolveImage(value);

  const pick = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const { url } = await uploadAdminImage(file);
      onChange(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <p className={labelClass}>{field.label}</p>
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-32 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#E0D5C3] bg-[#F5F0E8]">
          {src ? <img src={src} alt="" className="h-full w-full object-contain" /> : <span className="text-[11px] text-[#A8988F]">No image</span>}
        </div>
        <div>
          <input ref={inputRef} type="file" accept="image/*" onChange={pick} className="hidden" />
          <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading} className={secondaryButton}>
            {uploading ? <Loader2 size={15} className="animate-spin" /> : <ImagePlus size={15} />}
            {uploading ? 'Uploading...' : 'Change image'}
          </button>
          {error && <p className="mt-1.5 text-xs text-[#B42318]">{error}</p>}
        </div>
      </div>
    </div>
  );
}

function ListField({ field, value, onChange }) {
  const items = Array.isArray(value) ? value : [];
  const update = (index, item) => onChange(items.map((it, i) => (i === index ? item : it)));

  return (
    <div>
      <p className={labelClass}>{field.label}</p>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="rounded-lg border border-[#E0D5C3] bg-[#FDFBF7] p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-[#4A3831]">
                {field.itemLabel} {index + 1}
              </span>
              <button
                type="button"
                onClick={() => onChange(items.filter((_, i) => i !== index))}
                aria-label={`Remove ${field.itemLabel} ${index + 1}`}
                className={`${iconButton} hover:text-[#B42318]`}
              >
                <Trash2 size={15} />
              </button>
            </div>
            <div className="space-y-4">
              {field.fields.map((sub) => (
                <Field key={sub.key} field={sub} value={item?.[sub.key]} onChange={(v) => update(index, { ...item, [sub.key]: v })} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => onChange([...items, emptyItem(field.fields)])} className={`${secondaryButton} mt-3`}>
        <Plus size={15} />
        Add {field.itemLabel.toLowerCase()}
      </button>
    </div>
  );
}

function Field({ field, value, onChange }) {
  switch (field.type) {
    case 'text':
      return <TextField field={field} value={value} onChange={onChange} />;
    case 'textarea':
      return <TextField field={field} value={value} onChange={onChange} multiline />;
    case 'image':
      return <ImageField field={field} value={value} onChange={onChange} />;
    case 'list':
      return <ListField field={field} value={value} onChange={onChange} />;
    case 'icon': {
      const Icon = SECTOR_ICONS[value];
      return (
        <div>
          <p className={labelClass}>{field.label}</p>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C69A45] text-[#96681E]">
              {Icon && <Icon size={17} strokeWidth={1.5} />}
            </span>
            <select value={value || ''} onChange={(e) => onChange(e.target.value)} className={`${inputClass} sm:w-60`}>
              {field.options.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    }
    case 'select':
      return (
        <label className="block">
          <span className={labelClass}>{field.label}</span>
          <select value={value || ''} onChange={(e) => onChange(e.target.value)} className={`${inputClass} sm:w-60`}>
            {field.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      );
    default:
      return (
        <label className="block">
          <span className={labelClass}>{field.label}</span>
          <input value={value || ''} onChange={(e) => onChange(e.target.value)} className={inputClass} />
          {field.hint && <span className="mt-1 block text-[11px] text-[#8A7972]">{field.hint}</span>}
        </label>
      );
  }
}

// Remounted per section (see default export) so drafts never leak between sections.
function Editor({ page, section }) {
  const [saved, setSaved] = useState(null);
  const [draft, setDraft] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let active = true;
    getPageContent(page.key)
      .then((res) => {
        if (!active) return;
        const data = mergeContent(PAGE_DEFAULTS[page.key][section.key], res.sections?.[section.key]);
        setSaved(data);
        setDraft(data);
      })
      .catch((err) => active && setError(err.message));
    return () => {
      active = false;
    };
  }, [page.key, section.key]);

  const dirty = Boolean(saved) && JSON.stringify(saved) !== JSON.stringify(draft);
  // Other pages that show this section too (e.g. the About page reuses Home's "First Edition"), so edits change them as well.
  const sharedOn = CONTENT_PAGES.filter((p) => p.shared?.some((s) => s.page === page.key && s.section === section.key)).map((p) => p.title);

  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (e) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const save = async () => {
    setSaving(true);
    setError('');
    setNotice('');
    try {
      const { data } = await adminRequest(`/content/${page.key}/${section.key}`, { method: 'PUT', body: { data: draft } });
      const merged = mergeContent(PAGE_DEFAULTS[page.key][section.key], data);
      setSaved(merged);
      setDraft(merged);
      setNotice('Saved. The website is updated.');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl pb-24">
      <PageHeader
        title={section.title}
        subtitle={sharedOn.length ? `${page.title} · also shown on the ${sharedOn.join(' and ')}` : page.title}
        actions={
          <a href={page.path} target="_blank" rel="noreferrer" className={secondaryButton}>
            <ExternalLink size={15} />
            View website
          </a>
        }
      />

      {error && <p className="mb-4 rounded-lg border border-[#F3C9C4] bg-[#FDF1EF] px-4 py-3 text-sm text-[#B42318]">{error}</p>}
      {notice && <p className="mb-4 rounded-lg border border-[#BFE3CA] bg-[#EEF8F1] px-4 py-3 text-sm text-[#1B6E32]">{notice}</p>}

      {!draft ? (
        !error && (
          <div className="flex justify-center py-20 text-[#8A7972]">
            <Loader2 size={20} className="animate-spin" />
          </div>
        )
      ) : (
        <div className="space-y-6 rounded-xl border border-[#EFE5D7] bg-white p-5 sm:p-6">
          {section.fields.map((field) => (
            <Field
              key={field.key}
              field={field}
              value={draft[field.key]}
              onChange={(v) => {
                setDraft((d) => ({ ...d, [field.key]: v }));
                setNotice('');
              }}
            />
          ))}
        </div>
      )}

      {draft && (
        <div className="fixed inset-x-0 bottom-0 z-30 lg:left-64">
          <div className="mx-4 mb-4 flex max-w-3xl items-center justify-end gap-3 rounded-xl border border-[#EFE5D7] bg-white px-4 py-3 shadow-lg sm:mx-6 lg:mx-10">
            {dirty && <span className="mr-auto text-sm text-[#6B5A52]">You have unsaved changes</span>}
            <button type="button" onClick={save} disabled={!dirty || saving} className={primaryButton}>
              {saving && <Loader2 size={15} className="animate-spin" />}
              Save changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Editor for one section of a website page; `pageKey` is a CONTENT_PAGES key.
export default function PageSectionEditor({ pageKey }) {
  const { section: key } = useParams();
  const page = CONTENT_PAGES.find((p) => p.key === pageKey);
  const section = page.sections.find((s) => s.key === key);
  if (!section) return <Navigate to={`/admin/${page.key}/${page.sections[0].key}`} replace />;
  return <Editor key={`${page.key}/${section.key}`} page={page} section={section} />;
}

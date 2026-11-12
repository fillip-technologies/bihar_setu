import React, { useMemo, useState } from 'react';
import { FIELD_TYPES, HALF_WIDTH_TYPES, OPTION_TYPES, PLACEHOLDER_TYPES, keyFromLabel, normalizeField } from './constants';
import { Modal, inputClass, labelClass, primaryButton, secondaryButton } from './ui';

const KEY_RE = /^[a-zA-Z][a-zA-Z0-9_]{0,39}$/;

// One option per line: "English label | Hindi label" (Hindi is optional).
const optionsToText = (options) => options.map((o) => (o.label.hi ? `${o.label.en || o.value} | ${o.label.hi}` : o.label.en || o.value)).join('\n');

function textToOptions(text, previous) {
  const seen = new Set();
  const options = [];
  for (const line of text.split('\n')) {
    const [en = '', ...rest] = line.split('|');
    const label = { en: en.trim(), hi: rest.join('|').trim() };
    if (!label.en || seen.has(label.en)) continue;
    seen.add(label.en);
    // Keep the stored value of an existing option so old submissions and defaults still match it.
    const existing = previous.find((o) => (o.label.en || o.value) === label.en);
    options.push({ value: existing?.value ?? label.en, label });
  }
  return options;
}

const EMPTY_FIELD = normalizeField({ key: '', type: 'text', label: {}, placeholder: {}, options: [] });

/**
 * Add / edit dialog for one field. `field` is null when adding.
 * `takenKeys` holds the keys of the form's other fields.
 */
export default function FieldEditor({ field, takenKeys, onSave, onClose }) {
  const isNew = !field;
  const [draft, setDraft] = useState(() => (field ? normalizeField(field) : EMPTY_FIELD));
  const [optionsText, setOptionsText] = useState(() => optionsToText(field?.options ?? []));
  const [keyEdited, setKeyEdited] = useState(false);
  const [error, setError] = useState('');

  const options = useMemo(() => textToOptions(optionsText, field?.options ?? []), [optionsText, field]);
  const hasOptions = OPTION_TYPES.includes(draft.type);
  const hasPlaceholder = PLACEHOLDER_TYPES.includes(draft.type);
  const canBeHalf = HALF_WIDTH_TYPES.includes(draft.type);
  const hasDefault = draft.type === 'select' || draft.type === 'radio';

  const set = (patch) => setDraft((d) => ({ ...d, ...patch }));
  const setLabel = (lang, value) =>
    setDraft((d) => ({
      ...d,
      label: { ...d.label, [lang]: value },
      // New fields get a key generated from the English label until the admin types one.
      ...(isNew && lang === 'en' && !keyEdited ? { key: value.trim() ? keyFromLabel(value, takenKeys) : '' } : {}),
    }));
  const setPlaceholder = (lang, value) => setDraft((d) => ({ ...d, placeholder: { ...d.placeholder, [lang]: value } }));

  const handleSave = (e) => {
    e.preventDefault();
    const label = { en: draft.label.en.trim(), hi: draft.label.hi.trim() };
    if (!label.en) return setError('English label is required.');
    if (!KEY_RE.test(draft.key)) return setError('Field key must start with a letter and use only letters, numbers or _.');
    if (isNew && takenKeys.has(draft.key)) return setError(`Another field already uses the key "${draft.key}".`);
    if (hasOptions && !options.length) return setError('Add at least one option (one per line).');

    onSave(
      normalizeField({
        ...draft,
        label,
        placeholder: hasPlaceholder ? draft.placeholder : {},
        options: hasOptions ? options : [],
        width: canBeHalf ? draft.width : 'full',
        defaultValue: hasDefault && options.some((o) => o.value === draft.defaultValue) ? draft.defaultValue : '',
      }),
    );
  };

  return (
    <Modal
      title={isNew ? 'Add field' : `Edit field: ${field.label.en}`}
      onClose={onClose}
      wide
      footer={
        <>
          <button type="button" onClick={onClose} className={secondaryButton}>
            Cancel
          </button>
          <button type="submit" form="field-editor" className={primaryButton}>
            {isNew ? 'Add field' : 'Apply changes'}
          </button>
        </>
      }
    >
      <form id="field-editor" onSubmit={handleSave} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="fe-type" className={labelClass}>Field type</label>
            <select id="fe-type" value={draft.type} onChange={(e) => set({ type: e.target.value })} className={inputClass}>
              {FIELD_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="fe-key" className={labelClass}>Field key</label>
            <input
              id="fe-key"
              value={draft.key}
              disabled={!isNew}
              onChange={(e) => {
                setKeyEdited(true);
                set({ key: e.target.value.replace(/[^a-zA-Z0-9_]/g, '') });
              }}
              placeholder="e.g. companyWebsite"
              className={`${inputClass} font-mono`}
            />
            <p className="mt-1 text-[11px] text-[#8A7972]">
              {isNew ? 'Used to store answers. It cannot be changed later.' : 'Keys are fixed so older submissions stay linked.'}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="fe-label-en" className={labelClass}>
              {draft.type === 'checkbox' ? 'Checkbox text (English)' : 'Label (English)'} <span className="text-[#B42318]">*</span>
            </label>
            <input id="fe-label-en" value={draft.label.en} onChange={(e) => setLabel('en', e.target.value)} className={inputClass} autoFocus />
          </div>
          <div>
            <label htmlFor="fe-label-hi" className={labelClass}>
              {draft.type === 'checkbox' ? 'Checkbox text (Hindi)' : 'Label (Hindi)'}
            </label>
            <input id="fe-label-hi" lang="hi" value={draft.label.hi} onChange={(e) => setLabel('hi', e.target.value)} className={inputClass} />
          </div>
        </div>

        {hasPlaceholder && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="fe-ph-en" className={labelClass}>
                {draft.type === 'select' ? 'Empty option text (English)' : 'Placeholder (English)'}
              </label>
              <input
                id="fe-ph-en"
                value={draft.placeholder.en}
                onChange={(e) => setPlaceholder('en', e.target.value)}
                placeholder={draft.type === 'select' ? 'e.g. Select district' : ''}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="fe-ph-hi" className={labelClass}>
                {draft.type === 'select' ? 'Empty option text (Hindi)' : 'Placeholder (Hindi)'}
              </label>
              <input id="fe-ph-hi" lang="hi" value={draft.placeholder.hi} onChange={(e) => setPlaceholder('hi', e.target.value)} className={inputClass} />
            </div>
          </div>
        )}

        {hasOptions && (
          <div>
            <label htmlFor="fe-options" className={labelClass}>
              Options <span className="font-normal text-[#8A7972]">({options.length})</span>
            </label>
            <textarea
              id="fe-options"
              rows={7}
              value={optionsText}
              onChange={(e) => setOptionsText(e.target.value)}
              placeholder={'One option per line, optionally with Hindi after a |\nBoth Days | दोनों दिन\nDay 1 only | केवल दिन 1'}
              className={`${inputClass} font-mono text-[13px] leading-relaxed`}
            />
            <p className="mt-1 text-[11px] text-[#8A7972]">
              One option per line. Add a Hindi label after a <code>|</code>, e.g. <code>Patna | पटना</code>.
            </p>
          </div>
        )}

        {hasDefault && options.length > 0 && (
          <div className="sm:w-1/2 sm:pr-2">
            <label htmlFor="fe-default" className={labelClass}>Pre-selected option</label>
            <select id="fe-default" value={draft.defaultValue} onChange={(e) => set({ defaultValue: e.target.value })} className={inputClass}>
              <option value="">None</option>
              {options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label.en}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex flex-wrap gap-x-6 gap-y-3 rounded-xl bg-[#FDFBF7] border border-[#EFE5D7] px-4 py-3">
          <label className="inline-flex items-center gap-2 text-sm text-[#4A3831] cursor-pointer">
            <input type="checkbox" checked={draft.required} onChange={(e) => set({ required: e.target.checked })} className="w-4 h-4 accent-[#651B12]" />
            Required
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-[#4A3831] cursor-pointer">
            <input type="checkbox" checked={draft.hidden} onChange={(e) => set({ hidden: e.target.checked })} className="w-4 h-4 accent-[#651B12]" />
            Hidden on website
          </label>
          {canBeHalf && (
            <label className="inline-flex items-center gap-2 text-sm text-[#4A3831] cursor-pointer">
              <input
                type="checkbox"
                checked={draft.width === 'full'}
                onChange={(e) => set({ width: e.target.checked ? 'full' : 'half' })}
                className="w-4 h-4 accent-[#651B12]"
              />
              Full width
            </label>
          )}
        </div>

        {error && (
          <p role="alert" className="rounded-lg bg-[#FDF1EF] border border-[#F3C9C4] px-3 py-2 text-sm text-[#B42318]">
            {error}
          </p>
        )}
      </form>
    </Modal>
  );
}

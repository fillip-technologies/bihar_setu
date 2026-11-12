import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { ExternalLink, Eye, EyeOff, Loader2, Pencil, Plus, RotateCcw, Trash2 } from 'lucide-react';
import DynamicFormFields from '../../shared/DynamicFormFields';
import { adminRequest } from '../../utils/api';
import { initialValues } from '../../utils/formSchema';
import FieldEditor from './FieldEditor';
import { PUBLIC_PATHS, normalizeField, typeLabel } from './constants';
import { Modal, PageHeader, dangerButton, iconButton, primaryButton, secondaryButton } from './ui';

function Badge({ children, tone = 'neutral' }) {
  const tones = {
    neutral: 'bg-[#F5EEE3] text-[#6B5A52]',
    required: 'bg-[#FDF1EF] text-[#9B2C1F]',
    hidden: 'bg-[#EEF0F3] text-[#5B6472]',
  };
  return <span className={`rounded-md px-1.5 py-0.5 text-[11px] font-semibold ${tones[tone]}`}>{children}</span>;
}

function Preview({ formKey, fields }) {
  const [lang, setLang] = useState('en');
  const [edits, setEdits] = useState({});
  const visible = fields.filter((f) => !f.hidden);
  const values = { ...initialValues(visible), ...edits };

  return (
    <div className="rounded-xl border border-[#EFE5D7] bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-[#EFE5D7] px-5 py-3">
        <p className="text-xs text-[#8A7972]">Preview of the website form, including unsaved changes</p>
        <div className="flex rounded-lg border border-[#E0D5C3] p-0.5 text-xs font-semibold">
          {['en', 'hi'].map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={`px-2.5 py-1 rounded-md cursor-pointer ${lang === l ? 'bg-[#D6A33A] text-[#1E0904]' : 'text-[#6B5A52]'}`}
            >
              {l === 'en' ? 'English' : 'हिन्दी'}
            </button>
          ))}
        </div>
      </div>
      <form className="p-5 sm:p-8" onSubmit={(e) => e.preventDefault()}>
        {visible.length ? (
          <DynamicFormFields
            formKey={`preview-${formKey}`}
            fields={visible}
            values={values}
            onChange={(key, value) => setEdits((prev) => ({ ...prev, [key]: value }))}
            lang={lang}
            variant={formKey === 'enquire' ? 'enquire' : 'agenda'}
          />
        ) : (
          <p className="text-sm text-[#8A7972]">All fields are hidden.</p>
        )}
      </form>
    </div>
  );
}

// Remounted per form (see default export) so drafts never leak between forms.
function Builder({ formKey }) {
  const { refreshForms } = useOutletContext();
  const [saved, setSaved] = useState(null);
  const [fields, setFields] = useState([]);
  const [loadError, setLoadError] = useState('');
  const [tab, setTab] = useState('fields');
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);
  const [editing, setEditing] = useState(null); // { index } - index is null when adding
  const [confirm, setConfirm] = useState(null); // { type: 'delete', index } | { type: 'reset' }

  const applyDefinition = (def) => {
    const normalized = def.fields.map(normalizeField);
    setSaved({ ...def, fields: normalized });
    setFields(normalized);
  };

  useEffect(() => {
    let active = true;
    adminRequest(`/forms/${formKey}`)
      .then((def) => active && applyDefinition(def))
      .catch((err) => active && setLoadError(err.message));
    return () => {
      active = false;
    };
  }, [formKey]);

  const dirty = Boolean(saved) && JSON.stringify(fields) !== JSON.stringify(saved.fields);

  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (e) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const persist = async (request, successText) => {
    setSaving(true);
    setNotice(null);
    try {
      applyDefinition(await request());
      refreshForms();
      setNotice({ tone: 'success', text: successText });
    } catch (err) {
      setNotice({ tone: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const save = () =>
    persist(
      () => adminRequest(`/forms/${formKey}`, { method: 'PUT', body: { fields } }),
      'Saved. The website form now shows these fields.',
    );

  const resetToDefaults = () => {
    setConfirm(null);
    persist(() => adminRequest(`/forms/${formKey}/reset`, { method: 'POST' }), 'Default fields restored.');
  };

  const update = (index, patch) => setFields((list) => list.map((f, i) => (i === index ? { ...f, ...patch } : f)));

  const handleEditorSave = (field) => {
    setFields((list) => (editing.index === null ? [...list, field] : list.map((f, i) => (i === editing.index ? field : f))));
    setEditing(null);
    setNotice(null);
  };

  if (loadError) {
    return <p className="rounded-lg border border-[#F3C9C4] bg-[#FDF1EF] px-4 py-3 text-sm text-[#B42318]">{loadError}</p>;
  }
  if (!saved) {
    return (
      <div className="flex items-center justify-center py-24 text-[#8A7972]">
        <Loader2 size={20} className="animate-spin" />
      </div>
    );
  }

  const otherKeys = (exceptIndex) => new Set(fields.filter((_, i) => i !== exceptIndex).map((f) => f.key));

  return (
    <div className="max-w-5xl pb-24">
      <PageHeader
        title={`${saved.title}: form fields`}
        subtitle="Add, remove and edit the fields shown on the website. Changes go live when you save."
        actions={
          <>
            {PUBLIC_PATHS[formKey] && (
              <a href={PUBLIC_PATHS[formKey]} target="_blank" rel="noreferrer" className={secondaryButton}>
                <ExternalLink size={15} />
                View on website
              </a>
            )}
            <button type="button" onClick={() => setConfirm({ type: 'reset' })} disabled={saving} className={secondaryButton}>
              <RotateCcw size={15} />
              Restore defaults
            </button>
          </>
        }
      />

      {notice && (
        <p
          role="status"
          className={`mb-4 rounded-lg border px-4 py-3 text-sm ${
            notice.tone === 'success' ? 'border-[#BFE3CA] bg-[#EEF8F1] text-[#1B6E32]' : 'border-[#F3C9C4] bg-[#FDF1EF] text-[#B42318]'
          }`}
        >
          {notice.text}
        </p>
      )}

      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex rounded-lg border border-[#E0D5C3] bg-white p-0.5 text-sm font-semibold" role="tablist">
          {[
            ['fields', `Fields (${fields.length})`],
            ['preview', 'Preview'],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={tab === value}
              onClick={() => setTab(value)}
              className={`px-3.5 py-1.5 rounded-md cursor-pointer ${tab === value ? 'bg-[#240700] text-white' : 'text-[#6B5A52] hover:text-[#1F0E0A]'}`}
            >
              {label}
            </button>
          ))}
        </div>
        {tab === 'fields' && (
          <button type="button" onClick={() => setEditing({ index: null })} className={primaryButton}>
            <Plus size={16} />
            Add field
          </button>
        )}
      </div>

      {tab === 'preview' ? (
        <Preview formKey={formKey} fields={fields} />
      ) : (
        <ol className="space-y-2">
          {fields.map((field, index) => (
            <li
              key={field.key}
              className={`flex items-center gap-2 sm:gap-3 rounded-xl border bg-white px-2 sm:px-3 py-2.5 ${
                field.hidden ? 'border-dashed border-[#D8CBB6] opacity-70' : 'border-[#EFE5D7]'
              }`}
            >
              <button type="button" onClick={() => setEditing({ index })} className="min-w-0 flex-1 pl-1 text-left cursor-pointer">
                <span className="block truncate text-sm font-semibold text-[#1F0E0A]">{field.label.en}</span>
                <span className="mt-1 flex flex-wrap items-center gap-1.5">
                  <Badge>{typeLabel(field.type)}</Badge>
                  {field.required && <Badge tone="required">Required</Badge>}
                  {field.hidden && <Badge tone="hidden">Hidden</Badge>}
                  {field.options.length > 0 && <Badge>{field.options.length} options</Badge>}
                  <span className="font-mono text-[11px] text-[#A8988F]">{field.key}</span>
                </span>
              </button>

              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => update(index, { hidden: !field.hidden })}
                  aria-label={field.hidden ? `Show ${field.label.en}` : `Hide ${field.label.en}`}
                  title={field.hidden ? 'Show on website' : 'Hide from website'}
                  className={iconButton}
                >
                  {field.hidden ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button type="button" onClick={() => setEditing({ index })} aria-label={`Edit ${field.label.en}`} title="Edit" className={iconButton}>
                  <Pencil size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setConfirm({ type: 'delete', index })}
                  disabled={fields.length === 1}
                  aria-label={`Remove ${field.label.en}`}
                  title="Remove field"
                  className={`${iconButton} hover:text-[#B42318]`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}

      {/* Save bar */}
      {dirty && (
        <div className="fixed inset-x-0 bottom-0 z-30 lg:left-64">
          <div className="mx-4 mb-4 sm:mx-6 lg:mx-10 max-w-5xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-[#240700] px-4 py-3 text-white shadow-2xl">
            <p className="text-sm">You have unsaved changes. The website keeps the old fields until you save.</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setFields(saved.fields);
                  setNotice(null);
                }}
                disabled={saving}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white/80 hover:bg-white/10 cursor-pointer"
              >
                Discard
              </button>
              <button type="button" onClick={save} disabled={saving} className={primaryButton}>
                {saving && <Loader2 size={15} className="animate-spin" />}
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}

      {editing && (
        <FieldEditor
          field={editing.index === null ? null : fields[editing.index]}
          takenKeys={otherKeys(editing.index)}
          onSave={handleEditorSave}
          onClose={() => setEditing(null)}
        />
      )}

      {confirm?.type === 'delete' && (
        <Modal
          title="Remove field?"
          onClose={() => setConfirm(null)}
          footer={
            <>
              <button type="button" onClick={() => setConfirm(null)} className={secondaryButton}>
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setFields((list) => list.filter((_, i) => i !== confirm.index));
                  setConfirm(null);
                  setNotice(null);
                }}
                className={dangerButton}
              >
                Remove
              </button>
            </>
          }
        >
          <p className="text-sm text-[#4A3831]">
            <strong>{fields[confirm.index]?.label.en}</strong> will be removed from the form when you save. Answers already
            submitted are kept and still appear in submissions and CSV exports.
          </p>
          <p className="mt-3 text-sm text-[#6B5A52]">To take it off the website temporarily, hide it instead.</p>
        </Modal>
      )}

      {confirm?.type === 'reset' && (
        <Modal
          title="Restore default fields?"
          onClose={() => setConfirm(null)}
          footer={
            <>
              <button type="button" onClick={() => setConfirm(null)} className={secondaryButton}>
                Cancel
              </button>
              <button type="button" onClick={resetToDefaults} className={dangerButton}>
                Restore defaults
              </button>
            </>
          }
        >
          <p className="text-sm text-[#4A3831]">
            This replaces all fields of this form with the original set and publishes it immediately. Submissions are not affected.
          </p>
        </Modal>
      )}
    </div>
  );
}

export default function FormBuilder() {
  const { formKey } = useParams();
  return <Builder key={formKey} formKey={formKey} />;
}

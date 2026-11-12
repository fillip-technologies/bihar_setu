import { useCallback, useEffect, useState } from 'react';
import { getFormDefinition } from './api';

// Field labels are stored as { en, hi }; fall back to English when a translation is missing.
export const localize = (text, lang) => text?.[lang] || text?.en || '';

// A select without a placeholder has no empty option, so it starts on its default (or first) option.
function initialValue(field) {
  if (field.type === 'checkbox') return false;
  if (field.type === 'checkboxes') return [];
  if (field.type === 'select' && !localize(field.placeholder, 'en')) return field.defaultValue || field.options[0]?.value || '';
  return field.defaultValue || '';
}

export const initialValues = (fields) => Object.fromEntries(fields.map((f) => [f.key, initialValue(f)]));

// Human-readable answer for a submitted value: option values are shown with their (translated) labels.
export function formatAnswer(field, value, lang) {
  const optionLabel = (v) => localize(field.options?.find((o) => o.value === v)?.label, lang) || v;
  if (Array.isArray(value)) return value.map(optionLabel).join(', ');
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return field.options?.length ? optionLabel(value) : String(value ?? '');
}

// Loads a form's field definition from the API. `reload` retries after an error.
export function useFormDefinition(key) {
  const [state, setState] = useState({ status: 'loading', fields: [], error: '' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    getFormDefinition(key)
      .then((def) => active && setState({ status: 'ready', fields: def.fields, error: '' }))
      .catch((err) => active && setState({ status: 'error', fields: [], error: err.message }));
    return () => {
      active = false;
    };
  }, [key, attempt]);

  const reload = useCallback(() => {
    setState((s) => ({ ...s, status: 'loading' }));
    setAttempt((a) => a + 1);
  }, []);

  return { ...state, reload };
}

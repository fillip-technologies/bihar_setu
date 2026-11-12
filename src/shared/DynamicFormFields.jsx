import React from 'react';
import { localize } from '../utils/formSchema';

// Per-form styling so each website form keeps its original look while rendering fields from the database.
const VARIANTS = {
  agenda: {
    grid: 'grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8',
    label: 'block text-xs sm:text-[13px] font-medium text-[#1F0E0A] mb-1.5',
    input:
      'w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#E8DEC8] rounded-md bg-white text-[#1F0E0A] placeholder-[#9E8E87] focus:outline-hidden focus:border-[#D6A33A] focus:ring-1 focus:ring-[#D6A33A]',
    checkbox: 'mt-0.5 w-4 h-4 shrink-0 border-[#E8DEC8] rounded-sm accent-[#651B12] cursor-pointer',
    checkboxLabel: 'text-xs text-[#5C443C] leading-snug cursor-pointer select-none',
  },
  enquire: {
    grid: 'grid grid-cols-1 md:grid-cols-2 gap-6',
    label: 'block text-xs sm:text-sm text-[#4A3831] font-medium mb-1.5',
    input:
      'w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#E5DCCD] rounded-md bg-white text-[#1F0E0A] placeholder-[#9E8E87] focus:border-[#D6A33A] focus:outline-hidden transition-colors',
    checkbox: 'mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-[#CB9010] cursor-pointer',
    checkboxLabel: 'text-xs sm:text-sm text-[#6B5A52] cursor-pointer select-none',
  },
};

const FULL_WIDTH_TYPES = ['textarea', 'radio', 'checkboxes', 'checkbox'];

function RequiredMark() {
  return <span className="text-[#651B12]"> *</span>;
}

function FieldError({ message }) {
  if (!message) return null;
  return <p className="mt-1.5 text-[11px] sm:text-xs text-[#B42318]">{message}</p>;
}

function ChoiceCards({ field, value, onChange, lang, multiple }) {
  const selected = multiple ? value || [] : [value];
  const toggle = (optionValue) => {
    if (!multiple) return onChange(optionValue);
    onChange(selected.includes(optionValue) ? selected.filter((v) => v !== optionValue) : [...selected, optionValue]);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role={multiple ? 'group' : 'radiogroup'}>
      {field.options.map((option) => {
        const isSelected = selected.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            role={multiple ? 'checkbox' : 'radio'}
            aria-checked={isSelected}
            onClick={() => toggle(option.value)}
            className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
              isSelected ? 'border-[#D6A33A] bg-[#FFF9EE] ring-1 ring-[#D6A33A]' : 'border-[#E8DEC8] hover:bg-[#FAF7F2]'
            }`}
          >
            <span className="text-xs sm:text-sm font-medium text-[#1F0E0A]">{localize(option.label, lang) || option.value}</span>
            <span
              className={`w-4 h-4 border flex items-center justify-center shrink-0 ${multiple ? 'rounded-sm' : 'rounded-full'} ${
                isSelected ? 'border-[#D6A33A] bg-[#D6A33A]' : 'border-[#C8BBAF]'
              }`}
            >
              {isSelected && <span className={`w-1.5 h-1.5 bg-white ${multiple ? 'rounded-[1px]' : 'rounded-full'}`} />}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function FieldControl({ field, id, value, onChange, lang, styles }) {
  const placeholder = localize(field.placeholder, lang);
  const common = {
    id,
    name: field.key,
    required: field.required,
    className: styles.input,
  };

  switch (field.type) {
    case 'textarea':
      return (
        <textarea
          {...common}
          rows={4}
          maxLength={5000}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${styles.input} resize-y`}
        />
      );
    case 'select':
      return (
        <select {...common} value={value} onChange={(e) => onChange(e.target.value)}>
          {placeholder && (
            <option value="" disabled={field.required}>
              {placeholder}
            </option>
          )}
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {localize(option.label, lang) || option.value}
            </option>
          ))}
        </select>
      );
    case 'tel':
      return (
        <input
          {...common}
          type="tel"
          inputMode="numeric"
          pattern="[0-9]{10}"
          maxLength={10}
          title="10-digit mobile number"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    default:
      return (
        <input
          {...common}
          type={['email', 'number', 'date'].includes(field.type) ? field.type : 'text'}
          maxLength={300}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
}

/**
 * Renders a form's fields from its database definition.
 * `values` is keyed by field key; `onChange(key, value)` updates a single field.
 */
export default function DynamicFormFields({ formKey, fields, values, errors = {}, onChange, lang = 'en', variant = 'agenda' }) {
  const styles = VARIANTS[variant] || VARIANTS.agenda;

  return (
    <div className={styles.grid}>
      {fields.map((field) => {
        const id = `${formKey}-${field.key}`;
        const value = values[field.key];
        const set = (v) => onChange(field.key, v);
        const fullWidth = field.width === 'full' || FULL_WIDTH_TYPES.includes(field.type);
        const label = localize(field.label, lang);

        if (field.type === 'checkbox') {
          return (
            <div key={field.key} className="md:col-span-2">
              <div className="flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id={id}
                  name={field.key}
                  required={field.required}
                  checked={Boolean(value)}
                  onChange={(e) => set(e.target.checked)}
                  className={styles.checkbox}
                />
                <label htmlFor={id} className={styles.checkboxLabel}>
                  {label}
                </label>
              </div>
              <FieldError message={errors[field.key]} />
            </div>
          );
        }

        const isChoice = field.type === 'radio' || field.type === 'checkboxes';
        return (
          <div key={field.key} className={fullWidth ? 'md:col-span-2' : undefined}>
            {isChoice ? (
              <p id={`${id}-label`} className={`${styles.label} mb-3`}>
                {label}
                {field.required && <RequiredMark />}
              </p>
            ) : (
              <label htmlFor={id} className={styles.label}>
                {label}
                {field.required && <RequiredMark />}
              </label>
            )}
            {isChoice ? (
              <ChoiceCards field={field} value={value} onChange={set} lang={lang} multiple={field.type === 'checkboxes'} />
            ) : (
              <FieldControl field={field} id={id} value={value ?? ''} onChange={set} lang={lang} styles={styles} />
            )}
            <FieldError message={errors[field.key]} />
          </div>
        );
      })}
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse" aria-busy="true" aria-label="Loading form">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i}>
          <div className="h-3 w-28 rounded bg-[#EFE5D7] mb-2" />
          <div className="h-10 rounded-md bg-[#F5EEE3]" />
        </div>
      ))}
      <div className="md:col-span-2 h-24 rounded-md bg-[#F5EEE3]" />
    </div>
  );
}

export function FormLoadError({ message, onRetry }) {
  return (
    <div className="rounded-xl border border-[#E8DEC8] bg-[#FAF5EB] p-8 text-center">
      <p className="text-sm text-[#5C443C]">{message || 'This form could not be loaded.'}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 px-6 py-2 bg-[#D6A33A] hover:bg-[#C28F27] text-[#1E0904] font-bold text-xs uppercase tracking-wider rounded-full cursor-pointer"
      >
        Try again
      </button>
    </div>
  );
}

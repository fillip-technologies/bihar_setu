import React, { useEffect } from 'react';
import { X } from 'lucide-react';

// Shared class names and small building blocks for the admin panel.
export const inputClass =
  'w-full px-3 py-2 text-sm border border-[#E0D5C3] rounded-lg bg-white text-[#1F0E0A] placeholder-[#A8988F] focus:outline-hidden focus:border-[#D6A33A] focus:ring-2 focus:ring-[#D6A33A]/25 disabled:bg-[#F5F0E8] disabled:text-[#8A7972]';
export const labelClass = 'block text-xs font-semibold text-[#4A3831] mb-1.5';
export const primaryButton =
  'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#D6A33A] hover:bg-[#C28F27] text-[#1E0904] text-sm font-bold transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed';
export const secondaryButton =
  'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-[#E0D5C3] bg-white hover:bg-[#FAF5EB] text-[#4A3831] text-sm font-semibold transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed';
export const dangerButton =
  'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#B42318] hover:bg-[#912018] text-white text-sm font-bold transition-colors cursor-pointer disabled:opacity-60';
export const iconButton =
  'inline-flex items-center justify-center w-8 h-8 rounded-lg text-[#6B5A52] hover:bg-[#F5EEE3] hover:text-[#1F0E0A] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent';

export function Modal({ title, onClose, children, footer, wide = false }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-[#1F0E0A]/50 cursor-default" />
      <div
        className={`relative w-full ${wide ? 'sm:max-w-2xl' : 'sm:max-w-md'} max-h-[92vh] flex flex-col bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl`}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-[#EFE5D7]">
          <h2 className="font-serif text-lg text-[#1F0E0A]">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className={iconButton}>
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
        {footer && <div className="flex justify-end gap-2 px-5 py-4 border-t border-[#EFE5D7] bg-[#FDFBF7] rounded-b-2xl">{footer}</div>}
      </div>
    </div>
  );
}

export function StatusBadge({ status }) {
  const isNew = status === 'new';
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
        isNew ? 'bg-[#FFF1D6] text-[#8A5A00]' : 'bg-[#E8F3EC] text-[#1B6E32]'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isNew ? 'bg-[#D6A33A]' : 'bg-[#2E9150]'}`} />
      {isNew ? 'New' : 'Reviewed'}
    </span>
  );
}

export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
      <div className="min-w-0">
        <h1 className="font-serif text-2xl sm:text-[28px] leading-tight text-[#1F0E0A]">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-[#6B5A52]">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

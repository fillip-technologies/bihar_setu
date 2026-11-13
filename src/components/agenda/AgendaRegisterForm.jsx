import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, MapPin, Ticket, UserCheck, Sparkles, Loader2 } from 'lucide-react';
import { useLocalized, usePageSection } from '../../content/siteContent';
import DynamicFormFields, { FormLoadError, FormSkeleton } from '../../shared/DynamicFormFields';
import { submitForm } from '../../utils/api';
import { formatAnswer, initialValues, localize, useFormDefinition } from '../../utils/formSchema';

const FORM_KEY = 'agenda';

export default function AgendaRegisterForm() {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'en';
  const c = usePageSection('agenda', 'register');
  const tx = useLocalized();
  const { fields, status, error: loadError, reload } = useFormDefinition(FORM_KEY);

  // Only the fields the visitor changed; everything else comes from the field defaults.
  const [edits, setEdits] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const values = { ...initialValues(fields), ...edits };

  const handleChange = (key, value) => {
    setEdits((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');
    try {
      setResult(await submitForm(FORM_KEY, values));
      setFieldErrors({});
    } catch (err) {
      setFieldErrors(err.fieldErrors || {});
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setEdits({});
    setFieldErrors({});
    setFormError('');
    setResult(null);
  };

  // Summary on the confirmation card: every short answer the delegate gave.
  const summary = result
    ? fields.filter(
        (f) => !['checkbox', 'textarea'].includes(f.type) && result.data[f.key] !== '' && result.data[f.key]?.length !== 0,
      )
    : [];

  return (
    <section id="register-form" className="bg-[#FAF7F2] py-14 sm:py-18 lg:py-20 px-4 sm:px-6 lg:px-8 w-full border-t border-[#EFE5D7]">
      <div className="max-w-4xl mx-auto">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EFE5D7] text-[#651B12] text-xs font-semibold uppercase tracking-wider mb-3">
            <Ticket size={13} className="text-[#D6A33A]" />
            <span>{tx(c.badge)}</span>
          </div>
          <h2 className="font-serif text-[#1F0E0A] text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight">
            {tx(c.heading)}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#5C443C] font-normal leading-relaxed">
            {tx(c.subtitle)}
          </p>
        </div>

        {result ? (
          /* Confirmation Success Card */
          <div className="bg-white rounded-2xl border border-[#E8DEC8] p-6 sm:p-10 shadow-sm transition-all duration-300">
            <div className="flex flex-col items-center text-center pb-8 border-b border-[#E8DEC8]">
              <div className="w-16 h-16 rounded-full bg-[#EBF7EE] text-[#1B6E32] flex items-center justify-center mb-4 ring-8 ring-[#EBF7EE]/60">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1F0E0A]">
                {tx(c.successTitle)}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#5C443C] max-w-lg leading-relaxed">
                {tx(c.successMessage)}
              </p>

              {/* Reference ID Badge */}
              <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]">
                <span className="text-xs text-[#8A7972] uppercase tracking-wider font-semibold">
                  {tx(c.refLabel)}:
                </span>
                <span className="font-mono text-sm sm:text-base font-bold text-[#651B12]">
                  {result.referenceId}
                </span>
              </div>
            </div>

            {/* Registration Summary Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6 border-b border-[#E8DEC8] text-xs sm:text-sm">
              {summary.map((field) => (
                <div key={field.key} className="space-y-2 min-w-0">
                  <div className="text-[#8A7972]">{localize(field.label, lang)}</div>
                  <div className="font-medium text-[#1F0E0A] break-words">{formatAnswer(field, result.data[field.key], lang)}</div>
                </div>
              ))}
              <div className="space-y-2">
                <div className="text-[#8A7972]">{tx(c.venueLabel)}</div>
                <div className="font-medium text-[#1F0E0A] flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#D6A33A]" />
                  <span>{tx(c.venueValue)}</span>
                </div>
              </div>
            </div>

            {/* Guidance Note */}
            <div className="mt-6 p-4 rounded-xl bg-[#FAF5EB] border border-[#EFE5D7] flex items-start gap-3">
              <Sparkles size={18} className="text-[#D6A33A] shrink-0 mt-0.5" />
              <p className="text-xs text-[#5C443C] leading-relaxed">
                {tx(c.nextStepNote)}
              </p>
            </div>

            {/* Reset / Register Another Button */}
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={resetForm}
                className="px-8 py-3 bg-[#D6A33A] hover:bg-[#C28F27] text-[#1E0904] font-bold text-xs uppercase tracking-wider rounded-full shadow-xs transition-all duration-200 cursor-pointer active:scale-95"
              >
                {tx(c.registerAnotherLabel)}
              </button>
            </div>
          </div>
        ) : (
          /* Registration Form - fields are managed from the admin panel */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-[#E8DEC8] p-6 sm:p-10 shadow-sm"
          >
            {status === 'loading' && <FormSkeleton />}
            {status === 'error' && <FormLoadError message={loadError} onRetry={reload} />}
            {status === 'ready' && (
              <>
                <DynamicFormFields
                  formKey={FORM_KEY}
                  fields={fields}
                  values={values}
                  errors={fieldErrors}
                  onChange={handleChange}
                  lang={lang}
                  variant="agenda"
                />

                {formError && (
                  <p role="alert" className="mt-6 rounded-lg border border-[#F3C9C4] bg-[#FDF1EF] px-4 py-3 text-xs sm:text-sm text-[#B42318]">
                    {formError}
                  </p>
                )}

                {/* Submit Button */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#D6A33A] hover:bg-[#C28F27] text-[#1E0904] font-bold text-xs uppercase tracking-wider rounded-full shadow-xs transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-60 disabled:cursor-wait"
                  >
                    {submitting ? <Loader2 size={16} className="animate-spin" /> : <UserCheck size={16} />}
                    <span>{tx(c.submitLabel)}</span>
                  </button>
                  <span className="text-[11px] text-[#8A7972]">
                    {tx(c.submitNote)}
                  </span>
                </div>
              </>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

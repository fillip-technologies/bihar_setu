import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Loader2 } from 'lucide-react';
import DynamicFormFields, { FormLoadError, FormSkeleton } from '../../shared/DynamicFormFields';
import { submitForm } from '../../utils/api';
import { initialValues, useFormDefinition } from '../../utils/formSchema';
import { useLocalized, usePageSection } from '../../content/siteContent';

const FORM_KEY = 'enquire';

export default function EnquireForm() {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'en';
  const c = usePageSection('enquire', 'form');
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

  const emailField = fields.find((f) => f.type === 'email');
  const replyTo = (emailField && result?.data[emailField.key]) || tx(c.emailFallback);

  return (
    <section className="bg-white py-14 sm:py-18 lg:py-20 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <h2 className="font-serif text-[#1F0E0A] text-2xl sm:text-3xl lg:text-[34px] font-normal tracking-tight mb-8">
          {tx(c.heading)}
        </h2>

        {result ? (
          <div className="bg-[#FAF5EB] border border-[#E8DEC8] rounded-xl p-8 text-center space-y-3">
            <CheckCircle2 size={40} className="mx-auto text-[#96681E]" />
            <h3 className="text-lg font-semibold text-[#1F0E0A]">
              {tx(c.successTitle)}
            </h3>
            <p className="text-xs sm:text-sm text-[#6B5A52]">
              {tx(c.successMessage).replace('{email}', () => replyTo)}
            </p>
            <p className="text-xs text-[#8A7972]">
              {tx(c.refLabel)}: <span className="font-mono font-bold text-[#651B12]">{result.referenceId}</span>
            </p>
            <button
              type="button"
              onClick={resetForm}
              className="mt-4 px-6 py-2 bg-[#D6A33A] text-[#1E0904] font-bold text-xs uppercase rounded-full cursor-pointer"
            >
              {tx(c.submitAnotherLabel)}
            </button>
          </div>
        ) : status === 'loading' ? (
          <FormSkeleton />
        ) : status === 'error' ? (
          <FormLoadError message={loadError} onRetry={reload} />
        ) : (
          /* Enquiry Form - fields are managed from the admin panel */
          <form onSubmit={handleSubmit} className="space-y-6">
            <DynamicFormFields
              formKey={FORM_KEY}
              fields={fields}
              values={values}
              errors={fieldErrors}
              onChange={handleChange}
              lang={lang}
              variant="enquire"
            />

            {formError && (
              <p role="alert" className="rounded-lg border border-[#F3C9C4] bg-[#FDF1EF] px-4 py-3 text-xs sm:text-sm text-[#B42318]">
                {formError}
              </p>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#D6A33A] hover:bg-[#C28F27] text-[#1E0904] font-bold text-xs uppercase tracking-wider rounded-full shadow-md transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-60 disabled:cursor-wait"
              >
                {submitting && <Loader2 size={15} className="animate-spin" />}
                {tx(c.submitLabel)}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Calendar, MapPin, Ticket, UserCheck, Sparkles } from 'lucide-react';

export default function AgendaRegisterForm() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    fullName: '',
    organisation: '',
    email: '',
    mobile: '',
    district: '',
    daysAttending: 'Both Days (7 & 8 Dec 2026)',
    category: 'Hotels, Resorts & Hospitality',
    notes: '',
    agreed: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [regId, setRegId] = useState('');

  const biharDistricts = [
    'Araria',
    'Arwal',
    'Aurangabad',
    'Banka',
    'Begusarai',
    'Bhagalpur',
    'Bhojpur',
    'Buxar',
    'Darbhanga',
    'East Champaran',
    'Gaya',
    'Gopalganj',
    'Jamui',
    'Jehanabad',
    'Kaimur',
    'Katihar',
    'Khagaria',
    'Kishanganj',
    'Lakhisarai',
    'Madhepura',
    'Madhubani',
    'Munger',
    'Muzaffarpur',
    'Nalanda',
    'Nawada',
    'Patna',
    'Purnia',
    'Rohtas',
    'Saharsa',
    'Samastipur',
    'Saran',
    'Sheikhpura',
    'Sheohar',
    'Sitamarhi',
    'Siwan',
    'Supaul',
    'Vaishali',
    'West Champaran',
  ];

  const categories = [
    { key: 'catHospitality', label: t('agendaPage.registerForm.catHospitality') },
    { key: 'catTravel', label: t('agendaPage.registerForm.catTravel') },
    { key: 'catGovt', label: t('agendaPage.registerForm.catGovt') },
    { key: 'catCulinary', label: t('agendaPage.registerForm.catCulinary') },
    { key: 'catInvestor', label: t('agendaPage.registerForm.catInvestor') },
    { key: 'catAcademic', label: t('agendaPage.registerForm.catAcademic') },
    { key: 'catMedia', label: t('agendaPage.registerForm.catMedia') },
    { key: 'catOther', label: t('agendaPage.registerForm.catOther') },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreed) {
      alert(t('agendaPage.registerForm.consent'));
      return;
    }
    const generatedId = `BST-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;
    setRegId(generatedId);
    setSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      organisation: '',
      email: '',
      mobile: '',
      district: '',
      daysAttending: 'Both Days (7 & 8 Dec 2026)',
      category: 'Hotels, Resorts & Hospitality',
      notes: '',
      agreed: false,
    });
    setSubmitted(false);
  };

  return (
    <section id="register-form" className="bg-[#FAF7F2] py-14 sm:py-18 lg:py-20 px-4 sm:px-6 lg:px-8 w-full border-t border-[#EFE5D7]">
      <div className="max-w-4xl mx-auto">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EFE5D7] text-[#651B12] text-xs font-semibold uppercase tracking-wider mb-3">
            <Ticket size={13} className="text-[#D6A33A]" />
            <span>Delegate Registration</span>
          </div>
          <h2 className="font-serif text-[#1F0E0A] text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight">
            {t('agendaPage.registerForm.heading')}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#5C443C] font-normal leading-relaxed">
            {t('agendaPage.registerForm.subtitle')}
          </p>
        </div>

        {submitted ? (
          /* Confirmation Success Card */
          <div className="bg-white rounded-2xl border border-[#E8DEC8] p-6 sm:p-10 shadow-sm transition-all duration-300">
            <div className="flex flex-col items-center text-center pb-8 border-b border-[#E8DEC8]">
              <div className="w-16 h-16 rounded-full bg-[#EBF7EE] text-[#1B6E32] flex items-center justify-center mb-4 ring-8 ring-[#EBF7EE]/60">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1F0E0A]">
                {t('agendaPage.registerForm.successTitle')}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#5C443C] max-w-lg leading-relaxed">
                {t('agendaPage.registerForm.successMessage')}
              </p>

              {/* Reference ID Badge */}
              <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]">
                <span className="text-xs text-[#8A7972] uppercase tracking-wider font-semibold">
                  {t('agendaPage.registerForm.regIdLabel')}:
                </span>
                <span className="font-mono text-sm sm:text-base font-bold text-[#651B12]">
                  {regId}
                </span>
              </div>
            </div>

            {/* Registration Summary Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6 border-b border-[#E8DEC8] text-xs sm:text-sm">
              <div className="space-y-2">
                <div className="text-[#8A7972]">{t('agendaPage.registerForm.fullName')}</div>
                <div className="font-medium text-[#1F0E0A]">{formData.fullName}</div>
              </div>
              <div className="space-y-2">
                <div className="text-[#8A7972]">{t('agendaPage.registerForm.org')}</div>
                <div className="font-medium text-[#1F0E0A]">{formData.organisation}</div>
              </div>
              <div className="space-y-2">
                <div className="text-[#8A7972]">{t('agendaPage.registerForm.email')}</div>
                <div className="font-medium text-[#1F0E0A]">{formData.email}</div>
              </div>
              <div className="space-y-2">
                <div className="text-[#8A7972]">{t('agendaPage.registerForm.mobile')}</div>
                <div className="font-medium text-[#1F0E0A]">{formData.mobile}</div>
              </div>
              <div className="space-y-2">
                <div className="text-[#8A7972]">{t('agendaPage.registerForm.daysAttending')}</div>
                <div className="font-medium text-[#651B12] flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#D6A33A]" />
                  <span>{formData.daysAttending}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-[#8A7972]">{t('agendaPage.registerForm.venueLabel')}</div>
                <div className="font-medium text-[#1F0E0A] flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#D6A33A]" />
                  <span>{t('agendaPage.registerForm.venueValue')}</span>
                </div>
              </div>
            </div>

            {/* Guidance Note */}
            <div className="mt-6 p-4 rounded-xl bg-[#FAF5EB] border border-[#EFE5D7] flex items-start gap-3">
              <Sparkles size={18} className="text-[#D6A33A] shrink-0 mt-0.5" />
              <p className="text-xs text-[#5C443C] leading-relaxed">
                {t('agendaPage.registerForm.nextStepNote')}
              </p>
            </div>

            {/* Reset / Register Another Button */}
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={resetForm}
                className="px-8 py-3 bg-[#D6A33A] hover:bg-[#C28F27] text-[#1E0904] font-bold text-xs uppercase tracking-wider rounded-full shadow-xs transition-all duration-200 cursor-pointer active:scale-95"
              >
                {t('agendaPage.registerForm.registerAnother')}
              </button>
            </div>
          </div>
        ) : (
          /* Main Interactive Registration Form */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-[#E8DEC8] p-6 sm:p-10 shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* 1. Full Name */}
              <div>
                <label className="block text-xs sm:text-[13px] font-medium text-[#1F0E0A] mb-1.5">
                  {t('agendaPage.registerForm.fullName')} <span className="text-[#651B12]">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder={t('agendaPage.registerForm.fullNamePlaceholder')}
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#E8DEC8] rounded-md bg-white text-[#1F0E0A] focus:outline-hidden focus:border-[#D6A33A] focus:ring-1 focus:ring-[#D6A33A]"
                />
              </div>

              {/* 2. Organisation */}
              <div>
                <label className="block text-xs sm:text-[13px] font-medium text-[#1F0E0A] mb-1.5">
                  {t('agendaPage.registerForm.org')} <span className="text-[#651B12]">*</span>
                </label>
                <input
                  type="text"
                  name="organisation"
                  required
                  placeholder={t('agendaPage.registerForm.orgPlaceholder')}
                  value={formData.organisation}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#E8DEC8] rounded-md bg-white text-[#1F0E0A] focus:outline-hidden focus:border-[#D6A33A] focus:ring-1 focus:ring-[#D6A33A]"
                />
              </div>

              {/* 3. Email Address */}
              <div>
                <label className="block text-xs sm:text-[13px] font-medium text-[#1F0E0A] mb-1.5">
                  {t('agendaPage.registerForm.email')} <span className="text-[#651B12]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={t('agendaPage.registerForm.emailPlaceholder')}
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#E8DEC8] rounded-md bg-white text-[#1F0E0A] focus:outline-hidden focus:border-[#D6A33A] focus:ring-1 focus:ring-[#D6A33A]"
                />
              </div>

              {/* 4. Mobile Number */}
              <div>
                <label className="block text-xs sm:text-[13px] font-medium text-[#1F0E0A] mb-1.5">
                  {t('agendaPage.registerForm.mobile')} <span className="text-[#651B12]">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  required
                  pattern="[0-9]{10}"
                  placeholder={t('agendaPage.registerForm.mobilePlaceholder')}
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#E8DEC8] rounded-md bg-white text-[#1F0E0A] focus:outline-hidden focus:border-[#D6A33A] focus:ring-1 focus:ring-[#D6A33A]"
                />
              </div>

              {/* 5. District */}
              <div>
                <label className="block text-xs sm:text-[13px] font-medium text-[#1F0E0A] mb-1.5">
                  {t('agendaPage.registerForm.district')} <span className="text-[#651B12]">*</span>
                </label>
                <select
                  name="district"
                  required
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#E8DEC8] rounded-md bg-white text-[#1F0E0A] focus:outline-hidden focus:border-[#D6A33A] focus:ring-1 focus:ring-[#D6A33A]"
                >
                  <option value="" disabled>
                    {t('agendaPage.registerForm.selectDistrict')}
                  </option>
                  {biharDistricts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                  <option value="Outside Bihar">
                    {t('agendaPage.registerForm.otherDistrict')}
                  </option>
                </select>
              </div>

              {/* 6. Delegate Category */}
              <div>
                <label className="block text-xs sm:text-[13px] font-medium text-[#1F0E0A] mb-1.5">
                  {t('agendaPage.registerForm.category')} <span className="text-[#651B12]">*</span>
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#E8DEC8] rounded-md bg-white text-[#1F0E0A] focus:outline-hidden focus:border-[#D6A33A] focus:ring-1 focus:ring-[#D6A33A]"
                >
                  {categories.map((c) => (
                    <option key={c.key} value={c.label}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 7. Days Attending (Radio Selection) */}
            <div className="mt-8">
              <label className="block text-xs sm:text-[13px] font-medium text-[#1F0E0A] mb-3">
                {t('agendaPage.registerForm.daysAttending')} <span className="text-[#651B12]">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    value: 'Both Days (7 & 8 Dec 2026)',
                    label: t('agendaPage.registerForm.bothDays'),
                  },
                  {
                    value: 'Day 1 only (7 Dec 2026)',
                    label: t('agendaPage.registerForm.day1Only'),
                  },
                  {
                    value: 'Day 2 only (8 Dec 2026)',
                    label: t('agendaPage.registerForm.day2Only'),
                  },
                ].map((item) => {
                  const isSelected = formData.daysAttending === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, daysAttending: item.value }))}
                      className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#D6A33A] bg-[#FFF9EE] ring-1 ring-[#D6A33A]'
                          : 'border-[#E8DEC8] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-medium text-[#1F0E0A]">
                        {item.label}
                      </span>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-[#D6A33A] bg-[#D6A33A]'
                            : 'border-[#C8BBAF]'
                        }`}
                      >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Special Notes or Questions */}
            <div className="mt-8">
              <label className="block text-xs sm:text-[13px] font-medium text-[#1F0E0A] mb-1.5">
                {t('agendaPage.registerForm.notes')}
              </label>
              <textarea
                name="notes"
                rows="3"
                placeholder={t('agendaPage.registerForm.notesPlaceholder')}
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#E8DEC8] rounded-md bg-white text-[#1F0E0A] focus:outline-hidden focus:border-[#D6A33A] focus:ring-1 focus:ring-[#D6A33A]"
              />
            </div>

            {/* 10. Consent Checkbox */}
            <div className="mt-6 flex items-start gap-2.5">
              <input
                type="checkbox"
                id="consentCheck"
                name="agreed"
                required
                checked={formData.agreed}
                onChange={handleChange}
                className="mt-0.5 w-4 h-4 text-[#651B12] border-[#E8DEC8] rounded-sm focus:ring-[#D6A33A] accent-[#651B12] cursor-pointer"
              />
              <label
                htmlFor="consentCheck"
                className="text-xs text-[#5C443C] leading-snug cursor-pointer select-none"
              >
                {t('agendaPage.registerForm.consent')}
              </label>
            </div>

            {/* 11. Submit Button */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#D6A33A] hover:bg-[#C28F27] text-[#1E0904] font-bold text-xs uppercase tracking-wider rounded-full shadow-xs transition-all duration-200 cursor-pointer active:scale-95"
              >
                <UserCheck size={16} />
                <span>{t('agendaPage.registerForm.submitBtn')}</span>
              </button>
              <span className="text-[11px] text-[#8A7972]">
                Complimentary pass for registered industry delegates
              </span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}


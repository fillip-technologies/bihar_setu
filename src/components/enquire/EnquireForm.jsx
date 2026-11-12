import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2 } from 'lucide-react';

export default function EnquireForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: '',
    organisation: '',
    email: '',
    mobile: '',
    district: '',
    category: 'General enquiry',
    message: '',
    agreed: false,
  });

  const [submitted, setSubmitted] = useState(false);

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
    'General enquiry',
    'Speaker enquiry',
    'Sponsor enquiry',
    'Media enquiry',
    'Association enquiry',
    'Institutional partnership',
    'Corporate partnership',
    'Knowledge partnership',
    'Technology partnership',
    'Submit an initiative',
    'Other',
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
      alert('Please agree to be contacted by Bihar Setu.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <section className="bg-white py-14 sm:py-18 lg:py-20 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <h2 className="font-serif text-[#1F0E0A] text-2xl sm:text-3xl lg:text-[34px] font-normal tracking-tight mb-8">
          {t('enquirePage.formHeading')}
        </h2>

        {submitted ? (
          <div className="bg-[#FAF5EB] border border-[#E8DEC8] rounded-xl p-8 text-center space-y-3">
            <CheckCircle2 size={40} className="mx-auto text-[#96681E]" />
            <h3 className="text-lg font-semibold text-[#1F0E0A]">
              {t('enquirePage.successMsg')}
            </h3>
            <p className="text-xs sm:text-sm text-[#6B5A52]">
              Our team will review your enquiry and get back to you shortly at {formData.email || 'your email'}.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  fullName: '',
                  organisation: '',
                  email: '',
                  mobile: '',
                  district: '',
                  category: 'General enquiry',
                  message: '',
                  agreed: false,
                });
              }}
              className="mt-4 px-6 py-2 bg-[#D6A33A] text-[#1E0904] font-bold text-xs uppercase rounded-full"
            >
              Submit Another Enquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs sm:text-sm text-[#4A3831] font-medium mb-1.5"
                >
                  {t('enquirePage.fullName')}
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder={t('enquirePage.fullNamePlaceholder')}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#E5DCCD] rounded-md bg-white text-[#1F0E0A] placeholder-[#9E8E87] focus:border-[#D6A33A] focus:outline-hidden transition-colors"
                />
              </div>

              {/* Organisation */}
              <div>
                <label
                  htmlFor="organisation"
                  className="block text-xs sm:text-sm text-[#4A3831] font-medium mb-1.5"
                >
                  {t('enquirePage.organisation')}
                </label>
                <input
                  type="text"
                  id="organisation"
                  name="organisation"
                  value={formData.organisation}
                  onChange={handleChange}
                  placeholder={t('enquirePage.organisationPlaceholder')}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#E5DCCD] rounded-md bg-white text-[#1F0E0A] placeholder-[#9E8E87] focus:border-[#D6A33A] focus:outline-hidden transition-colors"
                />
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm text-[#4A3831] font-medium mb-1.5"
                >
                  {t('enquirePage.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('enquirePage.emailPlaceholder')}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#E5DCCD] rounded-md bg-white text-[#1F0E0A] placeholder-[#9E8E87] focus:border-[#D6A33A] focus:outline-hidden transition-colors"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label
                  htmlFor="mobile"
                  className="block text-xs sm:text-sm text-[#4A3831] font-medium mb-1.5"
                >
                  {t('enquirePage.mobile')}
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder={t('enquirePage.mobilePlaceholder')}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#E5DCCD] rounded-md bg-white text-[#1F0E0A] placeholder-[#9E8E87] focus:border-[#D6A33A] focus:outline-hidden transition-colors"
                />
              </div>

              {/* District */}
              <div>
                <label
                  htmlFor="district"
                  className="block text-xs sm:text-sm text-[#4A3831] font-medium mb-1.5"
                >
                  {t('enquirePage.district')}
                </label>
                <select
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#E5DCCD] rounded-md bg-white text-[#1F0E0A] focus:border-[#D6A33A] focus:outline-hidden transition-colors"
                >
                  <option value="">{t('enquirePage.selectDistrict')}</option>
                  {biharDistricts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Enquiry Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-xs sm:text-sm text-[#4A3831] font-medium mb-1.5"
                >
                  {t('enquirePage.enquiryCategory')}
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#E5DCCD] rounded-md bg-white text-[#1F0E0A] focus:border-[#D6A33A] focus:outline-hidden transition-colors"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-xs sm:text-sm text-[#4A3831] font-medium mb-1.5"
                >
                  {t('enquirePage.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('enquirePage.messagePlaceholder')}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#E5DCCD] rounded-md bg-white text-[#1F0E0A] placeholder-[#9E8E87] focus:border-[#D6A33A] focus:outline-hidden transition-colors resize-y"
                />
              </div>
            </div>

            {/* Checkbox Agreement */}
            <div className="flex items-start gap-2.5 pt-2">
              <input
                type="checkbox"
                id="agreed"
                name="agreed"
                checked={formData.agreed}
                onChange={handleChange}
                required
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#CB9010] focus:ring-[#CB9010] cursor-pointer"
              />
              <label
                htmlFor="agreed"
                className="text-xs sm:text-sm text-[#6B5A52] cursor-pointer select-none"
              >
                {t('enquirePage.agreeTerms')}
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-8 py-3 bg-[#D6A33A] hover:bg-[#C28F27] text-[#1E0904] font-bold text-xs uppercase tracking-wider rounded-full shadow-md transition-all duration-200 cursor-pointer active:scale-95"
              >
                {t('enquirePage.submitBtn')}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}


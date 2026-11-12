import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Loader2, LockKeyhole } from 'lucide-react';
import logo from '../../assets/bihar-setu-logo-white-cropped.png';
import { adminRequest, adminToken } from '../../utils/api';
import { inputClass, labelClass, primaryButton } from './ui';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (adminToken.get()) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { token } = await adminRequest('/login', { method: 'POST', body: { email, password } });
      adminToken.set(token);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[radial-gradient(ellipse_at_top,#521810_0%,#240700_70%)]">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <img src={logo} alt="Bihar Setu" className="h-14 mx-auto object-contain" />
          <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#D6A33A]">Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-full bg-[#FAF5EB] text-[#651B12] flex items-center justify-center">
              <LockKeyhole size={17} />
            </span>
            <div>
              <h1 className="font-serif text-lg leading-tight">Sign in</h1>
              <p className="text-xs text-[#8A7972]">Manage form fields and submissions</p>
            </div>
          </div>

          <div>
            <label htmlFor="admin-email" className={labelClass}>Email</label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="admin-password" className={labelClass}>Password</label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-[#FDF1EF] border border-[#F3C9C4] px-3 py-2 text-xs text-[#B42318]">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} className={`${primaryButton} w-full`}>
            {loading && <Loader2 size={15} className="animate-spin" />}
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

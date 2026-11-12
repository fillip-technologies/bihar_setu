import React, { useCallback, useEffect, useState } from 'react';
import { Navigate, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, ExternalLink, House, Inbox, ListChecks, LogOut, Menu, X } from 'lucide-react';
import logo from '../../assets/bihar-setu-logo-white-cropped.png';
import { adminRequest, adminToken } from '../../utils/api';
import { HOME_SECTIONS } from '../../content/homeSchema';

export default function AdminLayout() {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const [homeOpen, setHomeOpen] = useState(pathname.startsWith('/admin/home/'));
  const hasToken = Boolean(adminToken.get());

  // Sidebar form list with submission counts; child pages call this after changes.
  const refreshForms = useCallback(() => {
    adminRequest('/forms')
      .then(setForms)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (hasToken) refreshForms();
  }, [hasToken, refreshForms]);

  if (!hasToken) return <Navigate to="/admin/login" replace />;

  const signOut = () => {
    adminToken.clear();
    navigate('/admin/login', { replace: true });
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] font-semibold transition-colors ${
      isActive ? 'bg-white/12 text-white' : 'text-white/65 hover:bg-white/8 hover:text-white'
    }`;

  return (
    <div className="min-h-screen lg:flex">
      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#240700] px-4 py-3 text-white lg:hidden">
        <span className="font-serif text-base">Bihar Setu Admin</span>
        <button type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu" className="rounded-lg p-1.5 hover:bg-white/10 cursor-pointer">
          <Menu size={20} />
        </button>
      </div>

      {menuOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-[#1F0E0A]/50 lg:hidden cursor-default"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#240700] text-white transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-start justify-between px-5 pt-6 pb-5">
          <div>
            <img src={logo} alt="Bihar Setu" className="h-9 object-contain" />
            <p className="mt-2 text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#D6A33A]">Admin Panel</p>
          </div>
          <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu" className="rounded-lg p-1.5 hover:bg-white/10 lg:hidden cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 space-y-5" aria-label="Admin sections">
          {/* Website content: Home page sections */}
          <div>
            <p className="px-3 pb-1.5 text-[10.5px] font-bold uppercase tracking-widest text-white/40">Website</p>
            <button
              type="button"
              onClick={() => setHomeOpen((o) => !o)}
              aria-expanded={homeOpen}
              className={`${navClass({ isActive: false })} w-full cursor-pointer`}
            >
              <House size={16} className="shrink-0" />
              <span className="flex-1 text-left">Home page</span>
              <ChevronDown size={15} className={`transition-transform ${homeOpen ? 'rotate-180' : ''}`} />
            </button>
            {homeOpen && (
              <div className="ml-5 mt-0.5 space-y-0.5 border-l border-white/10 pl-2">
                {HOME_SECTIONS.map((s) => (
                  <NavLink
                    key={s.key}
                    to={`/admin/home/${s.key}`}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-md px-2.5 py-1.5 text-[13px] transition-colors ${
                        isActive ? 'bg-white/12 font-semibold text-white' : 'text-white/60 hover:bg-white/8 hover:text-white'
                      }`
                    }
                  >
                    {s.title}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {forms.map((form) => (
            <div key={form.key}>
              <p className="px-3 pb-1.5 text-[10.5px] font-bold uppercase tracking-widest text-white/40">{form.title}</p>
              <div className="space-y-0.5">
                <NavLink to={`/admin/${form.key}/submissions`} onClick={() => setMenuOpen(false)} className={navClass}>
                  <Inbox size={16} className="shrink-0" />
                  <span className="flex-1">Submissions</span>
                  {form.new > 0 && (
                    <span className="rounded-full bg-[#D6A33A] px-1.5 py-px text-[10.5px] font-bold text-[#1E0904]" title={`${form.new} new`}>
                      {form.new}
                    </span>
                  )}
                </NavLink>
                <NavLink to={`/admin/${form.key}/fields`} onClick={() => setMenuOpen(false)} className={navClass}>
                  <ListChecks size={16} className="shrink-0" />
                  <span className="flex-1">Form fields</span>
                  <span className="text-[11px] text-white/40">{form.fieldCount}</span>
                </NavLink>
              </div>
            </div>
          ))}
        </nav>

        <div className="space-y-0.5 border-t border-white/10 px-3 py-4">
          <a href="/" target="_blank" rel="noreferrer" className={navClass({ isActive: false })}>
            <ExternalLink size={16} />
            View website
          </a>
          <button type="button" onClick={signOut} className={`${navClass({ isActive: false })} w-full cursor-pointer`}>
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
        <Outlet context={{ forms, refreshForms }} />
      </main>
    </div>
  );
}

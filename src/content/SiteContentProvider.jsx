import React, { useEffect, useState } from 'react';
import { getPageContent } from '../utils/api';
import { PAGE_DEFAULTS, SiteContentContext } from './siteContent';

const PAGES = Object.keys(PAGE_DEFAULTS);

// Loads the admin-edited content of every page before the site renders, so visitors never see the old text flash first.
// A page whose content can't be loaded (or an unreachable API) falls back to its built-in content.
export default function SiteContentProvider({ children }) {
  const [state, setState] = useState({ ready: false, pages: {} });

  useEffect(() => {
    let active = true;
    const fallback = setTimeout(() => active && setState((s) => (s.ready ? s : { ...s, ready: true })), 4000);
    Promise.all(PAGES.map((page) => getPageContent(page).then((res) => res.sections || {}, () => ({})))).then(
      (sections) => active && setState({ ready: true, pages: Object.fromEntries(PAGES.map((page, i) => [page, sections[i]])) }),
    );
    return () => {
      active = false;
      clearTimeout(fallback);
    };
  }, []);

  if (!state.ready) return <div className="min-h-screen bg-[#1A0502]" />;
  return <SiteContentContext.Provider value={state.pages}>{children}</SiteContentContext.Provider>;
}

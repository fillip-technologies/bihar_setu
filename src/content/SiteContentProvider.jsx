import React, { useEffect, useState } from 'react';
import { getAllPageContent } from '../utils/api';
import { SiteContentContext } from './siteContent';

// Loads the admin-edited content of every page before the site renders, so visitors never see the old text flash first.
// If the API is unreachable the site falls back to its built-in content.
export default function SiteContentProvider({ children }) {
  const [state, setState] = useState({ ready: false, pages: {} });

  useEffect(() => {
    let active = true;
    const fallback = setTimeout(() => active && setState((s) => (s.ready ? s : { ...s, ready: true })), 4000);
    getAllPageContent()
      .then((res) => active && setState({ ready: true, pages: res.pages || {} }))
      .catch(() => active && setState((s) => ({ ...s, ready: true })));
    return () => {
      active = false;
      clearTimeout(fallback);
    };
  }, []);

  if (!state.ready) return <div className="min-h-screen bg-[#1A0502]" />;
  return <SiteContentContext.Provider value={state.pages}>{children}</SiteContentContext.Provider>;
}

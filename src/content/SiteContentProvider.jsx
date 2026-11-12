import React, { useEffect, useState } from 'react';
import { getPageContent } from '../utils/api';
import { SiteContentContext } from './siteContent';

// Loads the admin-edited content before the site renders, so visitors never see the old text flash first.
// If the API is unreachable the site falls back to its built-in content.
export default function SiteContentProvider({ children }) {
  const [state, setState] = useState({ ready: false, home: {} });

  useEffect(() => {
    let active = true;
    const fallback = setTimeout(() => active && setState((s) => (s.ready ? s : { ...s, ready: true })), 4000);
    getPageContent('home')
      .then((res) => active && setState({ ready: true, home: res.sections || {} }))
      .catch(() => active && setState((s) => ({ ...s, ready: true })));
    return () => {
      active = false;
      clearTimeout(fallback);
    };
  }, []);

  if (!state.ready) return <div className="min-h-screen bg-[#1A0502]" />;
  return <SiteContentContext.Provider value={{ home: state.home }}>{children}</SiteContentContext.Provider>;
}

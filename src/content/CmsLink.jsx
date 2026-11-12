import React from 'react';
import { Link } from 'react-router-dom';
import { isInternalLink, safeHref } from './siteContent';

// Link whose target comes from editable content: site paths use the router, anything else is a normal anchor.
// All other props (className, onClick, ...) are passed through unchanged.
export default function CmsLink({ to, children, ...props }) {
  if (isInternalLink(to)) {
    return (
      <Link to={to} {...props}>
        {children}
      </Link>
    );
  }
  const href = safeHref(to);
  const external = /^https?:/i.test(href);
  return (
    <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} {...props}>
      {children}
    </a>
  );
}

import React from 'react';

const EMAIL_RE = /([^\s@]+@[^\s@]+\.[a-z]{2,})/gi;

// Plain text in which email addresses become mailto links (used for FAQ answers).
export default function LinkifiedText({ text, linkClassName }) {
  return String(text)
    .split(EMAIL_RE)
    .map((part, i) =>
      i % 2 === 1 ? (
        <a key={i} href={`mailto:${part}`} className={linkClassName}>
          {part}
        </a>
      ) : (
        part
      ),
    );
}

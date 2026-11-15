import React from 'react';

/**
 * Strips raw Markdown bold (**text**) and italic (*text*) markers into clean plain text.
 */
export function stripMarkdownAsterisks(text?: string | null): string {
  if (!text) return '';
  return String(text)
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*\n]+)\*/g, '$1')
    .replace(/\*\*/g, '');
}

/**
 * Renders inline Markdown (**bold** and *italic*) as clean React elements (<strong /> and <em />)
 * without using dangerouslySetInnerHTML or leaving raw asterisks on screen.
 */
export function renderFormattedText(text?: string | null): React.ReactNode {
  if (!text) return null;
  const raw = String(text);
  if (!raw.includes('*')) return raw;

  const tokenRegex = /(\*\*[^*]+\*\*|\*[^*\n]+\*)/g;
  const parts = raw.split(tokenRegex);

  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      const inner = part.slice(2, -2);
      return (
        <strong key={idx} className="font-semibold text-slate-900">
          {inner}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      const inner = part.slice(1, -1);
      return (
        <em key={idx} className="italic">
          {inner}
        </em>
      );
    }
    return <React.Fragment key={idx}>{part.replace(/\*\*/g, '')}</React.Fragment>;
  });
}

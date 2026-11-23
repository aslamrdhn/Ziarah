import React from 'react';

const SAFE_HTTP_URL_REGEX = /^https?:\/\/[^\s)]+$/i;
const INLINE_MARKDOWN_TOKEN_REGEX = /(\[[^\]]+\]\([^)\s]+\)|\*\*[^*]+\*\*|\*[^*\n]+\*)/g;
const MARKDOWN_LINK_PART_REGEX = /^\[([^\]]+)\]\(([^)\s]+)\)$/;

/**
 * Strips raw Markdown links `[Label](url)`, bold (`**text**`), and italic (`*text*`) markers into clean plain text.
 */
export function stripMarkdownAsterisks(text?: string | null): string {
  if (!text) return '';
  return String(text)
    .replace(/\[([^\]]+)\]\([^)\s]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*\n]+)\*/g, '$1')
    .replace(/\*\*/g, '');
}

/**
 * Renders inline Markdown links `[Label](https://...)` as safe external `<a target="_blank" rel="noopener noreferrer">`,
 * `**bold**` as `<strong />`, and `*italic*` as `<em />` without using dangerouslySetInnerHTML
 * and without trimming surrounding whitespace tokens.
 */
export function renderFormattedText(text?: string | null): React.ReactNode {
  if (!text) return null;
  const raw = String(text);
  if (!raw.includes('*') && !raw.includes('[')) return raw;

  const parts = raw.split(INLINE_MARKDOWN_TOKEN_REGEX);

  return parts.map((part, idx) => {
    if (!part) return null;

    const linkMatch = part.match(MARKDOWN_LINK_PART_REGEX);
    if (linkMatch) {
      const [, rawLabel, rawUrl] = linkMatch;
      const cleanUrl = rawUrl.trim();
      const cleanLabel = stripMarkdownAsterisks(rawLabel);
      if (SAFE_HTTP_URL_REGEX.test(cleanUrl)) {
        return (
          <a
            key={idx}
            href={cleanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 underline decoration-emerald-400/70 hover:text-emerald-900 font-medium"
          >
            {cleanLabel}
          </a>
        );
      }
      return <React.Fragment key={idx}>{cleanLabel}</React.Fragment>;
    }

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


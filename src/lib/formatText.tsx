import React from 'react';

const SAFE_HTTP_URL_REGEX = /^https?:\/\/[^\s)]+$/i;
const INLINE_MARKDOWN_TOKEN_REGEX =
  /(\[[^\]]+\]\([^)\s]+\)|\*\*\*(?:(?!\*\*\*)[^\n])+\*\*\*|\*\*(?:(?!\*\*)[^\n])+\*\*|\*(?!\s)[^*\n]+?(?<!\s)\*)/g;
const MARKDOWN_LINK_PART_REGEX = /^\[([^\]]+)\]\(([^)\s]+)\)$/;

/**
 * Ensures any closing Markdown token (`*italic*`, `**bold**`, `***bold-italic***`, or `[label](url)`)
 * immediately followed by an alphanumeric word character has a space separator so words never merge
 * (e.g. preventing `*Maha Guru*para` -> `*Maha Guru* para` and `Maha Gurupara` -> `Maha Guru para`).
 */
export function normalizeMarkdownSpacing(text?: string | null): string {
  if (!text) return '';
  const raw = String(text);
  if (!raw.includes('*') && !raw.includes('[')) return raw;

  const parts = raw.split(INLINE_MARKDOWN_TOKEN_REGEX);
  if (parts.length <= 1) return raw;

  return parts
    .map((part, idx) => {
      if (!part) return '';
      // Odd indices are matched Markdown tokens; even indices are plain text between tokens
      if (idx % 2 === 1) return part;
      let normalized = part;
      if (idx > 0 && /^[A-Za-z0-9]/.test(normalized)) {
        normalized = ' ' + normalized;
      }
      if (idx < parts.length - 1 && /[A-Za-z0-9]$/.test(normalized)) {
        normalized = normalized + ' ';
      }
      return normalized;
    })
    .join('');
}

/**
 * Strips raw Markdown links `[Label](url)`, bold (`**text**`), and italic (`*text*`) markers into clean plain text.
 */
export function stripMarkdownAsterisks(text?: string | null): string {
  if (!text) return '';
  return normalizeMarkdownSpacing(text)
    .replace(/\[([^\]]+)\]\([^)\s]+\)/g, '$1')
    .replace(/\*\*\*((?:(?!\*\*\*)[^\n])+)\*\*\*/g, '$1')
    .replace(/\*\*((?:(?!\*\*)[^\n])+)\*\*/g, '$1')
    .replace(/\*(?!\s)([^*\n]+?)(?<!\s)\*/g, '$1')
    .replace(/\*\*/g, '');
}

/**
 * Renders inline Markdown links `[Label](https://...)` as safe external `<a target="_blank" rel="noopener noreferrer">`,
 * `***bold-italic***` as `<strong><em /></strong>`, `**bold**` as `<strong />` (supporting nested `*italic*`),
 * and `*italic*` as `<em />` without using dangerouslySetInnerHTML and without trimming surrounding whitespace tokens.
 */
export function renderFormattedText(text?: string | null): React.ReactNode {
  if (!text) return null;
  const raw = normalizeMarkdownSpacing(text);
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
      return cleanLabel;
    }

    if (part.startsWith('***') && part.endsWith('***') && part.length > 6) {
      const inner = part.slice(3, -3);
      return (
        <strong key={idx} className="font-semibold text-slate-900">
          <em className="italic">{inner}</em>
        </strong>
      );
    }

    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      const inner = part.slice(2, -2);
      return (
        <strong key={idx} className="font-semibold text-slate-900">
          {inner.includes('*') ? renderFormattedText(inner) : inner}
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

    return part.replace(/\*\*/g, '');
  });
}

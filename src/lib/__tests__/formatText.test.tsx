import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { renderFormattedText, stripMarkdownAsterisks } from '../formatText';

describe('renderFormattedText & stripMarkdownAsterisks (Markdown Link, Bold, Italic & Whitespace Safety)', () => {
  it('parses [Label](https://...) into an anchor tag with target="_blank" and rel="noopener noreferrer"', () => {
    const node = renderFormattedText(
      'Rujukan resmi: [Kompas](https://www.kompas.com/test) dan [NU Online](https://nu.or.id/sejarah).'
    );
    const html = renderToStaticMarkup(<>{node}</>);

    expect(html).toContain(
      '<a href="https://www.kompas.com/test" target="_blank" rel="noopener noreferrer"'
    );
    expect(html).toContain('>Kompas</a>');
    expect(html).toContain(
      '<a href="https://nu.or.id/sejarah" target="_blank" rel="noopener noreferrer"'
    );
    expect(html).toContain('>NU Online</a>');
    expect(html).not.toContain('[Kompas](https://www.kompas.com/test)');
  });

  it('preserves exact whitespace around *italic* and **bold** tokens (never eats spaces like Maha Gurupara)', () => {
    const node = renderFormattedText(
      'Syaichona Kholil dikenal sebagai *Maha Guru* para ulama Nusantara dan **Pendiri** pesantren.'
    );
    const html = renderToStaticMarkup(<>{node}</>);

    expect(html).toContain('sebagai <em class="italic">Maha Guru</em> para ulama');
    expect(html).toContain(
      'dan <strong class="font-semibold text-slate-900">Pendiri</strong> pesantren.'
    );
    expect(html).not.toContain('Maha Guru</em>para');
  });

  it('rejects unsafe protocols like javascript: or data: inside Markdown links', () => {
    const node = renderFormattedText(
      'Tautan berbahaya [ berbahaya ](javascript:alert(1)) dan [data](data:text/html,<script>alert(1)</script>) tidak menjadi link.'
    );
    const html = renderToStaticMarkup(<>{node}</>);

    expect(html).not.toContain('<a ');
    expect(html).not.toContain('href="javascript:');
    expect(html).not.toContain('href="data:');
  });

  it('stripMarkdownAsterisks strips Markdown link URLs and asterisks for clean plain-text excerpts', () => {
    const plain = stripMarkdownAsterisks(
      'Kitab *Al-Hikam* karya **Ibnu Athaillah** dikutip oleh [NU Online](https://nu.or.id/hikam).'
    );
    expect(plain).toBe('Kitab Al-Hikam karya Ibnu Athaillah dikutip oleh NU Online.');
  });
});

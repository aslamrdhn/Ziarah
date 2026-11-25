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
      'dikenal luas sebagai *Maha Guru* para ulama Nusantara.'
    );
    const html = renderToStaticMarkup(<>{node}</>);
    const textContent = html.replace(/<[^>]+>/g, '');

    expect(html).toContain('sebagai <em class="italic">Maha Guru</em> para ulama Nusantara.');
    expect(textContent).toContain('Maha Guru para');
    expect(textContent).not.toContain('Maha Gurupara');

    // Even if an input ever lacked a trailing space after closing *italic*, normalizeMarkdownSpacing inserts it
    const normalizedNode = renderFormattedText(
      'dikenal luas sebagai *Maha Guru*para ulama Nusantara dan **Pendiri**pesantren.'
    );
    const normalizedHtml = renderToStaticMarkup(<>{normalizedNode}</>);
    const normalizedText = normalizedHtml.replace(/<[^>]+>/g, '');
    expect(normalizedText).toContain('Maha Guru para');
    expect(normalizedText).toContain('Pendiri pesantren');
    expect(normalizedText).not.toContain('Maha Gurupara');
  });

  it('supports nested *italic* inside **bold** and ***bold-italic*** without breaking token boundaries or spaces', () => {
    const node = renderFormattedText(
      'Ajaran **kesederhanaan (*zuhud*) dan keberpihakan** serta ***Mahakarya*** ulama.'
    );
    const html = renderToStaticMarkup(<>{node}</>);
    const textContent = html.replace(/<[^>]+>/g, '');

    expect(textContent).toBe('Ajaran kesederhanaan (zuhud) dan keberpihakan serta Mahakarya ulama.');
    expect(html).toContain('<strong class="font-semibold text-slate-900">kesederhanaan (<em class="italic">zuhud</em>) dan keberpihakan</strong>');
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

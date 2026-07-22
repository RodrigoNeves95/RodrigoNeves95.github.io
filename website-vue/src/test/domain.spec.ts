import { describe, expect, it } from 'vitest';

import indexHtml from '../../index.html?raw';
import robots from '../../public/robots.txt?raw';
import sitemap from '../../public/sitemap.xml?raw';

const metadataFiles = { indexHtml, robots, sitemap };
const obsoleteDomain = ['rn', 've.es'].join('');

describe('public domain metadata', () => {
  it.each(Object.entries(metadataFiles))('%s uses only the canonical domain', (_name, contents) => {
    expect(contents).toContain('rnev.es');
    expect(contents).not.toContain(obsoleteDomain);
  });
});

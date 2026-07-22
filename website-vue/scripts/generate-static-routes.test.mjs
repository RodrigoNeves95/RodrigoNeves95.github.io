import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import test from 'node:test';

import { generateRouteDocuments } from './generate-static-routes.mjs';

const source = await readFile(resolve('index.html'), 'utf8');

test('generates route-specific indexable documents', () => {
  const { home, snake } = generateRouteDocuments(source);
  assert.match(home, /<title>Rodrigo Neves \| Product Engineer<\/title>/);
  assert.match(home, /rel="canonical" href="https:\/\/rnev\.es\/"/);
  assert.match(snake, /<title>Snake \| Rodrigo Neves<\/title>/);
  assert.match(snake, /rel="canonical" href="https:\/\/rnev\.es\/snake"/);
  assert.match(snake, /property="og:url" content="https:\/\/rnev\.es\/snake"/);
  assert.match(snake, /https:\/\/rnev\.es\/og\.png/);
});

test('generates a non-indexable 404 without a canonical URL', () => {
  const { notFound } = generateRouteDocuments(source);
  assert.match(notFound, /<title>Page Not Found \| Rodrigo Neves<\/title>/);
  assert.match(notFound, /name="robots" content="noindex, nofollow"/);
  assert.doesNotMatch(notFound, /rel="canonical"/);
  assert.doesNotMatch(notFound, /property="og:url"/);
});

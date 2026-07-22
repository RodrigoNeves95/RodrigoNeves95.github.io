import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

const descriptions = {
  home: 'Portfolio of Rodrigo Neves, a Product Engineer building software products and full-stack systems from 0-to-1 through scale.',
  snake:
    'Play a responsive Snake game on Rodrigo Neves’s portfolio using keyboard or touch controls.',
  notFound: 'The requested page could not be found on Rodrigo Neves’s portfolio.',
};

const replaceTitle = (html, title) =>
  html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);

const replaceMeta = (html, attribute, key, content) => {
  const pattern = new RegExp(`(<meta\\s+${attribute}="${key}"\\s+content=")[^"]*("\\s*\\/>)`);
  if (!pattern.test(html)) throw new Error(`Missing metadata field: ${key}`);
  return html.replace(pattern, `$1${content}$2`);
};

const setSharedMetadata = (html, { title, description }) => {
  let result = replaceTitle(html, title);
  for (const [attribute, key, value] of [
    ['name', 'description', description],
    ['property', 'og:title', title],
    ['property', 'og:description', description],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', description],
  ]) {
    result = replaceMeta(result, attribute, key, value);
  }
  return result;
};

export const generateRouteDocuments = (indexHtml) => {
  const home = setSharedMetadata(indexHtml, {
    title: 'Rodrigo Neves | Product Engineer',
    description: descriptions.home,
  });

  let snake = setSharedMetadata(indexHtml, {
    title: 'Snake | Rodrigo Neves',
    description: descriptions.snake,
  });
  snake = replaceMeta(snake, 'property', 'og:url', 'https://rnev.es/snake');
  snake = snake.replace(
    '<link rel="canonical" href="https://rnev.es/" />',
    '<link rel="canonical" href="https://rnev.es/snake" />',
  );

  let notFound = setSharedMetadata(indexHtml, {
    title: 'Page Not Found | Rodrigo Neves',
    description: descriptions.notFound,
  });
  notFound = replaceMeta(notFound, 'name', 'robots', 'noindex, nofollow');
  notFound = notFound.replace(/^\s*<link rel="canonical"[^>]*>\s*$/m, '');
  notFound = notFound.replace(/^\s*<meta property="og:url"[^>]*>\s*$/m, '');
  notFound = notFound.replace(
    /^\s*<script type="application\/ld\+json">[\s\S]*?<\/script>\s*$/m,
    '',
  );

  return { home, snake, notFound };
};

export const writeRouteDocuments = async (directory = resolve('dist')) => {
  const indexPath = resolve(directory, 'index.html');
  const indexHtml = await readFile(indexPath, 'utf8');
  const documents = generateRouteDocuments(indexHtml);
  await Promise.all([
    writeFile(indexPath, documents.home),
    writeFile(resolve(directory, 'snake.html'), documents.snake),
    writeFile(resolve(directory, '404.html'), documents.notFound),
  ]);
};

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  await writeRouteDocuments();
}

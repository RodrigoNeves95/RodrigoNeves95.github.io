import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('loads the portfolio and navigates to Snake', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Rodrigo Neves | Product Engineer');
  await expect(page.locator('a[href="/resume.pdf"]').first()).toBeVisible();

  await page.getByRole('link', { name: 'Feeling Bored?' }).click();
  await expect(page).toHaveURL(/\/snake$/);
  await expect(page.getByRole('img', { name: 'Snake game board' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('img', { name: 'Snake game board' })).toBeVisible();
});

test('serves route-specific metadata and a real custom 404', async ({ page, request }) => {
  const home = await request.get('/');
  expect(home.status()).toBe(200);

  const snake = await request.get('/snake');
  expect(snake.status()).toBe(200);
  expect(await snake.text()).toContain('<title>Snake | Rodrigo Neves</title>');
  expect(await snake.text()).toContain('rel="canonical" href="https://rnev.es/snake"');

  const missing = await request.get('/definitely-missing');
  const missingHtml = await missing.text();
  expect(missing.status()).toBe(404);
  expect(missingHtml).toContain('<title>Page Not Found | Rodrigo Neves</title>');
  expect(missingHtml).toContain('name="robots" content="noindex, nofollow"');
  expect(missingHtml).not.toContain('rel="canonical"');

  const response = await page.goto('/definitely-missing');
  expect(response?.status()).toBe(404);
  await expect(page.getByText('Page Not Found')).toBeVisible();
});

for (const viewport of [
  { name: 'mobile', width: 320, height: 800 },
  { name: 'desktop', width: 1280, height: 900 },
]) {
  test(`has no serious accessibility violations at ${viewport.name} width`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/');

    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
    expect(
      results.violations.filter(({ impact }) => impact === 'critical' || impact === 'serious'),
    ).toEqual([]);
  });
}

test('plays Snake with touch controls at the minimum viewport', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/snake');

  await page.getByRole('button', { name: 'Start Game' }).click();
  const moveUp = page.getByRole('button', { name: 'Move up' });
  await expect(moveUp).toBeEnabled();
  await moveUp.click();

  const board = page.getByRole('img', { name: /Snake game board/ });
  await expect(board).toBeVisible();
  expect((await board.boundingBox())?.width).toBeLessThanOrEqual(272);
});

for (const route of ['/', '/snake', '/missing-page']) {
  test(`${route} has one heading and a working skip link`, async ({ page }) => {
    await page.goto(route);

    await expect(page.locator('h1')).toHaveCount(1);
    await page.keyboard.press('Tab');
    const skipLink = page.getByRole('link', { name: 'Skip to content' });
    await expect(skipLink).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#content')).toBeFocused();
  });
}

for (const viewport of [
  { name: 'mobile', width: 320, height: 800 },
  { name: 'desktop', width: 1280, height: 900 },
]) {
  test(`licensed fonts do not introduce layout regressions at ${viewport.name} width`, async ({
    page,
  }) => {
    await page.addInitScript(() => {
      let cumulativeLayoutShift = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const shift = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
          if (!shift.hadRecentInput) cumulativeLayoutShift += shift.value;
        }
        document.documentElement.dataset.cumulativeLayoutShift = String(cumulativeLayoutShift);
      }).observe({ type: 'layout-shift', buffered: true });
    });
    await page.setViewportSize(viewport);
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);

    const metrics = await page.evaluate(() => ({
      bodyFont: getComputedStyle(document.body).fontFamily,
      monoFont: getComputedStyle(document.querySelector('nav')!).fontFamily,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      cls: Number(document.documentElement.dataset.cumulativeLayoutShift ?? 0),
    }));
    expect(metrics.bodyFont).toContain('Figtree');
    expect(metrics.monoFont).toContain('IBM Plex Mono');
    expect(metrics.overflow).toBeLessThanOrEqual(0);
    expect(metrics.cls).toBeLessThan(0.1);
  });
}

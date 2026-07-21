import { expect, test } from '@playwright/test';

test('loads the portfolio and navigates to Snake', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Rodrigo Neves | Product Engineer');
  await expect(page.locator('a[href="/resume.pdf"]').first()).toBeVisible();

  await page.getByRole('link', { name: 'Feeling Bored?' }).click();
  await expect(page).toHaveURL(/\/snake$/);
  await expect(page.getByRole('img', { name: 'Snake game board' })).toBeVisible();
});

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

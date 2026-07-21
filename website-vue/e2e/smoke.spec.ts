import { expect, test } from '@playwright/test';

test('loads the portfolio and navigates to Snake', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Rodrigo Neves | Product Engineer');
  await expect(page.locator('a[href="/resume.pdf"]').first()).toBeVisible();

  await page.getByRole('link', { name: 'Feeling Bored?' }).click();
  await expect(page).toHaveURL(/\/snake$/);
  await expect(page.getByRole('img', { name: 'Snake game board' })).toBeVisible();
});

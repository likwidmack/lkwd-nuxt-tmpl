import { expect, test } from '@playwright/test';

test('home page renders house template copy', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'House Nuxt template' })).toBeVisible();
  await expect(page.getByText('lkwd-nuxt-tmpl')).toBeVisible();
});

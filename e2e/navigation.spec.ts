import { test, expect } from '@playwright/test';

test('basic navigation test', async ({ page }) => {
  // Navigate to the home page
  await page.goto('/');

  // Expect to find a heading with "Welcome" text
  await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
});
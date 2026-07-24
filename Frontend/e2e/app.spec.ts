import { expect, test } from '@playwright/test';

test('la aplicación carga correctamente', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/.+/);
  await expect(page.locator('body')).toBeVisible();
});
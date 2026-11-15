// PW-11 negative control: runs only with PW_NEGATIVE_CONTROL=1 (see playwright.config.js).
// It must fail, exit non-zero and leave a local screenshot + trace.
import { expect, test } from '@playwright/test';

test('@negative PW-11 deliberate failure produces non-zero exit and failure artifacts', async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' });
  await expect(page.locator('#pw-e2e-element-that-does-not-exist'), 'intentional failure').toBeVisible({ timeout: 1000 });
});

import { test, expect } from '@playwright/test';

import { waitForFonts } from './utils';

test('take a screenshot', async ({ page }) => {
  await page.goto('/mosaic/test/layouts/detail-highlight');
  await page.waitForFunction(waitForFonts);
  await expect(page).toHaveScreenshot('DetailHighlight Layout.png', {
    fullPage: true
  });
});

import { test, expect } from '@playwright/test';
import MutualFundsTablePage from '../pages/mutualFundsTable.page.js';

test.describe('Local Sort Mutual Funds Leaders', () => {
  let mutualFundsTable;

  test.beforeEach(async ({ page }) => {
    mutualFundsTable = new MutualFundsTablePage(page);
    await mutualFundsTable.open('local-sort');
  });

  test('local sort on lastPrice field', async ({ page }, testInfo) => {
    await test.step('verify NO API call is made when clicking column header', async () => {
      let apiCallMade = false;

      const { apiFundsUrl } = testInfo.project.use;
      page.once('request', (request) => {
        if (request.url().startsWith(apiFundsUrl) && request.method() === 'POST') {
          apiCallMade = true;
        }
      });

      await mutualFundsTable.getColumnHeader('lastPrice').click();
      // There will be no API calls, so we cannot wait for a response - we wait a fixed time to confirm no call is made
      await page.waitForTimeout(1000);

      expect(apiCallMade).toBeFalsy();
    });

    await test.step('verify sort indicator is displayed', async () => {
      const sortIndicator = page.locator('[data-testid="sort-indicator-lastPrice"]');
      // await sortIndicator.waitFor({ state: 'visible', timeout: 10000 });
      await expect(sortIndicator).toBeVisible();
    });

    await test.step('verify sort indicator direction is correct', async () => {
      const sortIndicator = page.locator('[data-testid="sort-indicator-lastPrice"]');
      const direction = await sortIndicator.getAttribute('data-sort-direction');
      expect(direction).toBe('asc');
    });

    await test.step('verify Last Price column is sorted in ascending order', async () => {
      const rows = await mutualFundsTable.fundRows.all();
      const displayedValues = await Promise.all(
        rows.map(async (row) => {
          const cell = row.locator('td[data-testid="lastPrice"]');
          const text = await cell.textContent();
          return parseFloat(text);
          // If sort on Change or % Change columns, need complex check because 0 value is listed as "unch" instead
        })
      );

      const sortedValues = [...displayedValues].sort((a, b) => a - b);
      expect(displayedValues).toEqual(sortedValues);
    });
  });
});

import { test, expect } from '@playwright/test';
import MutualFundsTablePage from '../pages/mutualFundsTable.page.js';

test.describe('Spy API Sort Mutual Funds Leaders', () => {
  let mutualFundsTable;

  test.beforeEach(async ({ page }) => {
    mutualFundsTable = new MutualFundsTablePage(page);
    await mutualFundsTable.open('api-sort');
  });

  test('API sort on lastPrice field', async ({ page }, testInfo) => {
    let requestBody;
    const { apiFundsUrl } = testInfo.project.use;

    await test.step('verify API request has correct orderBy parameter', async () => {
      const requestPromise = page.waitForRequest(
        (request) => request.url().includes(apiFundsUrl) && request.method() === 'POST'
      );

      await mutualFundsTable.getColumnHeader('lastPrice').click();
      const request = await requestPromise;
      requestBody = await request.postDataJSON();
      console.log(requestBody);
      expect(requestBody.orderBy).toBe('lastPrice');
    });

    await test.step('verify API request has correct orderDir parameter', async () => {
      expect(requestBody.orderDir).toBe('asc');
    });

    await test.step('verify sort indicator is displayed', async () => {
      const sortIndicator = page.locator('[data-testid="sort-indicator-lastPrice"]');
      await sortIndicator.waitFor({ state: 'visible', timeout: 10000 });
      await expect(sortIndicator).toBeVisible();
    });

    await test.step('verify sort indicator direction is correct', async () => {
      const sortIndicator = page.locator('[data-testid="sort-indicator-lastPrice"]');
      const direction = await sortIndicator.getAttribute('data-sort-direction');
      expect(direction).toBe('asc');
    });
  });
});

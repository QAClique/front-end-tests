import { test, expect } from '@playwright/test';
import MutualFundsTablePage from '../pages/mutualFundsTable.page.js';

test.describe('Funds Count', () => {
  test('validate funds count', async ({ page }) => {
    const mutualFundsTable = new MutualFundsTablePage(page);

    const responsePromise = page.waitForResponse(
      (response) => response.url().includes('http://localhost:5174/api/funds') && response.request().method() === 'POST'
    );

    await mutualFundsTable.open('api-sort');
    const fundsPerPage = await mutualFundsTable.getNumberOfFunds();

    const response = await responsePromise;
    const apiResponse = await response.json();
    const apiData = apiResponse.data;

    const numOfRows = await mutualFundsTable.getNumberOfFundsDisplayed();

    await test.step('should match the number of displayed funds with the API', async () => {
      expect(numOfRows).toBe(apiData.length);
    });

    await test.step('should be less or equal to the number of funds in the dropdown', async () => {
      expect(numOfRows).toBeLessThanOrEqual(fundsPerPage);
    });
  });
});

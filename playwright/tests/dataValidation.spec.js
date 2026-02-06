import { test, expect } from '@playwright/test';
import MutualFundsTablePage from '../pages/mutualFundsTable.page.js';

['api-sort', 'local-sort'].forEach((pageType) => {
  test.describe(`Data Validation for page ${pageType}`, () => {
    test(`validate data for ${pageType} page`, async ({ page }, testInfo) => {
      const mutualFundsTable = new MutualFundsTablePage(page);

      const { apiFundsUrl } = testInfo.project.use;
      const responsePromise = page.waitForResponse((response) => response.url().startsWith(apiFundsUrl) && response.request().method() === 'POST');

      await mutualFundsTable.open(pageType);

      const response = await responsePromise;
      const apiResponse = await response.json();
      const apiData = apiResponse.data;

      const numOfRows = await mutualFundsTable.getNumberOfFundsDisplayed();
      const randomRow = Math.floor(Math.random() * numOfRows);

      await test.step('should match the number of columns', async () => {
        const columnCount = await mutualFundsTable.columnHeaders.count();
        expect(columnCount).toBe(mutualFundsTable.columnNames.length);
      });

      for (let index = 0; index < mutualFundsTable.columnNames.length; index += 1) {
        const column = mutualFundsTable.columnNames[index];

        await test.step(`should have the ${column} column in the right spot`, async () => {
          const headers = await mutualFundsTable.columnHeaders.all();
          const columnName = await headers[index].textContent();
          expect(columnName).toBe(column);
        });

        await test.step(`should match the ${column} column value with the API data`, async () => {
          const rowValue = await mutualFundsTable.getDataValueForColumnRow(index, randomRow);
          const mapping = mutualFundsTable.columnMappings[index];
          const apiValue = mapping === 'raw.tradeTime' ? mutualFundsTable.formatDate(apiData[randomRow].raw.tradeTime) : apiData[randomRow][mapping];
          expect(rowValue).toBe(apiValue);
        });
      }

      ['Change', '% Change'].forEach((column) => {
        test.step(`should color the value in ${column} correctly`, async () => {
          const index = mutualFundsTable.getColumnIndexByLabel(column);
          const rowValue = await mutualFundsTable.getDataValueForColumnRow(index, randomRow);
          const classValue = await mutualFundsTable.getClassForColumnRow(index, randomRow);
          const hasCorrectClass = parseFloat(rowValue) >= 0 ? classValue.includes('pos') : classValue.includes('neg');
          if (apiData[randomRow][mutualFundsTable.columnMappings[index]] !== 'unch') {
            expect(hasCorrectClass).toBeTruthy();
          }
        });
      });
    });
  });
});

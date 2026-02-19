import { test, expect } from '@playwright/test';
import MutualFundsTablePage from '../pages/mutualFundsTable.page.js';

['api-sort', 'local-sort'].forEach((pageType) => {
  test.describe(`Empty Display Validation for page ${pageType}`, () => {
    test(`should handle empty API response for ${pageType} page`, async ({ page }) => {
      const mutualFundsTable = new MutualFundsTablePage(page);

      await page.route('**/api/funds', (route) => {
        if (route.request().method() === 'POST') {
          route.fulfill({
            status:      200,
            contentType: 'application/json',
            body:        JSON.stringify({
              data: [],
              meta: {
                field: {
                  name: {
                    symbol:         'Symbol',
                    symbolName:     'Name',
                    lastPrice:      'Latest',
                    priceChange:    'Change',
                    percentChange:  '% Change',
                    managedAssets:  'AUM',
                    tradeTime:      'Time',
                    quickLink:      'Quick Link',
                    symbolType:     'Type',
                    exchange:       'Exchange',
                    symbolCurrency: 'Symbol Currency',
                    noteText:       'Note Text'
                  },
                  type: {
                    symbol:         'string',
                    symbolName:     'string',
                    lastPrice:      'price',
                    priceChange:    'priceChange',
                    percentChange:  'percentChange',
                    managedAssets:  'integer',
                    tradeTime:      'time',
                    quickLink:      null,
                    symbolType:     'string',
                    exchange:       'string',
                    symbolCurrency: 'string',
                    noteText:       null
                  },
                  describedBy: {
                    managedAssets: 'Assets Under Management'
                  },
                  display: {
                    symbol:         true,
                    symbolName:     true,
                    lastPrice:      true,
                    priceChange:    true,
                    percentChange:  true,
                    managedAssets:  true,
                    tradeTime:      true,
                    quickLink:      true,
                    symbolType:     false,
                    exchange:       false,
                    symbolCurrency: false,
                    noteText:       false
                  }
                }
              },
              count: 0,
              total: 0
            }),
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          });
        } else {
          route.continue();
        }
      });

      await mutualFundsTable.open(pageType);
      const numOfRows = await mutualFundsTable.getNumberOfFundsDisplayed();

      await test.step('should have 0 data rows displayed on screen', async () => {
        expect(numOfRows).toBe(0);
      });
    });
  });
});

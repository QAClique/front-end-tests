import assert from 'node:assert';
import MutualFundsTables from '../pages/mutualFundsTable.page.js';

['api-sort', 'local-sort'].forEach((page) => {
  describe(`Empty Display Validation for page ${page}`, () => {
    let mock;
    let apiDataLength;
    let numOfRows;

    before(async () => {
      mock = await browser.mock('http://localhost:5174/api/funds', { method: 'post' });
      // Mocking a response with no data rows, to see if the UI will crash or handles it fine
      mock.respond({
        data: [],
        meta: {
          field: {
        name: { symbol: 'Symbol', symbolName: 'Name', lastPrice: 'Last', priceChange: 'Change', percentChange: '% Change', managedAssets: 'AUM', tradeTime: 'Time', quickLink: 'Quick Link', symbolType: 'Type', exchange: 'Exchange', symbolCurrency: 'Symbol Currency', noteText: 'Note Text' },
        type: { symbol: 'string', symbolName: 'string', lastPrice: 'price', priceChange: 'priceChange', percentChange: 'percentChange', managedAssets: 'integer', tradeTime: 'time', quickLink: null, symbolType: 'string', exchange: 'string', symbolCurrency: 'string', noteText: null },
        describedBy: {
          managedAssets: 'Assets Under Management'
        },
        display: { symbol: true, symbolName: true, lastPrice: true, priceChange: true, percentChange: true, managedAssets: true, tradeTime: true, quickLink: true, symbolType: false, exchange: false, symbolCurrency: false, noteText: false }
          }
        },
        count: 0,
        total: 0
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        fetchResponse: false
      });
      await MutualFundsTables.open(page);
      await mock.waitForResponse();
      apiDataLength = mock.calls[0].body.data ? mock.calls[0].body.data.length : 0;
      numOfRows = await MutualFundsTables.getNumberOfFundsDisplayed();
    });

    describe('No Data Rows Test', () => {
      it('should have 0 data rows in API call', async () => {
        assert(apiDataLength === 0, `Expected: API to return 0 data rows but got ${apiDataLength}`);
      });

      it('should have 0 data rows displayed on screen', async () => {
        assert(numOfRows === 0, `Expected: 0 data rows displayed but got ${numOfRows}`);
      });
    });
  });
});

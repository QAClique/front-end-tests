import assert from 'node:assert';
import MutualFundsTables from '../pages/mutualFundsTable.page.js';

describe('Funds Count', () => {
  let mock;
  let fundsPerPage;
  let apiData;
  let numOfRows;

  before(async () => {
    mock = await browser.mock('http://localhost:5174/api/funds', { method: 'post' });
    await MutualFundsTables.open('api-sort');
    fundsPerPage = await MutualFundsTables.getNumberOfFunds();
    await mock.waitForResponse();
    apiData = mock.calls[0].body.data;
    numOfRows = await MutualFundsTables.getNumberOfFundsDisplayed();
  });

  describe('Funds Count', () => {
    it('should match the number of displayed funds with the API', async () => {
      assert(numOfRows === apiData.length, `Expected: table length is ${apiData.length} but was ${numOfRows}`);
    });

    it('should be less or equal to the number of funds in the dropdown', async () => {
      assert(numOfRows <= fundsPerPage, `Expected: table length is less or equal to ${fundsPerPage} but was ${numOfRows}`);
    });
  });
});

import assert from 'node:assert';
import MutualFundsTables from '../pages/mutualFundsTable.page.js';

describe('Spy API Sort Mutual Funds Leaders', () => {
  let requestBody;

  before(async () => {
    await MutualFundsTables.open('api-sort');
  });

  it('should fire API call to sort on "lastPrice" field', async () => {
    const mock = await browser.mock('http://localhost:5174/api/funds', { method: 'post' });
    await MutualFundsTables.getColumnHeader('lastPrice').click();
    // Wait a bit for the request to be captured
    await browser.waitUntil(() => mock.calls.length > 0)
    requestBody = JSON.parse(mock.calls[0].postData);
    console.log(requestBody);
    assert(requestBody.orderBy === 'lastPrice',
      `Expected: API param orderBy to be 'lastPrice', but got ${requestBody.orderBy}`);
  });

  it('should sort ascending in the API request', async () => {
    assert(requestBody.orderDir === 'asc', `Expected: API param orderDir to be 'asc', but got ${requestBody.orderDir}`);
  });
  // The response is also spied, but checking response is an API test!

  it('should display the sort indicator on "Last Price" column', async () => {
    await $('[data-testid="sort-indicator-lastPrice"]')
      .waitForDisplayed({ timeoutMsg: 'Expected: Sort indicator is displayed in the "Last Price" column, but it was not' });
  });

  it('should display the sort indicator in the right direction', async () => {
    const direction = await $('[data-testid="sort-indicator-lastPrice"]').getAttribute('data-sort-direction');
    assert(direction === 'asc', `Expected: Sort direction to be 'asc', but got ${direction}`);
  });
});

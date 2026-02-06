import assert from 'node:assert';
import MutualFundsTables from '../pages/mutualFundsTable.page.js';
import urls from '../config/urls.js';

describe('Local Sort Mutual Funds Leaders', () => {
  before(async () => {
    await MutualFundsTables.open('local-sort');
  });

  it('should NOT fire API call to sort on "lastPrice" field', async () => {
    const mock = await browser.mock(urls.apiFundsUrl, { method: 'post' });
    await MutualFundsTables.getColumnHeader('lastPrice').click();
    // There will be no API calls, so we cannot wait for a response - we wait a fixed time to confirm no call is made
    await browser.pause(1000);
    assert(mock.calls.length === 0, 'Expected: no API call is made but there was');
  });

  it('should display the sort indicator on "Last Price" column', async () => {
    await $('[data-testid="sort-indicator-lastPrice"]')
      .waitForDisplayed({ timeoutMsg: 'Expected: Sort indicator is displayed in the "Last Price" column, but it was not' });
  });

  it('should display the sort indicator in the right direction', async () => {
    const direction = await $('[data-testid="sort-indicator-lastPrice"]').getAttribute('data-sort-direction');
    assert(direction === 'asc', `Expected sort direction to be 'asc', but got ${direction}`);
  });

  it('should sort the "Last Price" column in ascending order', async () => {
    const displayedValues = await MutualFundsTables.fundRows.map(async (row) => {
      const cell = await row.$('td[data-testid="lastPrice"]');
      const text = await cell.getText();
      return parseFloat(text);
      // If sort on Change or % Change columns, need complex check because 0 value is listed as "unch" instead
    });

    const sortedValues = [...displayedValues].sort((a, b) => a - b);
    assert.deepStrictEqual(displayedValues, sortedValues, 'Expected: "Last Price" column values are sorted in ascending order, but they were not');
  });
});

import assert from 'node:assert';

describe('Spy Sort Mutual Funds Leaders', () => {
  let requestBody;

  before(async () => {
    await browser.url("");
    // Wait for the data loading spinner to go away
    await $("div.loading-overlay > div.spinner").waitForDisplayed({reverse: true});
  });

  it('should fire API call to sort on "lastPrice" field', async () => {
    const mock = await browser.mock('http://localhost:5174/api/funds', { method: 'post' });
    await $('th[data-testId="lastPrice"]').click();
    // Wait a bit for the request to be captured
    await browser.pause(500);
    requestBody = JSON.parse(mock.calls[0].postData);
    console.log(requestBody);
    assert(requestBody.orderBy === 'lastPrice',
      `Expected orderBy to be 'lastPrice', but got ${requestBody.orderBy}`);
  });

  it('should sort ascending in the API request', async () => {
    assert(requestBody.orderDir === 'asc', `Expected orderDir to be 'asc', but got ${requestBody.orderDir}`);
  });
  // The response is also spied, but since checking response is an API test, we will do nothing with it here

  it('should display the sort indicator on "Last Price" column', async () => {
    await $('[data-testid="sort-indicator-lastPrice"]')
      .waitForDisplayed({timeoutMsg: 'Expected: Sort indicator is displayed in the "Last Price" column, but it was not'});
  });

  it('should display the sort indicator in the right direction', async () => {
    const direction = await $('[data-testid="sort-indicator-lastPrice"]').getAttribute('data-sort-direction');
    assert(direction === 'asc', `Expected sort direction to be 'asc', but got ${direction}`);
  });
});

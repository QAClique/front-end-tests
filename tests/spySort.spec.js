import assert from 'node:assert';

describe('Spy Sort Mutual Funds Market Leaders', () => {
  before(async () => {
    await browser.url("");
    // Wait for the data loading spinner to go away
    await $("div.loading-overlay > div.spinner").waitForDisplayed({reverse: true});
  });

  it('should sort on "Last Price" column', async () => {
    const mock = await browser.mock('http://localhost:5174/api/funds', { method: 'post' });
    // Click on the 'Last Price' column header to sort the table
    await $('th[data-testId="lastPrice"]').click();
    // Wait a bit for the request to be captured
    await browser.pause(500);
    // Show the request body
    const requestBody = JSON.parse(mock.calls[0].postData);
    console.log(requestBody);
    assert(requestBody.orderBy === 'lastPrice', `Expected orderBy to be 'lastPrice', but got ${requestBody.orderBy}`);
    // The response is also spied, but since checking response is an API test, we will do nothing with it here
  });
});

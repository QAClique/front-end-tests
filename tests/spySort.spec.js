describe("Spy Sort Mutual Funds Market Leaders page on Globe And Mail website", () => {
  before(async () => {
    await browser.url("https://www.theglobeandmail.com/investing/markets/funds/market-leaders");
  });

  it("should sort on 'Last' column", async () => {
    const mock = await browser.mock("https://globeandmail.pl.barchart.com/module/dataTable.json", { method: "post" });
    // Click on the 'Last' column header to sort the table
    await $("th[field='lastPrice']").click();
    await browser.pause(1000);
    // Show the request body
    console.log(JSON.parse(mock.calls[0].postData));
    // The response is also spied, but since checking response is an API test, we will do nothing with it here
  });
});

describe("Sort Mutual Funds Market Leaders page on Globe And Mail website", () => {
  before(async () => {
    await browser.url("https://www.theglobeandmail.com/investing/markets/funds/market-leaders");
    // Clear the adblocker popup if present
    const adblockerCloseButton = await $("button=Continue without supporting this time");
    await browser.pause(2500);
    if (await adblockerCloseButton.isDisplayed()) {
      await adblockerCloseButton.click();
    }
  });

  it("should sort on 'Last' column", async () => {
    const mock = await browser.mock("https://globeandmail.pl.barchart.com/module/dataTable.json", { method: "post" });
    // Click on the 'Last' column header to sort the table
    await $("th[field='lastPrice']").click();
    await browser.pause(1000);
    // Show the request body
    console.log(JSON.parse(mock.calls[0].postData));
    // Show the response body
    console.log(mock.calls[0].body);
  });
});

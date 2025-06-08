describe("Spy sort of Mutual Funds Market page on Globe And Mail website", () => {
  before(async () => {
    await browser.url("https://www.theglobeandmail.com/investing/markets/funds");
  });

  it("should sort on 'Last' column", async () => {
    const mock = await browser.mock("https://globeandmail.pl.barchart.com/module/dataTable.json", { method: "post" });
    // Click on the 'Last' column header to sort the table
    await $("th[field='lastPrice']").click();
    await browser.pause(1000);
    // Show the spied calls - there will be none as the sorting was done by the UI, not the API
    console.log("Spied API calls:");
    console.log(mock.calls);
  });
});

export default class Page {
  constructor(page) {
    this.page = page;
  }

  getSpinner() { return this.page.locator('div.loading-overlay > div.spinner'); }

  /**
   * Opens the specified page
   *
   * @param path to open
   */
  async open(path = '') {
    await this.page.setViewportSize({ width: 1440, height: 1024 });
    await this.page.goto(path);
  }

}

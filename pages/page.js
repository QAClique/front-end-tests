export default class Page {
  get spinner() { return $('div.loading-overlay > div.spinner'); }

  /**
   * Opens the specified page
   *
   * @param path to open
   */
  async open(path = '') {
    await browser.setWindowSize(1440, 1024);
    await browser.url(path);
  }
}

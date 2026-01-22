class MutualFundsTablePage {
  columnNames = ['Symbol', 'Name', 'Last Price', 'Change', '% Change', 'AUM', 'Trade Time'];
  columnMappings = [];

  constructor(page) {
    this.page = page;
  }

  get getSpinner()         { return this.page.locator('div.loading-overlay > div.spinner'); }
  get numberOfFundsField() { return this.page.locator('[data-testid="number-of-funds-select"]'); }
  get headerRow()          { return this.page.locator('thead > tr'); }
  get columnHeaders()      { return this.page.locator('thead > tr > th'); }
  get fundRows()           { return this.page.locator('tbody > tr'); }

  /**
   * Opens the mutual funds table page
   *
   * @param {string} path - The path to the page
   */
  async open(path) {
    await this.page.setViewportSize({ width: 1440, height: 1024 });
    await this.page.goto(path);
    await this.getSpinner.waitFor({ state: 'hidden' });
    const headers = await this.columnHeaders.all();
    this.columnMappings = await Promise.all(
      headers.map((el) => el.getAttribute('data-testid'))
    );
  }

  /**
   * Gets the column header element by name for further actions
   *
   * @param {string} name of the column header
   * @returns {Playwright.Locator} column header element
   */
  getColumnHeader(name) {
    return this.page.locator(`th[data-testid="${name}"]`);
  }

  /**
   * Gets all the column header names
   *
   * @returns {string[]} the column header names
   */
  async getColumnHeaderNames() {
    const headers = await this.columnHeaders.all();
    return Promise.all(headers.map((el) => el.textContent()));
  }

  /**
   * Gets the number of funds selected in the dropdown
   *
   * @returns {number} the number of funds selected in the dropdown
   */
  async getNumberOfFunds() {
    const numFunds = await this.numberOfFundsField.inputValue();
    return parseInt(numFunds, 10);
  }

  /**
   * Gets the number of fund rows displayed in the table
   *
   * @returns {number} the number of fund rows displayed in the table
   */
  async getNumberOfFundsDisplayed() {
    return this.fundRows.count();
  }

  /**
   * Gets the data value for a specific column and row (by using index)
   *
   * @param {number} index of the column value
   * @param {number} row of the value
   * @returns {string} the data value for the specified column and row
   */
  async getDataValueForColumnRow(index, row) {
    const rows = await this.fundRows.all();
    const cells = await rows[row].locator('td').all();
    return cells[index].textContent();
  }

  /**
   * Gets the class attribute for a specific column and row (by using index values for columns)
   *
   * @param {number} index of the column
   * @param {number} row number
   * @returns {string} the class attribute for the specified column and row
   */
  async getClassForColumnRow(index, row) {
    const rows = await this.fundRows.all();
    const cells = await rows[row].locator('td').all();
    return cells[index].getAttribute('class');
  }

  /**
   * Get the index value of a column by its label
   *
   * @param {string} label (name) of the column
   * @returns {number} the index of the column
   */
  getColumnIndexByLabel(label) {
    return this.columnNames.findIndex((column) => column === label);
  }

  /**
   * Formats a raw date (in seconds since epoch) to YYYY-MM-DD format
   *
   * @param {number} rawDate in seconds since epoch
   * @returns {string} formatted date in YYYY-MM-DD format
   */
  formatDate(rawDate) {
    const date = new Date(rawDate * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

export default MutualFundsTablePage;

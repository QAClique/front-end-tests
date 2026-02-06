class MutualFundsTablePage {
  get spinner()            { return $('div.loading-overlay > div.spinner'); }
  get numberOfFundsField() { return $('[data-testid="number-of-funds-select"]'); }
  get headerRow()          { return $('thead > tr'); }
  get columnHeaders()      { return $$('thead > tr > th'); }
  get fundRows()           { return $$('tbody > tr'); }

  columnNames = ['Symbol', 'Name', 'Last Price', 'Change', '% Change', 'AUM', 'Trade Time'];
  columnMappings = [];

  /**
   * Opens the mutual funds table page
   *
   * @param {string} path - The path to the page
   */
  async open(path) {
    await browser.setWindowSize(1440, 1024);
    await browser.url(path);
    await this.spinner.waitForDisplayed({ reverse: true });
    this.columnMappings = await this.columnHeaders.map(async (el) => el.getAttribute('data-testid'));
  }

  /**
   * Gets the column header element by name for further actions
   *
   * @param {string} name of the column header
   * @returns {WebdriverIO.Element} column header element
   */
  getColumnHeader(name) {
    return $(`th[data-testid="${name}"]`);
  }

  /**
   * Gets all the column header names
   *
   * @returns {string[]} the column header names
   */
  async getColumnHeaderNames() {
    return this.columnHeaders.map(async (el) => el.getText());
  }

  /**
   * Gets the number of funds selected in the dropdown
   *
   * @returns {number} the number of funds selected in the dropdown
   */
  async getNumberOfFunds() {
    const numFunds = await this.numberOfFundsField.getValue();
    return parseInt(numFunds, 10);
  }

  /**
   * Gets the number of fund rows displayed in the table
   *
   * @returns {number} the number of fund rows displayed in the table
   */
  async getNumberOfFundsDisplayed() {
    return this.fundRows.length;
  }

  /**
   * Gets the data value for a specific column and row (by using index)
   *
   * @param {number} index of the column value
   * @param {number} row of the value
   * @returns {string} the data value for the specified column and row
   */
  async getDataValueForColumnRow(index, row) {
    return this.fundRows[row].$$('td')[index].getText();
  }

  /**
   * Gets the class attribute for a specific column and row (by using index values for columns)
   *
   * @param {number} index of the column
   * @param {number} row number
   * @returns {string} the class attribute for the specified column and row
   */
  async getClassForColumnRow(index, row) {
    return this.fundRows[row].$$('td')[index].getAttribute('class');
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

export default new MutualFundsTablePage();

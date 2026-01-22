import Page from './page.js';

class MutualFundsTablePage extends Page {
  columnNames = ['Symbol', 'Name', 'Last Price', 'Change', '% Change', 'AUM', 'Trade Time'];
  columnMappings = [];

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
    await super.open(path);
    await this.getSpinner().waitFor({ state: 'hidden' });
    const headers = await this.columnHeaders.all();
    this.columnMappings = await Promise.all(
      headers.map((el) => el.getAttribute('data-testid'))
    );
  }

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

  async getClassForColumnRow(index, row) {
    const rows = await this.fundRows.all();
    const cells = await rows[row].locator('td').all();
    return cells[index].getAttribute('class');
  }

  getColumnIndexByLabel(label) {
    return this.columnNames.findIndex((column) => column === label);
  }

  formatDate(rawDate) {
    const date = new Date(rawDate * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

export default MutualFundsTablePage;

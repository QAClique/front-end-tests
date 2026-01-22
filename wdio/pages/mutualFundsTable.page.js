import Page from './page.js';

class MutualFundsTablePage extends Page {
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
    await super.open(path);
    await this.spinner.waitForDisplayed({ reverse: true });
    this.columnMappings = await this.columnHeaders.map(async (el) => el.getAttribute('data-testid'));
  }

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

  async getClassForColumnRow(index, row) {
    return this.fundRows[row].$$('td')[index].getAttribute('class');
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

export default new MutualFundsTablePage();

import assert from 'node:assert';
import MutualFundsTables from '../pages/mutualFundsTable.page.js';

['api-sort', 'local-sort'].forEach((page) => {
  describe(`Data Validation for page ${page}`, () => {
    let mock;
    let apiData;
    let numOfRows;
    let randomRow;

    before(async () => {
      mock = await browser.mock('http://localhost:5174/api/funds', { method: 'post' });
      await MutualFundsTables.open(page);
      await mock.waitForResponse();
      apiData = mock.calls[0].body.data;
      numOfRows = await MutualFundsTables.getNumberOfFundsDisplayed();
      randomRow = Math.floor(Math.random() * numOfRows);
    });

    describe('Data Validation', () => {
      it('should match the number of columns', async () => {
        const columnCount = await MutualFundsTables.columnHeaders.length;
        assert(columnCount === MutualFundsTables.columnNames.length,
          `Expected: Number of columns is ${MutualFundsTables.columnNames.length} but was ${columnCount}`);
      });

      MutualFundsTables.columnNames.forEach((column, index) => {
        it(`should have the ${column} column in the right spot`, async () => {
          const columnName = await MutualFundsTables.columnHeaders[index].getText();
          assert(columnName === column, `Expected: column '${column}' is in the right spot, but found '${columnName}' instead`);
        });

        it(`should match the ${column} column value with the API data`, async () => {
          const rowValue = await MutualFundsTables.getDataValueForColumnRow(index, randomRow);
          const mapping = MutualFundsTables.columnMappings[index];
          const apiValue = mapping === 'raw.tradeTime' ? MutualFundsTables.formatDate(apiData[randomRow].raw.tradeTime) : apiData[randomRow][mapping];
          assert(rowValue === apiValue,
            `Expected: Value for '${column}' column in row ${randomRow} is '${apiValue}' but was '${rowValue}'`);
        });
      });

      ['Change', '% Change'].forEach((column) => {
        it(`should color the value in ${column} correctly`, async () => {
          const index = MutualFundsTables.getColumnIndexByLabel(column);
          const rowValue = await MutualFundsTables.getDataValueForColumnRow(index, randomRow);
          const classValue = await MutualFundsTables.getClassForColumnRow(index, randomRow);
          const result = parseFloat(rowValue) >= 0 ? classValue.includes('pos') : classValue.includes('neg');
          if (apiData[randomRow][MutualFundsTables.columnMappings[index]] !== 'unch') {
            assert(result, `Expected: Color formatting for '${column}' column in row ${randomRow} is correct but was not.`);
          }
        });
      });
    });
  });
});

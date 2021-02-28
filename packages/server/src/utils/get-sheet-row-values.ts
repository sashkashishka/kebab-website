import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import qs from 'query-string';
// import { safeParse } from './json';

export const getSheetRowValues = (row: GoogleSpreadsheetRow): { [key: string]: string | number } => Object.keys(row)
  .filter((key) => key.indexOf('_') !== 0)
  .reduce((acc, key) => {
    // acc[key] = safeParse(row[key]) || row[key];
    const val = row[key];
    acc[key] = val?.indexOf && val.indexOf('?') === 0
      ? qs.parse(val, { arrayFormat: 'comma' })
      : val;

    return acc;
  }, {});

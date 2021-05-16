const { google } = require('googleapis');
const spreadsheetId = require('../private/spreadsheet');

/**
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 * @param {Array} data the data that has been formatted to be able to write to sheet
 */
module.exports = (auth, data) => {
  // let data = returnFormattedOdds(odds);
  let valueInputOption = 'RAW';
  let resource = {
    data,
    valueInputOption,
  }

  const sheets = google.sheets({version: 'v4', auth});
    // sheets.spreadsheets.values.update(request);
    // sheets.spreadsheets.values.update(returnFormattedOdds(odds));
    sheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      resource,
    }, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('%d cells updated. ', result);
      }
    });
}
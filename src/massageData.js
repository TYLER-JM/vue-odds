const games = require ('../games.json');
const odds = require ('../odds.json');
const spreadsheetId = require('../private/spreadsheet');
const { google } = require('googleapis');

/**
 * 
 * get some odds out, and structure them into something that can be printed to google sheets
 * 1. three way
 * 2. over/under
 * 3. Asian Handicap (1.5) spread
 * 
 * games is an array of objects
 * each object is a game, which team information
 * odds is just one event with many odds from many bookkeepers
 */
const massageData = (data) => {
  let massagedData = [
    ['Bookmaker'],
    ['Visitor'],
    ['Home']
  ]

  data.response[0].bookmakers.forEach(bookmaker => {
    massagedData[0].push(bookmaker.name);
    bookmaker.bets.forEach(bet => {
      if (bet.name === 'Home/Away') {
        massagedData[1].push(bet.value[1].odd)
        massagedData[2].push(bet.value[0].odd)
      }
    });
    // console.log(bookmaker.bets[0].name);
  });
  return massagedData;
};

// massageData(odds);

/**
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
module.exports = (auth) => {
  let range = 'new!A1';
  let values = massageData(odds);
  let resource = {
    values,
  };
  let valueInputOption = 'RAW';

  let request = {
    spreadsheetId,
    range,
    valueInputOption,
    resource,
  }

  const sheets = google.sheets({version: 'v4', auth});
  try {
    sheets.spreadsheets.values.update(request);
  } catch (error) {
    console.log(error);
  }
}
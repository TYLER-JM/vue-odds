const games = require ('../games.json');
const odds = require ('../odds.json');
const spreadsheetId = require('../private/spreadsheet');
const { google } = require('googleapis');

/**
 * 
 * get some odds out, and structure them into something that can be printed to google sheets
 */
const returnFormattedOdds = (data) => {
  let moneylines = [
    ['Bookmaker', 'Moneyline'],
    ['Visitor'],
    ['Home']
  ]
  let threeWay = [
    ['Bookmaker', '3 Way'],
    ['Visitor'],
    ['Draw'],
    ['Home']
  ]

  moneylines[1].push(data.response[0].game.teams.away.name);
  moneylines[2].push(data.response[0].game.teams.home.name);

  threeWay[1].push(data.response[0].game.teams.away.name);
  threeWay[2].push('---');
  threeWay[3].push(data.response[0].game.teams.home.name);

  data.response[0].bookmakers.forEach(bookmaker => {
    moneylines[0].push(bookmaker.name);
    threeWay[0].push(bookmaker.name);
    bookmaker.bets.forEach(bet => {
      if (bet.name === 'Home/Away') {
        moneylines[1].push(bet.value[1].odd)
        moneylines[2].push(bet.value[0].odd)
      } else if (bet.name === '3Way Result') {
        threeWay[1].push(bet.value[2].odd)
        threeWay[2].push(bet.value[1].odd)
        threeWay[3].push(bet.value[0].odd)
      }
    });
  });
  const spreadsheetData = [];
  spreadsheetData.push({range: 'new!A1', values: moneylines});
  spreadsheetData.push({range: 'new!A5', values: threeWay});

  
  

  // let range = 'new!A1';
  // let values = massagedData;
  // let resource = {
  //   values,
  // };
  // let valueInputOption = 'RAW';

  // let request = {
  //   spreadsheetId,
  //   range,
  //   valueInputOption,
  //   resource,
  // }

  // return request;
  return spreadsheetData;
};


/**
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
module.exports = (auth) => {
  let data = returnFormattedOdds(odds);
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
        console.log('%d cells updated. ', result.totatUpdatedCells);
      }
    });
}
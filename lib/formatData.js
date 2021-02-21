const BetTypes = require('./BetTypes.js');
/**
 * 
 * @param {Object} data the odds object returned by the API
 * @param {Object} selections made by the user {type: '', total: '', spread: ''}
 */
module.exports = (data, selections) => {

  BetTypes[selections.type].setData({teams: data.response[0].game.teams, selections})

  data.response[0].bookmakers.forEach(bookmaker => {
    BetTypes[selections.type].setHeaderRow(bookmaker.name);

    bookmaker.bets.forEach(bet => {
      if (bet.name === selections.type) {
        BetTypes[selections.type].setData({bet, selections})
      } 
    });
  });
  const spreadsheetData = [];
  // spreadsheetData.push({range: 'new!A1', values: moneylines});
  // spreadsheetData.push({range: 'new!A5', values: threeWay});

  spreadsheetData.push({
    range: BetTypes[selections.type].range,
    values: BetTypes[selections.type].data
  })
  
  
/**
 * below used for non-batch writing to google sheets
 */
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
const BetTypes = require('./BetTypes.js');
const Game = require('./Game.js');
/**
 * 
 * @param {Object} data the odds object returned by the API (for now a single game's odds)
 * @param {Object} selections made by the user {league: '', game: '', bet: ''}
 */
module.exports = (data, selections) => {
  //TODO: make the data more dynamic, based on the selections.bet
  //TODO: make the range dynamic, would need to add this during selections
  let game = new Game({
    name: selections.bet,
    range: 'new!A1',
    indexAway: (data.teams.indexOf(data.home_team) === 1 ? 0 : 1),
    indexHome: data.teams.indexOf(data.home_team),
    data: [
      [selections.bet, 'Bookmaker:'],
      ['Visitor'],
      ['Home']
    ],
  })
  /* 
   * just pass in data: game.setMoneyline(data); 
   */
  switch (selections.bet) {
    case 'h2h':
      game.setMoneyline(data);      
      break;
    case 'totals':
      game.setTotals(data);
      break;
    case 'spreads':
      game.setSpreads(data);
      break;
    default:
      break;
  }

  
  const spreadsheetData = [];

  spreadsheetData.push({
    // range: BetTypes[selections.type].range,
    // values: BetTypes[selections.type].data
    range: game.range,
    values: game.data
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
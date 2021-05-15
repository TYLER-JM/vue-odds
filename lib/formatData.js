const BetTypes = require('./BetTypes.js');
/**
 * 
 * @param {Object} data the odds object returned by the API (for now a single game's odds)
 * @param {Object} selections made by the user {league: '', game: '', type: ''}
 */
module.exports = (data, selections) => {
  let awayTeam = (data.teams.indexOf(data.home_team) == 1) ? data.teams[0] : data.teams[1];
  let teams = [awayTeam, data.home_team]
  BetTypes[selections.type].setData({teams, selections})

  // data.response[0].bookmakers.forEach(bookmaker => {
  data.sites.forEach(site => {
    BetTypes[selections.type].setHeaderRow(site.site_nice);

    //HERE WE ARE, I GUESS tRY IT OUT
    BetTypes[selections.type].setData({odd: site.odds, selections})
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
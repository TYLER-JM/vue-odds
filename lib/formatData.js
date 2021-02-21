const BetTypes = {
  '3Way Result': {
    name: '3Way Result',
    range: 'new!A5',
    data: [
      ['Bookmaker', '3 Way'],
      ['Visitor'],
      ['Draw'],
      ['Home']
    ],
    get getRange() {
      return this.range;
    },
    get getData() {
      return this.data;
    },
    set setHeaderRow(bookmaker) {
      this.data[0].push(bookmaker);
    },
    set setData(input) {
      if (input.teams) {
        this.data[1].push(input.teams.away.name);
        this.data[2].push('---');
        this.data[3].push(input.teams.home.name);
      } else {
          this.data[1].push(input.bet.value[2].odd);
          this.data[2].push(input.bet.value[1].odd);
          this.data[3].push(input.bet.value[0].odd);
      }
    }
  },
  'Home/Away': {
    name: 'Home/Away',
    range: 'new!A1',
    data: [
      ['Bookmaker', 'Moneyline'],
      ['Visitor'],
      ['Home']
    ],
    get getRange() {
      return this.range;
    },
    get getData() {
      return this.data;
    },
    set setHeaderRow() {
      this.data[0].push(bookmaker);
    },
    set setData(input) {
      //populate the array with odds results
    }
  },
  'Over/Under': {},
  'Asian/Handicap': {},
}
/**
 * 
 * @param {Object} data the odds object returned by the API
 * @param {Object} selections made by the user {type: '', total: '', spread: ''}
 */
module.exports = (data, selections) => {

  // moneylines[1].push(data.response[0].game.teams.away.name);
  // moneylines[2].push(data.response[0].game.teams.home.name);

  BetTypes[selections.type].setData = {teams: data.response[0].game.teams, selections}

  data.response[0].bookmakers.forEach(bookmaker => {
    BetTypes[selections.type].setHeaderRow = bookmaker.name;

    bookmaker.bets.forEach(bet => {
      if (bet.name === selections.type) {
        // moneylines[1].push(bet.value[1].odd)
        // moneylines[2].push(bet.value[0].odd)
        BetTypes[selections.type].setData = {bet, selections}
      } 
    });
  });
  const spreadsheetData = [];
  // spreadsheetData.push({range: 'new!A1', values: moneylines});
  // spreadsheetData.push({range: 'new!A5', values: threeWay});

  spreadsheetData.push({
    range: BetTypes[selections.type].getRange,
    values: BetTypes[selections.type].getData
  })
  
  

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
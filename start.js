const readline = require('readline');
const _ = require('./lib/index');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const selections = {
  league: null,
  game: null,
  type: null,
};

const options = {
  '1': 'Moneyline',
  '2': 'Total',
  '3': 'Spread', 
};
const leagues = {
  '1': 'icehockey_nhl',
  '2': 'basketball_nba',
  '3': 'americanfootball_nfl',
  '4': 'baseball_mlb',
}

getValue = function(value) {
  rl.question(`Choose a ${value}  value:\n`, (answer) => {
    selections[value] = answer;
    endTransmission();
  });
}
endTransmission = async function() {
  console.log('retrieving and writing odds...', selections);

  // call _.api to get a list of games for today
  // call _.api to return odds info
  // call _.formatData to return the data to write
  // call _.write to write to the spreadsheet

  // let data = await _.api();
  let data = _.api.tempSpreadOdds[1];
  let formattedData = _.formatData(data, selections);
  _.writeToSheet(_.returnAuth(), formattedData);
  rl.close()
}

// TODO: first we need to allow selection of a sport, then a game
rl.question("Select a Bet Type (1,2, 3, or 4):\n 1. Moneyline\n 2. Total\n 3. Spread\n", (answer) => {
  selections.type = options[answer];
    endTransmission();    
})
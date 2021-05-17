const readline = require('readline');
const _ = require('./lib/index');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const selections = {
  league: null,
  game: null,
  bet: null,
};

const options = {
  '1': 'h2h',
  '2': 'totals',
  '3': 'spreads', 
};
const leagues = {
  '1': 'icehockey_nhl',
  '2': 'basketball_nba',
  '3': 'americanfootball_nfl',
  '4': 'baseball_mlb',
}

// TODO: first we need to allow selection of a sport, then a game
rl.question('Select a League (1, 2, 3, or 4):\n 1. NHL\n2. NBA\n3. NFL\n4. MLB\n', (answer) => {
  selections.league = leagues[answer];
    getBetSelection();    
})

getBetSelection = function() {
  rl.question('Select a Bet Type (1,2, or 3):\n 1. Moneyline\n 2. Total\n 3. Spread\n', (answer) => {
    selections.bet = options[answer];
    getGameSelection();
  });
}

getGameSelection = function() {
  rl.question('hey', (answer) => {

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
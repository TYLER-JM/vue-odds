const readline = require('readline');
const _ = require('./lib/index');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let api = new _.Api();

const selections = {
  sport: null,
  game: null,
  bet: null,
  region: 'us',
};

const options = {
  '1': 'h2h',
  '2': 'totals',
  '3': 'spreads', 
};
const sports = {
  '1': 'icehockey_nhl',
  '2': 'basketball_nba',
  '3': 'americanfootball_nfl',
  '4': 'baseball_mlb',
}

rl.question('Select a League (1, 2, 3, or 4):\n1. NHL\n2. NBA\n3. NFL\n4. MLB\n', (answer) => {
  selections.sport = sports[answer];
  getBetSelection();    
})

getBetSelection = function() {
  rl.question('Select a Bet Type (1,2, or 3):\n 1. Moneyline\n 2. Total\n 3. Spread\n', (answer) => {
    selections.bet = options[answer];

    // let wait = Promise.resolve(api.setTempEvents()); //this is where we will call the api
    let wait = Promise.resolve(api.getOdds({
      sport: selections.sport,
      region: selections.region,
      mkt: selections.bet
    })); //this is where we will call the api
    wait.then(() => {
      getGameSelection(api.getEventList());
    })

  });
}

getGameSelection = function(question) {
  rl.question(question, (answer) => {
    selections.game = answer;
    endTransmission(answer);
  });
}
endTransmission = async function(index) {
  console.log('retrieving and writing odds...', selections);

  // get api event 
  // call _.formatData to return the data to write
  // call _.write to write to the spreadsheet

  let data = api.events[index-1];
  let formattedData = _.formatData(data, selections);
  _.writeToSheet(_.returnAuth(), formattedData);
  rl.close()
}
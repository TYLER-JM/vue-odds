const readline = require('readline');
const _ = require('./lib/index');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const selections = {
  type: null,
  total: null,
  spread: null,
};

/** Possible options existing in the odds data returned from API
 * 'Handicap Result'
 * 'Asian Handicap'
 */
const options = {
  '1': '3Way Result',
  '2': 'Home/Away', // Moneyline
  '3': 'Over/Under', //Total
  '4': 'Asian Handicap', //Spread
};

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

  let data = await _.api();
  let formattedData = _.formatData(data, selections);
  _.writeToSheet(_.returnAuth(), formattedData);
  rl.close()
}

rl.question("Select a Bet Type (1,2, 3, or 4):\n 1. 3-way\n 2. Moneyline\n 3. Total\n 4. Spread\n", (answer) => {
  selections.type = options[answer];
  if (answer == 3) {
    getValue('total');
  } else if (answer == 4) {
    getValue('spread');
  } else {
    endTransmission();
  }
    
})
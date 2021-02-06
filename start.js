const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const selections = {
  type: null,
  total: null,
  spread: null,
};

const options = {
  '1': 'Moneyline',
  '2': 'Total',
  '3': 'Spread',
};

getValue = function(value) {
  rl.question(`Chose a ${value}  value:\n`, (answer) => {
    selections[value] = answer;
    endTransmission();
  });
}
endTransmission = function() {
  console.log('retrieving and writing odds...', selections);
  rl.close()
}

rl.question("Select a Bet Type (1,2, or 3):\n 1. Moneyline\n 2. Total\n 3. Spread\n", (answer) => {
  selections.type = options[answer];
  if (answer == 2) {
    getValue('total');
  } else if (answer == 3) {
    getValue('spread');
  } else {
    endTransmission();
  }
    
})
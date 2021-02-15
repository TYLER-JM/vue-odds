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
  '1': '3-Way',
  '2': 'Moneyline',
  '3': 'Total',
  '4': 'Spread',
};

getValue = function(value) {
  rl.question(`Choose a ${value}  value:\n`, (answer) => {
    selections[value] = answer;
    endTransmission();
  });
}
endTransmission = function() {
  console.log('retrieving and writing odds...', selections);
  rl.close()
}

rl.question("Select a Bet Type (1,2, 3, or 4):\n 1. 3-way\n 2. Moneyline\n 3. Total\n 4. Spread\n 4. Spread\n", (answer) => {
  selections.type = options[answer];
  if (answer == 2) {
    getValue('total');
  } else if (answer == 3) {
    getValue('spread');
  } else {
    endTransmission();
  }
    
})
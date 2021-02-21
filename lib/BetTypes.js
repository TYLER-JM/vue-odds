const BetType = function(props) {
  this.name = props.name,
  this.range = props.range,
  this.data = props.data,
  this.setHeaderRow = function(bookmaker) {
    this.data[0].push(bookmaker);
  },
  this.setData = props.setData;
}

let threeWay = new BetType({
  name: '3Way Result',
  range: 'new!A5',
  data: [
    ['3 Way', 'Bookmaker:'],
    ['Visitor'],
    ['Draw'],
    ['Home']
  ],
  setData: function(input) {
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
});
let moneyline = new BetType({
  name: 'Home/Away',
  range: 'new!A1',
  data: [
    ['Moneyline', 'Bookmaker:'],
    ['Visitor'],
    ['Home']
  ],
  setData: function(input) {
    if (input.teams) {
      this.data[1].push(input.teams.away.name);
      this.data[2].push(input.teams.home.name);
    } else {
      this.data[1].push(input.bet.value[1].odd)
      this.data[2].push(input.bet.value[0].odd)
    }
  }
})
let total = new BetType({
  name: 'Over/Under',
  range: 'new!A10',
  data: [
    ['Bookmaker:'],
    ['Over'],
    ['Under']
  ],
  setData: function(input) {
    if (input.teams) {
      names = `${input.teams.away.name}@${input.teams.home.name}`;
      this.data[0].unshift(names)
      this.data[1].push(input.selections.total);
      this.data[2].push(input.selections.total);
    } else {
      input.bet.value.forEach(value => {
        let qualityValue = value.value.split(' '); //ie: ['over', '3.5']
        if (qualityValue[1] === input.selections.total) {
          switch (qualityValue[0]) {
            case 'Over':
              this.data[1].push(value.odd);
              break;
            case 'Under':
              this.data[2].push(value.odd);
              break;
            default:
              break;
          }
        }
      });
    }
  }
})

/**
 * property names match strings used by the API
 * values will be populated by new objects created by BetType constructor
 */
const BetTypes = {
  '3Way Result': threeWay,
  'Home/Away': moneyline,
  'Over/Under': total,
  'Asian/Handicap': null,
}

module.exports = BetTypes;
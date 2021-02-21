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
    ['Bookmaker', '3 Way'],
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
    ['Bookmaker', 'Moneyline'],
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

/**
 * property names match strings used by the API
 * values will be populated by new objects created by BetType constructor
 */
const BetTypes = {
  '3Way Result': threeWay,
  'Home/Away': moneyline,
  'Over/Under': null,
  'Asian/Handicap': null,
}

module.exports = BetTypes;
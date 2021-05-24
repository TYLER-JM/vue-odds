const axios = require('axios');
const fs = require('fs');
const apiHeaders = require('../private/api_headers.json');
const api_key = apiHeaders.api_key;

//temporarily will simply return this data so as not to overuse the api
const tempSports = require ('../sports.json');
const tempOdds = require ('../odds.json');
const tempTotalOdds = require ('../total_odds.json');
const tempSpreadOdds = require ('../spread_odds.json');
// module.exports = {
class Api {
  constructor() {
    this.getLeagues = async () => {
      let response = await axios.get('https://api.the-odds-api.com/v3/sports', {
        params: {
          api_key
        }
      });
      this.leagues = response.data.data
      return response.data.data
      // this.printToJSON('sports.json', response.data.data)
    },
    this.getOdds = async ({sport, region, mkt}) => {
      let response = await axios.get('https://api.the-odds-api.com/v3/odds', {
        params: {
          api_key,
          sport,
          region, // uk | us | eu | au
          mkt // h2h | spreads | totals
        }
      })
      this.events = response.data.data;
      return response.data.data
      // this.printToJSON('spread_odds.json', response.data.data);
    },
    this.printToJSON = () => {
      fs.writeFile(file, JSON.stringify(data), (err) => {
        if (err) console.log(err);
        console.log(`results stored to ${file}`);
      });
    },
    this.getEventList = () => {
      let str = 'Please select a game...\n';
      let list =  this.events.map((event, i) => {
        let awayIndex = event.teams.indexOf(event.home_team) === 1 ? 0 : 1;
        return {
          home_team: event.home_team,
          away_team: event.teams[awayIndex],
          index: i + 1
        }
      });
      
      list.forEach((item) => {
        str += `${item.index}: ${item.away_team} @ ${item.home_team}\n`
      });
      return str;
    },
    this.events = [],
    this.leagues = [],
    this.setTempEvents = () => {
      this.events = tempSpreadOdds;
      return true;
    }
  }
}

module.exports = Api;


  
  
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
      // return response.data.data
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
      // return response.data.data
      // this.printToJSON('spread_odds.json', response.data.data);
    },
    this.printToJSON = () => {
      fs.writeFile(file, JSON.stringify(data), (err) => {
        if (err) console.log(err);
        console.log(`results stored to ${file}`);
      });
    },
    this.getEventList = () => {
      /**
       * foreach this.events
       * get the team names,
       * and return them in a format that can be console logged
       */
    },
    this.events = [],
    this.leagues = [],
    this.setTempEvents = () => {
      this.events = tempSpreadOdds;
    }
  }
}

module.exports = Api;


  
  
const axios = require('axios');
const fs = require('fs');
const apiHeaders = require('../private/api_headers.json');
const api_key = apiHeaders.api_key;

//temporarily will simply return this data so as not to overuse the api
const tempSports = require ('../sports.json');
const tempOdds = require ('../odds.json');
const tempTotalOdds = require ('../total_odds.json');

/**
 * NHL league id = 57
 */

async function getLeagues() {
  let response = await axios.get('https://api.the-odds-api.com/v3/sports', {
    params: {
      api_key
    }
  });
  return response.data.data
  // printToJSON('sports.json', response.data.data)
}

// sport: icehockey_nhl
async function getOdds({sport, region, mkt}) {
  let response = await axios.get('https://api.the-odds-api.com/v3/odds', {
    params: {
      api_key,
      sport,
      region, // uk | us | eu | au
      mkt // h2h | spreads | totals
    }
  })

  // return response.data.data
  printToJSON('spread_odds.json', response.data.data);
}

function printToJSON(file, data) {

  fs.writeFile(file, JSON.stringify(data), (err) => {
    if (err) console.log(err);
    console.log(`results stored to ${file}`);
  });
}
getOdds({sport: 'icehockey_nhl', region: 'us', mkt: 'spreads'});
module.exports = {
  tempSports,
  tempOdds,
  tempTotalOdds,
  getLeagues,
  getOdds
}

  
  
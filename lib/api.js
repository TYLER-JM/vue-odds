const axios = require('axios');
const fs = require('fs');
const apiHeaders = require('../private/api_headers.json');

//temporarily will simply return this data so as not to overuse the api
const tempOdds = require ('../odds.json');


/**
 * NHL league id = 57
 */
async function getOdds() {
  let timezones = {
    method: 'GET',
    url: 'https://api-hockey.p.rapidapi.com/timezone',
    headers: apiHeaders
  }
  let leagues = {
    method: 'GET', 
    url: 'https://api-hockey.p.rapidapi.com/leagues/',
    headers: apiHeaders,
    params: {
      name: 'nhl',
    }
  };
  let games = {
    method: 'GET',
    'headers': apiHeaders,
    url: 'https://api-hockey.p.rapidapi.com/games/',
    params: {
      date: '2021-02-02', //get current date
      league: 57, //nhl
      season: 2020, //current season
      timezone: 'America/Halifax'
    }
  };
  let odds = {
    method: 'GET',
    'headers': apiHeaders,
    url: 'https://api-hockey.p.rapidapi.com/odds/',
    params: {
      league: 57,
      season: 2020,
      // game: 109391
      game: 110041
    }
  }
  // let response = await axios(odds);
  
  
  // let RESULTS_PATH = 'odds.json';
  
  // fs.writeFile(RESULTS_PATH, JSON.stringify(response.data), (err) => {
  //   if (err) console.log(err);
  //   console.log(`results stored to ${RESULTS_PATH}`);
  // });
  
  
  return tempOdds;
  // return response.data
};

module.exports = getOdds;
// getOdds().catch((e) => {console.log('BAD ERROR', e)});
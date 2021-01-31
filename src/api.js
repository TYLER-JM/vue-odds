const axios = require('axios');
const fs = require('fs');
const apiHeaders = require('../private/api_headers.json');
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
      date: '2021-01-31', //get current date
      league: 57, //nhl
      season: 2020, //current season
      timezone: 'America/Halifax'
    }
  }

  let response = await axios(games);
  let RESULTS_PATH = 'results.json';

  fs.writeFile(RESULTS_PATH, JSON.stringify(response.data), (err) => {
    if (err) console.log(err);
    console.log(`results stored to ${RESULTS_PATH}`);
  });


};

getOdds().catch((e) => {console.log('BAD ERROR', e)});
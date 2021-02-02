const results = require ('../games.json');

/**
 * 
 * get some odds out, and structure them into something that can be printed to google sheets
 * 1. three way
 * 2. over/under
 * 3. Asian Handicap (1.5) spread
 * 
 * response is an array of objects
 * each object is a game, which team information
 */
const massageData = (data) => {
  console.log(data.response[0]);
  // data = JSON.parse(results);
  // console.log(data);
};

massageData(results);
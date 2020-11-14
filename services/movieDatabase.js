const axios = require('axios').default;
const key = require('../credentials/rapidApiKey');

let options = {
  method: 'GET',
  url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
  params: {s: 'search', page: '1', r: 'json'},
  headers: {
    'x-rapidapi-key': key,
    'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
  }
};

async function getMovies() {
    try {
        let res = await axios.request(options)
        return res.data
    }
    catch (err) {
        console.error(error);
    }
};


module.exports = {
    options: options,
    getMovies: getMovies
};
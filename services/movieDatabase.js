const axios = require('axios').default;
const key = require('../credentials/rapidApiKey');

let optionsAll = {
  method: 'GET',
  url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
  params: {s: 'search', page: '1', r: 'json'},
  headers: {
    'x-rapidapi-key': key,
    'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
  }
};

let optionsSingle = {
  method: 'GET',
  url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
  params: {i: 'imdbID', r: 'json'},
  headers: {
    'x-rapidapi-key': key,
    'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
  }
};

async function getMovies() {
    try {
        let res = await axios.request(optionsAll)
        return res.data
    }
    catch (err) {
        console.error(error);
    }
};

async function getMovieDetail() {
    try {
        let res = await axios.request(optionsSingle)
        return res.data
    }
    catch (err) {
        console.error("error");
    }
};


module.exports = {
    optionsAll: optionsAll,
    optionsSingle: optionsSingle,
    getMovies: getMovies,
    getMovieDetail: getMovieDetail
};
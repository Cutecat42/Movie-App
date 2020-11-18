const axios = require('axios').default;
const key = require('../credentials/omdbKey');

const imdbCode = {
    i : ''
};

async function getPoster() {
    try {
        let res = await axios.request(`http://www.omdbapi.com/?apikey=${key}&i=${imdbCode.i}`);
        return res.data.Poster
    }
    catch (err) {
        console.error(error);
    }
};

module.exports = {
    getPoster : getPoster,
    imdbCode : imdbCode
};
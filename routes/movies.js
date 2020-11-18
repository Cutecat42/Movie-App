const express = require('express');
const router = new express.Router();
const ExpressError = require('../services/expressError');
const {optionsAll, getMovies} = require('../services/movieDatabase');
const {optionsSingle, getMovieDetail} = require('../services/movieDatabase');
const {getPoster, imdbCode} = require('../services/omdb');
const {getRating} = require('../database/movieDB');


router.get('/', (req,res,next) => {
    res.render('index')
});

router.post('/', async (req,res,next) => {  
    try {
        optionsAll.params['s'] = req.body.search; 
        search = req.body.search;   
        const movies = await getMovies();
        if (movies.Response == 'False') {
            const notFoundError = new ExpressError("Nothing Found. Try searching for something else.", 404);
            return next(notFoundError)
        };
        res.render('movie', { movies : movies, search : search })
    }  
    catch (err) {
        return next(err)
    }
});

router.get('/:imdbID', async (req,res,next) => {   
    try {
        const rating = await getRating(req.params.imdbID);

        optionsSingle.params['i'] = req.params.imdbID;
        const movie = await getMovieDetail();
        if (movie.Response == 'False') {
            const notFoundError = new ExpressError("Movie Not Found. Try searching for something else.", 404);
            return next(notFoundError)
        };
        imdbCode.i = String(req.params.imdbID);
        const poster = await getPoster();

        res.render('movieDetail', { movie : movie, rating : rating , poster : poster})
    } 
    catch (err) {
        return next(err)
    }
});


module.exports = router;
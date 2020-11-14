const express = require('express');
const router = new express.Router();
const ExpressError = require('../services/expressError');
const {optionsAll, getMovies} = require('../services/movieDatabase');
const {optionsSingle, getMovieDetail} = require('../services/movieDatabase');


router.get('/', (req,res,next) => {
    res.render('index')
});

router.post('/', async (req,res,next) => {  
    try {
        optionsAll.params['s'] = req.body.search    
        movies = await getMovies()
        if (movies.Response == 'False') {
            const notFoundError = new ExpressError("Nothing Found. Try searching for something else.", 404);
        return next(notFoundError)
        }
        res.render('movie', { movies : movies })
    }  
    catch (err) {
        return next(err)
    }
});

router.get('/:imdbID', async (req,res,next) => {   
    try {
        optionsSingle.params['i'] = req.params.imdbID
        movie = await getMovieDetail()
        if (movie.Response == 'False') {
            const notFoundError = new ExpressError("Movie Not Found. Try searching for something else.", 404);
        return next(notFoundError)
        }
        res.render('movieDetail', { movie : movie })
    } 
    catch (err) {
        return next(err)
    }
});








module.exports = router;
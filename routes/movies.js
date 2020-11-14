const express = require('express');
const router = new express.Router();
const ExpressError = require('../services/expressError')
const {options, getMovies} = require('../services/movieDatabase')


router.get('/', (req,res,next) => {
    res.render('index')
})

router.post('/search', async (req,res,next) => {    
    options.params['s'] = req.body.search    
    movies = await getMovies()
    res.render('movie', { movies : movies })
})








module.exports = router;
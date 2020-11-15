const express = require('express');
const router = new express.Router();
const ExpressError = require('../services/expressError');
const {addThumbsUp, addThumbsDown} = require('../database/movieDB');

router.post('/up', async (req,res,next) => {
    try {
        await addThumbsUp(req.body.imdbID)
        return res.redirect(`/${req.body.imdbID}`)
    }
    catch (err) {
        return next(err)
    }
});

router.post('/down', async (req,res,next) => {
    try {
        await addThumbsDown(req.body.imdbID)
        return res.redirect(`/${req.body.imdbID}`)
    }
    catch (err) {
        return next(err)
    }
});


module.exports = router;
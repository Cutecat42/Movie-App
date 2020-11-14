const express = require('express');
const router = new express.Router();
const ExpressError = require('../services/expressError');
const {addThumbsUp, addThumbsDown} = require('../database/movieDB');

router.post('/up', async (req,res,next) => {
    await addThumbsUp(req.body.imdbID)
    return res.redirect(`/${req.body.imdbID}`);
});

router.post('/down', async (req,res,next) => {
    await addThumbsDown(req.body.imdbID)
    return res.redirect(`/${req.body.imdbID}`);
});


module.exports = router;
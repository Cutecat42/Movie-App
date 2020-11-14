const express = require('express');
const router = new express.Router();
const ExpressError = require('../services/expressError');

router.post('/up', (req,res,next) => {
    console.log(req.body)
    res.send('up')
    // return res.redirect('/');
});

router.post('/down', (req,res,next) => {
    console.log(req.body)
    res.send('down')
    // return res.redirect('/');
});


module.exports = router;
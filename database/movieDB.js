const db = require("./db");
const ExpressError = require("../services/expressError")

async function getRating(imdbID) {
    try {
        const rating = await db.query(
            `SELECT * 
            FROM movies
            WHERE imdbid=$1`, [imdbID]
        );
        return rating.rows
        
    }
    catch {
        const err = new ExpressError("Error with retrieving from database.", 400);
        return {    
            error: err.message,
            status: err.status};
    }   
};

async function addThumbsUp(imdbID) {
    try {
        const rating = await db.query(
            `INSERT INTO movies                                                     
            VALUES ($1, 1, 0);`, [imdbID]
        );
        return rating.rows
        
    }
    catch {
        let update = await getRating(imdbID);
        update = Number(update[0]['thumbs_up']) + 1
        console.log(update)
        const rating = await db.query(
            `UPDATE movies                                                     
            SET thumbs_up=$1`, [update]
        );
        return rating.rows
    }   
};

async function addThumbsDown(imdbID) {
    try {
        const rating = await db.query(
            `INSERT INTO movies                                                     
            VALUES ($1, 0, 1);`, [imdbID]
        );
        return rating.rows
        
    }
    catch {
        let update = await getRating(imdbID);
        update = Number(update[0]['thumbs_down']) + 1
        console.log(update)
        const rating = await db.query(
            `UPDATE movies                                                     
            SET thumbs_down=$1`, [update]
        );
        return rating.rows
    }   
};

module.exports = {
    getRating : getRating,
    addThumbsUp : addThumbsUp,
    addThumbsDown : addThumbsDown
};



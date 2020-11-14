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
}

module.exports = getRating;



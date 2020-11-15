const app = require('../app');
const db = require("../database/db");
const {getRating} = require('../database/movieDB');

const request = require("supertest");


beforeAll(done => {
    done();
  });
  
  afterAll(done => {
    db.end();
    done();
  });


async function deleteUp() {
    let update = await getRating('tt4154796');
    update = Number(update[0]['thumbs_up']) - 1;
    const rating = await db.query(
        `UPDATE movies                                                     
        SET thumbs_up=$1
        WHERE imdbID=$2`, [update, 'tt4154796']
    );
    return rating.rows           
};
async function deleteDown() {
    let update = await getRating('tt4154796');
    update = Number(update[0]['thumbs_down']) - 1;
    const rating = await db.query(
        `UPDATE movies                                                     
        SET thumbs_down=$1
        WHERE imdbID=$2`, [update, 'tt4154796']
    );
    return rating.rows           
};


describe('Rating saving to database', function () {
    test('Thumbs_up route/database works', async () => {
        const res = await request(app)
        .post('/ratings/up')
        .send({
            imdbID : 'tt4154796'
        })
        .expect('Content-Type', /text/)
        .expect(302);
        await deleteUp()
    });
    test('Thumbs_down/database route works', async () => {
        const res = await request(app)
        .post('/ratings/down')
        .send({
            imdbID : 'tt4154796'
        })
        .expect('Content-Type', /text/)
        .expect(302);
        await deleteDown()
    });
});


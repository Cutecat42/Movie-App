const app = require('../app');
const db = require("../database/db");
const {optionsAll, optionsSingle} = require('../services/movieDatabase');

const request = require("supertest");


beforeAll(done => {
    done();
  });
  
  afterAll(done => {
    db.end();
    done();
  });

describe('All movies and Specific movie details', function () {
    test('Index route works', async () => {
        const res = await request(app)
        .get('/')
        .expect("Content-Type", /html/)
        .expect(200)
    });
    test('Index post route works', async () => {
        const res = await request(app)
        .post('/')
        .send({
            search : 'spiderman'
        })
        .expect("Content-Type", /html/)
        .expect(200)
    });
    test('Index post route error without passing in search string', async () => {
        const res = await request(app)
        .post('/')
        .expect("Content-Type", /json/)
        .then((res) => {
            expect(res.body).toMatchObject({
                error: {
                message: 'Nothing Found. Try searching for something else.',
                status: 404
                }
            })
        });
    });
    test('Movie detail route works', async () => {
        const res = await request(app)
        .get('/tt4154796')
        .send({
            imdbID : 'tt4154796'
        })
        .expect("Content-Type", /html/)
        .expect(200)
    });
});
const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');

beforeEach(() => { return seed(testData); });

afterAll(() => connection.end());


describe('/api', () => {
    test('GET - status: 200 - response with OK status message', () => {
        return request(app)
          .get('/api')
          .expect(200)
          .then((response) => {
            expect(response.body).toEqual({ msg: 'It\'s all good man' });
          });
    });
    test('GET - status: 200 - returns all topics', () => {
    return request(app)
        .get('/api/topics')
        .expect(200)
        .then((response) => {
            expect(response.body.topics.length).toBe(3);
            expect(response.body.topics[0]).toHaveProperty('slug');
            expect(response.body.topics[0]).toHaveProperty('description');
        });
    });
    test('GET - status: 404 - response with not-found status message', () => {
        return request(app)
          .get('/api/blablabla')
          .expect(404)
          .then((response) => {
            expect(response.body).toEqual({ msg: 'Error! Please check endpoint and try again' });
          });
    });
});
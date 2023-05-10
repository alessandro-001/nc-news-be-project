const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');
const endpoints = require('../endpoints.json');


beforeEach(() => { return seed(testData) });

afterAll(() => connection.end());


describe('/api', () => {
    test('GET - status: 200 - returns all topics', () => {
        return request(app)
            .get('/api/topics')
            .expect(200)
            .then((response) => {
                console.log(response.body);
                expect(response.body.topics.length).toBe(3);
                response.body.topics.forEach((topic) => {
                  expect(topic).toHaveProperty("description");
                  expect(topic).toHaveProperty("slug");
                  expect(typeof topic).toBe("object");
                });
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

describe('/api', () => {
    test('GET /api should return JSON with available endpoints', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((response) => {
          expect(typeof response.body.result).toBe('object');
          expect(response.body.result).toHaveProperty('GET /api');
          expect(response.body.result).toHaveProperty('GET /api/topics');
          expect(response.body.result).toHaveProperty('GET /api/articles');
        });
      });      
});

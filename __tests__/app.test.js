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

describe.only('/api/articles/:article_id ', () => {
    test('GET - status: 200 - get articles by id', () => {
        return request(app)
          .get('/api/articles/1')
          .expect(200)
          .then((response) => {
            expect(response.body.article.author).toBe('butter_bridge');
            expect(response.body.article.title).toBe('Living in the shadow of a great man');
            expect(response.body.article.topic).toBe('mitch');
            expect(response.body.article.body).toBe('I find this existence challenging');
            expect(response.body.article.created_at).toBe('2020-07-09T20:11:00.000Z');
            expect(response.body.article.votes).toBe(100);
            expect(response.body.article.article_img_url).toBe('https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700');
        })
    });
    test('GET - status: 404 - response with existent id type but is not existent', () => {
        return request(app)
          .get('/api/articles/1234567890')
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe('Error! Please check endpoint and try again');
          });
    });
    test('GET - status: 404 - response with existent id type but is not existent', () => {
        return request(app)
          .get('/api/articles/blablabla')
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe('Error! Please check endpoint and try again');
          });
    });
});

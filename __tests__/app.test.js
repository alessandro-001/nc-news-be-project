// Requires //
const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');

// Jest Setup //
beforeEach(() => { return seed(testData) });
afterAll(() => connection.end());


// GET Tests //
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

describe('/api/articles/:article_id ', () => {
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

describe('/api/articles', () => {
  test('GET - status: 200 - get all the articles (without body), sorted in DESC order', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then((response) => {
        response.body.articles.forEach((article) => {
          expect(typeof article).toBe('object');
          expect(article).toHaveProperty('article_id');
          expect(article).toHaveProperty('title');
          expect(article).toHaveProperty('topic');
          expect(article).toHaveProperty('author');
          expect(article).toHaveProperty('created_at');
          expect(article).toHaveProperty('votes');
          expect(article).toHaveProperty('article_img_url');
          expect(article).toHaveProperty('comment_count');
          expect(article).not.toHaveProperty('body');
        })
        expect(response.body.articles).toBeSorted('created_at', { descending: true });
      })
  });
});

describe('/api/articles/:article_id/comments', () => {
  test('GET - status 200 - should return a comment including the valid id', () => {
      return request(app)
      .get('/api/articles/9/comments')
      .expect(200)
      .then((res) => {
          res.body.comments.forEach((comment) => {
              expect(comment).toEqual(
                  expect.objectContaining({
                      comment_id: expect.any(Number),
                      article_id: expect.any(Number),
                      votes: expect.any(Number),
                      author: expect.any(String),
                      body: expect.any(String),
                      created_at: expect.any(String)
                  })
              )
          });
      });
  });
  test('GET - 400 - should return an error message when invalid path given', () => {
      return request(app)
      .get('/api/articles/nonsense/comments')
      .expect(400)
      .then((res) => {
          expect(res.body.msg).toBe('Error! Please check endpoint and try again');
      });
  });
  test('GET - 404 - should return error message when id is not found', () => {
      return request(app)
      .get('/api/articles/123456789/comments')
      .expect(404)
      .then((res) => {
          expect(res.body.msg).toBe('Please insert valid id');
      });
  });
});

// POST Tests //
describe("POST /api/articles/:article_id/comments", () => {
  test("POST - status: 201 - Returns status 201 and posted comment object", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "butter_bridge",
        body: "Thank you for posting",
      })
      .expect(201)
      .then((response) => {
        expect(response.body.commentPosted[0]).toEqual(
          expect.objectContaining({
            article_id: expect.any(Number),
            author: expect.any(String),
            body: expect.any(String),
            comment_id: expect.any(Number),
            created_at: expect.any(String),
            votes: expect.any(Number),
          })
        );
      });
  });
  test("POST - status: 400 - error message when missing the body", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "butter_bridge",
      })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("body data required");
      });
  });
  test("POST - status: 400 - error message when missing the author", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        body: "Thank you for posting",
      })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("author data required");
      });
  });
  test("POST - status: 404 - error message when username not found", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "alessandroF",
        body: "Thank you for posting"
      })
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request");
      });
  });
  test("POST - status: 404 - error message when article doen't exist", () => {
    return request(app)
      .post("/api/articles/123456789/comments")
      .send({
        username: "butter_bridge",
        body: "Thank you for posting"
      })
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request");
      });
  });
  test("POST - status: 201 - posted comment object with no extra properties", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "butter_bridge",
        body: "Thank you for posting",
        nonsense: "Testing value",
      })
      .expect(201)
      .then((response) => {
        expect(response.body.commentPosted).not.toHaveProperty("nonsense");
      });
  });
});

// PATCH Tests //
describe('/api/articles/:article_id', () => {
  test("PATCH - status: 200 - returns status code 200 and updated object", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 1 })
      .expect(200)
      .then((response) => {
        expect(response.body.fetchUpdateArticle.votes).toBe(101);
      });
  });
  test("PATCH - status: 200 - it works with larger integers", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 300 })
      .expect(200)
      .then((response) => {
        expect(response.body.fetchUpdateArticle.votes).toBe(400);
      });
  });
  test("PATCH - status: 404 - with error message", () => {
    return request(app)
      .patch("/api/articles/123456789")
      .send({ inc_votes: 1 })
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Article not existant");
      });
  });
  test("PATCH - status: 400 - error message if the article_id is not a number", () => {
    return request(app)
      .patch("/api/articles/nonsense")
      .send({ inc_votes: 1 })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Error! Please check endpoint and try again");
      });
  });
  test("PATCH - status: 400 - error message if inc_votes is not a number", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: "Incorrect data type" })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Incorrect data type");
      });
  });
});

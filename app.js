const express = require('express');
const app = express();
const { 
    getTopics,
    getApi,
    getArticlesById,
    getArticles,
    getComments
 } = require('./controllers/news.controller');


app.get('/api/topics', getTopics);
 
app.get('/api', getApi);

app.get('/api/articles/:articles_id', getArticlesById);

app.get('/api/articles', getArticles);

app.get("/api/articles/:article_id/comments", getComments);


app.all('*', (req, res) => {
    res.status(404).send({ msg: 'Error! Please check endpoint and try again' })
});

app.use ((err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({ msg: 'Error! Please check endpoint and try again' });
      }
      next(err);
});

app.use((err, req, res, next) => {
    if(err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg })
    }
});

app.use((err, req, res, next) => {
    if (err.code === "23503" && err.detail.includes("(article_id)")) {
      res.status(404).send({ msg: "Article not found" });
    }
    next(err);
  });



module.exports = app;



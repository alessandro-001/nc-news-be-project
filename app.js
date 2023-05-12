const express = require('express');
const app = express();
const { 
    getTopics,
    getApi,
    getArticlesById,
    getArticles
 } = require('./controllers/news.controller');


app.get('/api/topics', getTopics);
 
app.get('/api', getApi);

app.get('/api/articles/:articles_id', getArticlesById);

app.get('/api/articles', getArticles);



app.all('*', (req, res) => {
    res.status(404).send({ msg: 'Error! Please check endpoint and try again' })
});

app.use ((err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({ msg: 'Error! Please check endpoint and try again' });
      }
      next(err);
})

app.use((err, req, res, next) => {
    if(err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg })
    }
})



module.exports = app;



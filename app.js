const express = require('express');
const app = express();
const { 
    getStatus,
    getTopics
 } = require('./controllers/news.controller');


app.get('/api/', getStatus);

app.get('/api/topics', getTopics);

app.all('*', (req, res) => {
    res.status(404).send({ msg: 'Error! Please check endpoint and try again' })
});

module.exports = app;



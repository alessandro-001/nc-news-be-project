const express = require('express');
const app = express();
const { 
    getTopics,
    getApi
 } = require('./controllers/news.controller');


app.get('/api/topics', getTopics);
 
app.get('/api', getApi);


app.all('*', (req, res) => {
    res.status(404).send({ msg: 'Error! Please check endpoint and try again' })
});

app.use((err, req, res, next) => {
    if(err.status && err.msg) {
        response.status(err.status).send({ msg: err.msg })
    }
})

module.exports = app;



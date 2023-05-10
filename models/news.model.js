const connection = require('../db/connection');
const fs = require('fs/promises');

exports.fetchTopics = () => {
    return connection.query('SELECT * FROM topics;').then((result) => {
        return result.rows;
    });
}

exports.fetchApi = () => {
    return fs.readFile('./endpoints.json', 'utf-8', (err, data) => {
        return data;
    })
    .then((data) => {
        return JSON.parse(data);
    });
}
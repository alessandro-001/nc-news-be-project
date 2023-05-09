const connection = require('../db/connection');

exports.fetchTopics = () => {
    //console.log("in models")
    return connection.query('SELECT * FROM topics;').then((result) => {
        return result.rows;
    })
}
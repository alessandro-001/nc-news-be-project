const connection = require('../db/connection');
const fs = require('fs/promises');

exports.fetchTopics = () => {
    return connection.query('SELECT * FROM topics;')
    .then((result) => {
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

exports.fetchArticlesId = (id) => {
    return connection.query('SELECT * FROM articles WHERE article_id = $1;', [id])
    .then((result) => {
        if (result.rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Error! Please check endpoint and try again' })
        }
        return result.rows[0];
    });
}

exports.fetchArticles = () => {
    return connection.query(`
    SELECT 
    articles.author, 
    articles.title, 
    articles.article_id, 
    articles.topic, 
    articles.created_at, 
    articles.votes, 
    articles.article_img_url,

    COUNT(*)::INT AS comment_count
    FROM articles

    JOIN comments ON comments.article_id = articles.article_id

    GROUP BY articles.article_id

    ORDER BY articles.created_at DESC;
    `)
    .then((result) => {
      return result.rows;
    });
  };

  exports.fetchComments = (id) => {
    return connection.query(`
    SELECT *
    FROM comments
    WHERE article_id = $1
    ORDER BY created_at DESC;
    `,
     [id])
    .then((result) => {
        if(result.rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Please insert valid id' });
        }
        return result.rows;
    })
};

exports.fetchNewComment = (id, author, commentBody) => {
    const queryArr = [author, commentBody, id];
    let queryStr = `
    INSERT INTO comments
    (author, body, article_id)
    VALUES
    ($1, $2, $3)
    RETURNING *;
    `;
    if (!author) {
      return Promise.reject({ status: 400, msg: "author data required" });
    }
    if (!commentBody) {
      return Promise.reject({ status: 400, msg: "body data required" });
    }
    return connection.query(queryStr, queryArr).then((res) => {
    return res.rows;
    });
};

exports.fetchUpdateArticle = (id, votesIncrement) => {
    let selectQuery = `
        UPDATE articles
        SET votes = votes + $1
        WHERE article_id = $2
        RETURNING *;
        `;
        console.log(typeof votesIncrement);
    if (typeof votesIncrement !== "number") {
      return Promise.reject({ status: 400, msg: "Incorrect data type" });
    }
    return connection.query(selectQuery, [votesIncrement, id]).then((res) => {
        console.log(res.rows);
        if (res.rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Article not existant" });
        }
      return res.rows[0];
    });
};
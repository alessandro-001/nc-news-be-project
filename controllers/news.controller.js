const {
    fetchTopics, 
    fetchApi, 
    fetchArticlesId,
    fetchArticles,
    fetchComments,
    fetchNewComment,
    fetchUpdateArticle
} = require('../models/news.model')


exports.getTopics = (req, res, next) => {
    fetchTopics().then((topics) => {
        res.status(200).send({ topics });
    })
    .catch((err) => {
        next(err)
    })
}

exports.getApi = (req, res, next) => {
    fetchApi().then((result) => {
        res.status(200).send({ result });
    })
    .catch((err) => {
        next(err);
    })
}

exports.getArticlesById = (req, res, next) => {
    const id = req.params.articles_id;
    fetchArticlesId(id).then((article) => {
        res.status(200).send({ article });
    }).catch((err) => {
        next(err);
    })
}

exports.getArticles = (req, res, next) => {
    fetchArticles().then((articles) => {
        res.status(200).send({ articles });
    }).catch((err) => {
        next(err);
    })
}

exports.getComments = (req, res, next) => {
    const artId = req.params.article_id
    fetchComments(artId)
    .then((comments) => {
        res.status(200).send({ comments })
    })
    .catch((err) => {
        next(err);
    });
};

exports.postComments = (req, res, next) => {
    const id = req.params.article_id;
    const author = req.body.username;
    const commentBody = req.body.body;
    fetchNewComment(id, author, commentBody).then((result) => {
      return res.status(201).send({ commentPosted: result })
    }).catch((err) => {
      next(err)
    })
  };

exports.patchArticlesId = (req, res, next) => {
const id = req.params.article_id;
const votesIncr = req.body.inc_votes;
console.log(id, votesIncr);
fetchUpdateArticle(id, votesIncr)
    .then((result) => {
    res.status(200).send({ fetchUpdateArticle: result });
    })
    .catch((err) => {
    console.log(err)
    next(err);
    });
};
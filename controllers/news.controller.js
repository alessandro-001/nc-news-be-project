const {
    fetchTopics, 
    fetchApi, 
    fetchArticlesId
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
    //console.log(id);
    fetchArticlesId(id).then((article) => {
        res.status(200).send({ article });
    }).catch((err) => {
        next(err);
    })
}
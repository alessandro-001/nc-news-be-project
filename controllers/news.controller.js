const {fetchTopics, fetchApi} = require('../models/news.model')


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
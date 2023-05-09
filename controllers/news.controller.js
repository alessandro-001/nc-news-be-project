const {fetchTopics} = require('../models/news.model')


exports.getStatus = (req, res) => {
    res.status(200).send({ msg: 'It\'s all good man' });
};

exports.getTopics = (req, res, next) => {
    fetchTopics().then((topics) => {
        res.status(200).send({ topics });
    })
}
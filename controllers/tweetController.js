const Tweets = require('../models/Tweets');
const { validationResult } = require('express-validator');
const { findById } = require('../models/Tweets');

exports.createTweet = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    try {
        const data = { userId: req.user._id, message: req.body.message };
        const tweet = new Tweets(data);
        await tweet.save();

        res.sendStatus(201);
    } catch (error) {
        res.status(500).json({ msg: 'Se ha producido un error. Por favor, inténtelo más tarde.' });
    }
}

exports.deleteTweet = (req, res) => {
    Tweets.findById(req.params.tweetId).exec((err, tweet) => {
        if (err) {
            return res.status(400).json({ msg: 'ID no válido.' });
        }

        if (!tweet) {
            return res.status(400).json({ msg: 'Tweet no existe.' });
        }

        if (String(req.user._id) !== String(tweet.userId)) {
            return res.status(401).json({ msg: 'Acción no permitida.' });
        }

        Tweets.findByIdAndRemove(tweet._id, err => {
            if (err) {
                return res.status(500).json({ msg: 'Se ha producido un error. Por favor, inténtelo más tarde.' });
            }

            res.sendStatus(200);
        })
    });
}
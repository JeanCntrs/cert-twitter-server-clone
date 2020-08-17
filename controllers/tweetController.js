const Tweets = require('../models/Tweets');
const { validationResult } = require('express-validator');

exports.createTweet = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    try {
        const data = { userID: req.user._id, message: req.body.message };
        const tweet = new Tweets(data);
        await tweet.save();

        res.sendStatus(201);
    } catch (error) {
        res.status(500).json({ msg: 'Se ha producido un error. Por favor, inténtelo más tarde.' });
    }
}
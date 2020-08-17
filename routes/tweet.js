const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const tweetController = require('../controllers/tweetController');
const { check } = require('express-validator');

router.post('/tweet/create',
    auth,
    [
        check('message', 'El mensaje es obligatorio.').not().isEmpty()
    ],
    tweetController.createTweet
);

module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userController = require('../controllers/userController');

router.put('/user',
    auth,
    userController.updateUser
);

module.exports = router;
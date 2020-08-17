const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const fileController = require('../controllers/fileController');

router.post('/file/avatar/upload',
    auth,
    fileController.uploadAvatar
);

router.post('/file/banner/upload',
    auth,
    fileController.uploadBanner
);

module.exports = router;
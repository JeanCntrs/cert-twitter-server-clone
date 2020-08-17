const Users = require('../models/Users');
const multer = require('multer');

exports.uploadAvatar = (req, res) => {
    const storageConfig = multer.diskStorage({
        destination: (req, filename, cb) => {
            cb(null, __dirname + '/../uploads/avatars');
        },
        filename: (req, file, cb) => {
            const fileExtension = file.originalname.substring(file.originalname.lastIndexOf('.'));

            cb(null, `${req.user._id}${fileExtension}`);
        }
    });

    const filterConfig = (req, file, cb) => {
        const { mimetype } = file;
        const typeArray = mimetype.split('/');

        if (typeArray[0] != 'image') {
            return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", file), false);
        }

        cb(null, true);
    }

    const upload = multer({
        storage: storageConfig,
        fileFilter: filterConfig,
        limits: { fileSize: 1024 * 1024 * 5 }
    }).single('avatar');

    upload(req, res, async error => {
        if (error) {
            return res.status(400).json({ error });
        }

        const user = await Users.findOne({ email: req.user.email });
        user.avatar = req.file.filename
        await user.save();

        res.sendStatus(201);
    });
}

exports.uploadBanner = (req, res) => {
    const storageConfig = multer.diskStorage({
        destination: (req, filename, cb) => {
            cb(null, __dirname + '/../uploads/banners');
        },
        filename: (req, file, cb) => {
            const fileExtension = file.originalname.substring(file.originalname.lastIndexOf('.'));

            cb(null, `${req.user._id}${fileExtension}`);
        }
    });

    const filterConfig = (req, file, cb) => {
        const { mimetype } = file;
        const typeArray = mimetype.split('/');

        if (typeArray[0] != 'image') {
            return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", file), false);
        }

        cb(null, true);
    }

    const upload = multer({
        storage: storageConfig,
        fileFilter: filterConfig,
        limits: { fileSize: 1024 * 1024 * 5 }
    }).single('banner');

    upload(req, res, async error => {
        if (error) {
            return res.status(400).json({ error });
        }

        const user = await Users.findOne({ email: req.user.email });
        user.banner = req.file.filename
        await user.save();

        res.sendStatus(201);
    });
}
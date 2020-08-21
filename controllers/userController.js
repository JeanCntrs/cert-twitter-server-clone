const Users = require('../models/Users');

exports.updateUser = (req, res) => {
    if (!Object.keys(req.body).length) {
        return res.status(400).json({ msg: 'Información inválida.' });
    }

    Users.findOneAndUpdate({ _id: req.user._id }, { $set: req.body }, { new: true }, (err) => {
        if (err) {
            res.status(500).json({ msg: 'Se ha producido un error. Por favor, inténtelo más tarde.' });
        }

        res.sendStatus(200);
    });
}
const Users = require('../models/Users');

exports.updateUser = (req, res) => {
    if (!Object.keys(req.body).length) {
        return res.status(400).json({ msg: 'Información inválida.' });
    }

    Users.findOneAndUpdate({ _id: req.user._id }, { $set: req.body }, { new: true }, (err) => {
        if (err) {
            return res.status(500).json({ msg: 'Se ha producido un error. Por favor, inténtelo más tarde.' });
        }

        res.sendStatus(200);
    });
}

exports.readProfile = (req, res) => {
    if (!req.query.id) {
        return res.status(400).json({ msg: 'Parámetro ID no válido' });
    }

    Users.findById(req.query.id, (err, user) => {
        if (err) {
            return res.status(400).json({ msg: 'ID no válido.' });
        }

        if (!user) {
            return res.status(400).json({ msg: 'Perfil no encontrada.' });
        }

        const profile = {
            _id: user._id,
            names: user.names,
            surnames: user.surnames,
            birthdate: user.birthdate,
            email: user.email,
            avatar: user.avatar,
            banner: user.banner
        }

        res.status(200).json(profile);
    });
}
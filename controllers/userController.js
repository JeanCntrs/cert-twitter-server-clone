const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.createUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const { email, password } = req.body;
    const userExists = await Users.findOne({ email });

    if (userExists) {
        return res.status(400).json({ msg: 'El email ya se encuentra registrado.' });
    }

    try {
        const user = new Users(req.body);
        const salt = await bcrypt.genSalt(8);

        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.status(201).json({ msg: 'Cuenta creado exitosamente.' });
    } catch (error) {
        res.status(500).json({ msg: 'Se ha producido un error. Por favor, inténtelo más tarde' });
    }
}
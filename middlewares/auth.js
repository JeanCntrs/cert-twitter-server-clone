const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const bearerToken = req.header('Authorization');

    if (!bearerToken) {
        return res.status(401).json({ msg: 'Permiso no válido' });
    }

    try {
        const token = bearerToken.split(' ')[1];
        const user = jwt.verify(token, process.env.SECRET)
        req.user = user;
    } catch (error) {
        return res.status(401).json({ msg: 'Token no válido' });
    }

    next();
}
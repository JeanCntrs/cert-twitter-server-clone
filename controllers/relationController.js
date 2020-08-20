const Relations = require('../models/Relations');

exports.createRelation = async (req, res) => {
    try {
        const { userRelationId } = req.params;
        const data = { userId: req.user._id, userRelationId };
        const relation = new Relations(data);
        await relation.save();

        res.sendStatus(201);
    } catch (error) {
        res.status(500).json({ msg: 'Se ha producido un error. Por favor, inténtelo más tarde.' });
    }
}
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    names: {
        type: String,
        require: true,
        trim: true
    },
    surnames: {
        type: String,
        require: true,
        trim: true

    },
    birthdate: {
        type: Date,
        default: Date.now()
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    avatar: {
        type: String,
        trim: true
    },
    banner: {
        type: String,
        trim: true
    },
    biography: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Users', userSchema);
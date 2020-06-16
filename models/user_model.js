const mongoose = require('mongoose');
const config = require('../config/config.json');
const bcrypt = require('bcryptjs');

let salt = bcrypt.genSaltSync(config.crypto.salt);

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-z][a-z0-9]*?(_[a-z0-9]+){0,2}$/i
    },
    password: {
        type: String,
        required: true,
    },
    favourites: Array
});

module.exports = mongoose.model('User', userSchema, config.db.collection);
module.exports.hashPassword = async (password) => {
    try {
        const result = await bcrypt.hash(password,salt);
        return result;
    } catch (error) {
        throw new Error('Hashing failed', error)
    }
}
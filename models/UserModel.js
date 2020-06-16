const {Schema, model} = require('mongoose');

const userModelSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = model('UserModel', userModelSchema);
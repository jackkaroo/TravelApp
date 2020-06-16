var mongoose = require("mongoose");
var User = require("./models/user_model");
var config = require('./config/config.json');
var User = require("./models/user_model");
const bcrypt = require('bcryptjs');


mongoose.connect(config.db.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, function (err, client) {
    if (err) {
        console.log(err);
    }
    console.log('Successfully connected to database');
});

module.exports.checkUser = async function (data) {
    let password = await User.hashPassword(data.password);
    let usr = await User.findOne({login: data.login});
    if(usr) if (usr.password === password) return true;
    return false;
    /*await User.findOne({login: data.login}).then((err, usr) => {
        if (err) throw err;
        if (usr.password !== password) throw new Error('incorrect password');
    })*/

}

module.exports.getUser = async function (login) {
    let usr = await User.findOne({login: login});
    return usr;
}

module.exports.addFavourite = async function (login, favId) {
    await User.updateOne({login : login}, {$push: {favourites: favId}});
}

module.exports.registerUser = async function (data) {
    let pass = await User.hashPassword(data.password);
    let user = new User({
        login: data.login,
        password: pass
    });
    user.save(function (err) {
        if (err) throw err;
    });
}
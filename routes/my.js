const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
var db = require('../db');
const config = require('../config/config.json');

/* PROCESS login */
router.post('/', function (req, res, next) {
    jwt.verify(req.headers.token, config.crypto.key, (err, decoded) => {
        console.log(decoded);
        if (err) {
            return res.redirect('/');
        } else {
            db.getUser(decoded.login).then(usr => {
                res.status(200).json({login: usr.login, favourites: usr.favourites});
            })
        }
    });
});

router.get('/', function (req, res, next) {
    jwt.verify(req.headers.token, config.crypto.key, (err, decoded) => {
        console.log(decoded);
        if (err) {
            return res.status(401).redirect('/');
        } else {
            db.addFavourite(decoded.login, req.headers.favid).then(() => {
                res.status(200).send("ok");
            })
        }
    });
});

module.exports = router;
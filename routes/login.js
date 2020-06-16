const createError = require('http-errors');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db');
const joi = require('../middlewares/joi_validate');
const config = require('../config/config.json');

/* PROCESS login */
router.post('/', async function (req, res, next) {
        let data = joi.validate(req.body);
        let flag = await db.checkUser(data).catch(err => {
            next(createError(401, 'User not exist'));
        });
        if (flag) {
            const JWTToken = jwt.sign(
                {
                    login: data.login,
                    password: data.password
                },
                config.crypto.key,
                {
                    expiresIn: "2h"
                }
            );
            res.status(200).json({
                token: JWTToken
            })
        } else {
            next(createError(401, 'Login or password Invalid'));
        }
    }
);

module.exports = router;
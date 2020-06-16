const createError = require('http-errors');
const express = require('express');
const router = express.Router();
const db = require('../db');
const joi = require('../middlewares/joi_validate');

/* PROCESS registration */

router.post('/', async function (req, res, next) {
    try {
        let data = joi.validate(req.body);
        try {
            await db.registerUser(data);
        } catch (err) {
            res.status(409).send(err);
        }
    } catch (err) {
        res.status(400).json(err);
    }
    res.send('ok');
});

module.exports = router;
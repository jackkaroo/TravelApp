var express = require('express');
var router = express.Router();
const cookieParser = require('cookie-parser')
const UserModel = require('../models/UserModel');

router.get('/', async function(req, res, next) {
  const authCookie = req.cookies.authCookie;
  const user = await UserModel.findOne({'_id': authCookie})
  res.render('profile', {username: user.email});
});

router.get('/:id', async function(req, res, next) {
  const user = await UserModel.findOne({'_id': req.param.id})
  res.json(user)
});

module.exports = router;
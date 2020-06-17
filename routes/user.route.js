var express = require('express');
var router = express.Router();
const UserModel = require('../models/UserModel');

router.get('/', function(req, res, next) {
  res.render('profile');
});

router.post('/:id', async function(req, res, next) {
  const user = await UserModel.findOne({'_id': req.param.id})
  res.json(user)
});

module.exports = router;
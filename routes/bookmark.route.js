var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function(req, res, next) {
  res.render('index');
});

router.delete('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;

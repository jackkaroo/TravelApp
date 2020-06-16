var express = require('express');
var router = express.Router();

console.log("index js");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;

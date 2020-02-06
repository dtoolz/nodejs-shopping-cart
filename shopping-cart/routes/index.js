var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('store/index', { title: 'Dtoolz Express Shopping Cart' });
});

module.exports = router;

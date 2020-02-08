var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');


var csrfProtection = csrf();
router.use(csrfProtection); // protecting all routes with csrf
/* GET home page. */
router.get('/', function(req, res, next) {
   Product.find(function(err,docs){
     var productGroups = [];
     var groupSize = 4;
     for(var i = 0; i < docs.length; i += groupSize ){
       productGroups.push(docs.slice(i, i + groupSize));
     }
    res.render('store/index', { title: 'Dtoolz Express Shopping Cart', products : productGroups });
   });
});

//get signup page
router.get('/user/signup', function(req,res,next){
      res.render('user/signup', {csrfToken : req.csrfToken()});
});

//make post from signup page
router.post('/user/signup', function(req,res,next){
     res.redirect('/');
});

module.exports = router;

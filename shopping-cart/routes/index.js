var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var Product = require('../models/product');


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
router.post('/user/signup', passport.authenticate('local.signup', { // local.signup from passport,js file
    successRedirect : '/user/profile',
    failureRedirect : '/user/signup',
    failureFlash : true
})); 

router.get('/user/profile', function(req,res,next){
   res.render('user/profile');
});

module.exports = router;

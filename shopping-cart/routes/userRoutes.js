var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');



var csrfProtection = csrf();
router.use(csrfProtection); // protecting all routes with csrf


//can also route group this way, calling function in each route
router.get('/profile', isLoggedIn , function(req,res,next){
    res.render('user/profile');
   });

router.get('/logout', isLoggedIn,(req, res, next)=>{
    req.logout();
    res.redirect('/');
});

// routes grouping for request that do not require isAuthenticated()
router.use('/', notLoggedIn, (req, res, next)=>{ //for all request that do not require auth to be below this
   next();
});


//get signup page
router.get('/signup', function(req,res,next){
    var messages = req.flash('error'); // to display error messages from passportjs
    res.render('user/signup', {csrfToken : req.csrfToken(), messages:messages, hasErrors: messages.length > 0 });
});

//make post from signup page
router.post('/signup', passport.authenticate('local.signup', { // local.signup from passport,js file
  successRedirect : '/user/profile',
  failureRedirect : '/user/signup',
  failureFlash : true
})); 


router.get('/signin', (req,res,next)=>{
var messages = req.flash('error'); // to display error messages from passportjs
 res.render('user/signin', {csrfToken : req.csrfToken(), messages:messages, hasErrors: messages.length > 0 });
});

//post req from signin page
router.post('/signin', passport.authenticate('local.signin', { // local.signin strategy from passport.js file
successRedirect : '/user/profile',
failureRedirect : '/user/signin',
failureFlash : true
})); 






module.exports = router;

 function isLoggedIn (req, res, next) {// add isLoggedIn to routes that needs protection
    if( req.isAuthenticated() ){
         return next(); //return next() meaning to continue to destination page
    }
    res.redirect('/'); //or else redirect to home page
}

function notLoggedIn (req, res, next) {// add notLoggedIn to routes that do not need protection
    if( !req.isAuthenticated() ){
         return next(); //return next() meaning to continue to destination page
    }
    res.redirect('/'); //or else redirect to home page
}
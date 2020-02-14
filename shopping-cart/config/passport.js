var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done){
    done(null, user.id); // when storing a user in a session, it should be serialised with the user id
});

passport.deserializeUser(function(id, done){ // to deserialise, you retrieve by id
   User.findById(id, function(err, user){
     done(err, user);
   });
});

// sign up strategy
passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){ //checking for validation
    req.checkBody('email','Invalid email address').notEmpty().isEmail();
    req.checkBody('password','Password should have a minimum of 8 characters').notEmpty().isLength({min:8});
    var errors = req.validationErrors();
     if(errors){
         messages = [];
         errors.forEach(function(error){
           messages.push(error.msg); //msg from express-validator package
         });
         return done(null, false, req.flash('error', messages));
     }
   User.findOne({'email': email }, function(err, user){
     if(err){// check for errors
         return done(err);
     }
     if(user){ // check for users on db
         return done(null, false, {message:'This email already exists. '}) // no err, no object to send back and third arg of message
     }
     var newUser = new User();
     newUser.email = email;
     newUser.password = newUser.encryptPassword(password);// calling function at userjs model for encryption
     newUser.save(function(err, result){
       if(err){
           return done(err);
       }
       return done(null, newUser);
     });
   });
}) );
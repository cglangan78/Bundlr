var
    passport        = require('passport'),
    LocalStrategy   = require('passport-local').Strategy;

var User            = require('../models/user.js');


passport.serializeUser(function(user, done){
    done(null, user.id)
})

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user)
    })
})

passport.use('local-signup', new LocalStrategy({
    firstnameField: 'firstName',
    lastnameField: 'lastName',
    emailField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, firstName, lastName, email, password, done){
    User.findOne({'local.email': email}, function(err, user){
        if(err) return done(err)
        if(user) return done(null, false, req.flash('signupMessage','That email is already taken'))

        var newUser = new User()
        newUser.local.firstName = req.body.firstname
        newUser.local.lastName = req.body.lastName
        newUser.local.email = email
        newUser.local.password = newUser.generateHash(password)

        newUser.save(function(err){
            if(err) throw err
            return done(null, newUser)
        })
    })
}))

passport.use('local-login', new LocalStrategy({
    firstnameField: 'firstName',
    lastnameField: 'lastName',
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, firstName, lastName, email, password, done){
  User.findOne({'local.email': email}, function(err, user){
      if(err) throw err
      if(!user) return done(null, false, req.flash('loginMessage', 'No user found'))
      if(!user.validPassword(password)) return done(null,false, req.flash('loginMessage','Wrong Password!'))
      return done(null, user)
  })
}))

module.exports = passport;

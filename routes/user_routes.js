var
  usersController = require('../controllers/users_controller.js'),
  express = require('express'),
  userRoutes = express.Router(),
  passport = require('passport');

userRoutes.route('/user')
  .get(usersController.showUser)
  // .post(usersController.createUser)

userRoutes.route('/user/:_id')
  .delete(usersController.destroyUser)
  .put(usersController.updateUser)


userRoutes.route('/login')
    .get(function(req, res){
        res.render('login', {message: req.flash('loginMessage')})
    })
    .post(passport.authenticate('local-login', {
        //if successful, where do we want them to go?
        successRedirect: '/profile',
        //if they fail, where do we want them to go?
        failureRedirect: '/login',
        failureFlash: true
    }))

userRoutes.route('/signup')
    .get(function(req,res){
        res.render('signup', {message: req.flash('signupMessage')})
    })
    .post(passport.authenticate('local-signup', {
        //if successful signup, where do they go?
        successRedirect: '/profile',
        //if they fail, where do they go?
        failureRedirect: '/signup',
        failureFlash: true
    }))

userRoutes.get('/profile', isLoggedIn, function(req,res){
        res.render('profile', {user: req.user})
})
// userRoutes.route('/profile')
// .get(function(req,res){
//   res.render('profile', {message: req.flash('signupMessage')})
// })

//facebook routes
userRoutes.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}))

userRoutes.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/profile',
  failureRedirect: '/'
}))


userRoutes.get('/logout', function(req,res){
        req.logout()
        //once logged out, redirect back to the home page
        res.redirect('/')
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next()
  res.redirect('/')
}


module.exports = userRoutes

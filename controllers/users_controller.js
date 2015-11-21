var User  = require('../models/user.js');

//create index action
function index(req, res){
  User.find({}, function(err, users){
    if(err) console.log(err);
    res.json(user);
  })
}

//method to create an user
function create(req, res){
  console.log('Creating an user', req.body);
  var user = new User(req.body.user);
  user.local.save(function(err){
    if(err) console.error(err);
    console.log("saving user", user)
    res.json({success: true, message: 'User was created', _id: user.id});
  })
}


//method to destroy an user
function destroy(req, res){
  User.findOneAndRemove({_id: req.params.id}, function(err){
    if(err) console.error(err)
    console.log(res)
    res.json({message: "User was deleted"});
  })
}

//method to update an user
function update(req, res){
  User.findOneAndUpdate({user_name: req.params.user_name}, {user_name: req.body.user_name}, function(err, user){
    if(err) console.log(err)
    res.json({success: true, message: "User has been updated!"});
  })
}

module.exports = {
  showUser: index,
  createUser: create,
  destroyUser: destroy,
  updateUser: update
}

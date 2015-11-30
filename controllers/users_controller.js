var User  = require('../models/user.js');

//create index action
function index(req, res){
  User.find({}, function(err, users){
    if(err) console.log(err);
    res.json(users);
  })
}

//method to create an user
// function create(req, res){
//   console.log(req.body);
//   var user = new User()
//     user.local.firstName = req.body.firstName;
//     user.local.lastName = req.body.lastName;
//     user.local.email = req.body.email;
//     user.local.password = user.generateHash(req.body.password);
//
//   console.log(req.body);
//   user.save(function(err){
//     if(err) console.error(err);
//     console.log("saving user", user)
//     res.json({success: true, message: 'User was created', _id: user.id});
//   })
// }

//method to destroy an user
function destroy(req, res){
  console.log(req.params._id);
  User.findOneAndRemove({_id: req.params._id}, function(err){
    if(err) console.error(err)
    // console.log(res)
    res.json({message: "User was deleted"});
  })
}

//method to update an user
function update(req, res){
  console.log(req.body.local.firstName);
  User.findById(req.params._id, function(err,user){
    user.local.firstName = req.body.local.firstName
    user.local.lastName = req.body.local.lastName
    user.local.email = req.body.local.email
    user.local.password = req.body.local.password
    user.save(function(err){
      if(err) console.log(err)
      res.json({success: true, message: "User has been updated!"});
    });
  });
}

module.exports = {
  showUser: index,
  // createUser: create,
  destroyUser: destroy,
  updateUser: update
}

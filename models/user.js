//user model
var
  mongoose = require('mongoose'),
  Schema   = mongoose.Schema;

var userSchema = new Schema({
  local: {
    firstName: String,
    lastName: String,
    email: String,
    password: String
  }
})

userSchema.pre('save', function(next){
  if(!this.created_at){
    var currentDate = new Date();
    this.created_at = currentDate;
  }
  next();
});


var User = mongoose.model('User', userSchema);

module.exports = User;

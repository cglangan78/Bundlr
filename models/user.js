//user model
var
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  Schema = mongoose.Schema;

var userSchema = new Schema({
  local: {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    created_at: Date
  },
  facebook: {
    id: String,
    name: String,
    token: String,
    email: String
  }
});

userSchema.pre('save', function(next){
  if(!this.local.created_at){
    var currentDate = new Date();
    this.local.created_at = currentDate;
  }
  this.local.password = this.generateHash(this.local.password)
  next();
});

userSchema.methods.generateHash = function(password) {
return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
};

userSchema.methods.validPassword = function(password) {
return bcrypt.compareSync(password, this.local.password)
};

var User = mongoose.model('User', userSchema);

module.exports = User;

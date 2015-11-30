var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var searchSchema = new Schema({
	user_search: String,
  created_at: Date
});

searchSchema.pre('save', function(next){
  if(!this.created_at){
    var currentDate = new Date();
    this.created_at = currentDate;
  }
  next();
});

var Search = mongoose.model('Search', searchSchema);

module.exports = Search;

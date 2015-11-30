var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var youtubeSchema = new Schema({
	youtube_url: String
});

var youtube = mongoose.model('youtube', youtubeSchema);

module.exports = youtube;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create tag model
const tagSchema = new Schema({
  title: String,
  userUid: String,
  gifs: [String]
});

//create model class
const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;

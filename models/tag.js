const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create tag model
const tagSchema = new Schema({
  gifId: String,
  userId: String,
  tags: [String]
});

//create model class
const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;

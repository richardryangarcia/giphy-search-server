const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create user model
const userSchema = new Schema({
  _id: {
    type: String,
    unique: true
  },
  firstName: String,
  lastName: String,
  email: String,
  favorites: [String]
});

//create model class
const User = mongoose.model('User', userSchema);

module.exports = User;

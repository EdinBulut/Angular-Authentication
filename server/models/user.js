const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: String,
  password: String
});

module.exports = mongoose.model('users', UserSchema, 'users');
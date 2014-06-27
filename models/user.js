var mongoose = require('mongoose');

var User =  mongoose.model('User',{
  name : String,
  email : String,
  phone : Number,
  date : String,
  city : String,
  estate : String
});

module.exports = User;

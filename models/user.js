var mongoose = require('mongoose');

var User =  mongoose.model('User',{
  name : String,
  email : String,
  phone : Number,
  date : Date,
  city : String
});

module.exports = User;

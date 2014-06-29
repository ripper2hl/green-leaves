var User = require('../models/user');
/*
* GET users listing.
*/

exports.list = function(req, res){
  User.find(function(err, users) {
    if(err) {
      res.send(err);
    }
    res.json(users);
  });
};

exports.save = function(req, res){

  User.create({
    name : req.body.nombre,
    email : req.body.email,
    phone : req.body.telefono,
    date : req.body.fecha,
    city : req.body.ciudad,
    done: false
  }, function(err, user){
    if(err) {
      res.send(err);
    }

    User.find(function(err, users) {
      if(err){
        res.send(err);
      }
      res.json(users);
    });
  });
};

exports.delete = function(req, res){
  User.remove({
    _id: req.params.user
  }, function(err, user) {
    if(err){
      res.send(err);
    }

    User.find(function(err, users) {
      if(err){
        res.send(err);
      }
      res.json(users);
    });

  })
};

var User = require('../models/user');
var nodemailer = require("nodemailer");
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

    console.log("Correo");
    // Creamos un metodo reusabe de envio de correo
    var smtpTransport = nodemailer.createTransport("SMTP",{
      service: "Gmail",
      auth: {
        user: "",
        pass: ""
      }
    });

    // Configuramos el correo

    var mensaje = 'Una cuenta ha sido activada en nuestro '
    mensaje += 'sistema con la siguiente informacion: <br/>';
    mensaje += 'Nombre : ' + req.body.nombre;
    mensaje += '<br/>E-mail : ' + req.body.email;
    mensaje += '<br/>Telefono : ' + req.body.telefono;
    mensaje += '<br/>Fecha : ' + req.body.fecha;
    mensaje += '<br/>Ciudad y Estado : ' + req.body.ciudad;
    mensaje += '<br/>Atte: Green leaves.';
    mensaje += '<br/>***Este mensaje es de prueba, NO REAL.***';

    var mailOptions = {
      from: "Green Leaves <Green Leaves>", // Quien lo envia
      to: req.body.email, // Lista de los receptores
      subject: "Cuenta Green Leaves ✔", //Asunto
      html: mensaje // cuerpo html
    };

    // Enviando el correo
    smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
        console.log(error);
        res.send('Error');
      }else{
        console.log("El mensaje fue enviado: " + response.message);
      }
      smtpTransport.close(); // cerramos la conexion de mensajes
    });

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

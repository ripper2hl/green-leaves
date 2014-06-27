
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user-api');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

//Creamos la coneccion a mongodb
mongoose.connect('mongodb://localhost/green-leaves/',function(err){
  if(err){
    console.log('Error al crear la conexion con la base de datos');
    throw err;
  }
});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/api/users', user.list);
app.post('/api/users', user.save);
app.delete('/api/users', user.delete);
app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

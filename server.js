
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user-api');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var userMongo = process.env.OPENSHIFT_MONGODB_DB_USERNAME;
var passMongo = process.env.OPENSHIFT_MONGODB_DB_PASSWORD;
var hostMongo = process.env.OPENSHIFT_MONGODB_DB_HOST;
var portMongo = process.env.OPENSHIFT_MONGODB_DB_PORT;
var urlMongoRemota = 'mongodb://' + userMongo + ':' + passMongo + '@' + hostMongo + ':' + portMongo + '/green-leaves';

var urlMongoLocal = 'mongodb://localhost/green-leaves/';

if(userMongo){
  urlMongo = urlMongoRemota;
}else{
  urlMongo = urlMongoLocal;
}

mongoose.connect(urlMongo,function(err){
    if(!err){
  console.log('Conexion a mongodb con exito');
    }else{
  console.log('Error al crear la conexion con la base de datos');
  throw err;
    }
});

var port = process.env.OPENSHIFT_NODEJS_PORT ||  process.env.OPENSHIFT_INTERNAL_PORT || 8081;
var ipaddr = process.env.OPENSHIFT_NODEJS_IP || process.env.OPENSHIFT_INTERNAL_IP;

var app = express();

// all environments
app.set('port', port);
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

http.createServer(app).listen(app.get('port'),ipaddr, function(){
  console.log('Express server listening on port ' + app.get('port'));
});

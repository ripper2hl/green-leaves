(function() {

  var app = angular.module('greenLeaves', ['ui.bootstrap']);

  app.controller('RegisterCtrl', function(){

    this.addUser = function(usuario) {
      this.usuario = usuario;
      console.log(usuario);
    };

  });

})();

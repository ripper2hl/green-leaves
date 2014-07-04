(function() {

  var app = angular.module('greenLeaves', ['ui.bootstrap']);

  app.controller('ViewCtrl', function ($scope, $http){

    $scope.view = 1;
    $currentUser = {};
    $scope.changeView = function (val,currentUser) {
      $scope.view = val;
      $scope.currentUser = currentUser;
    };

    $scope.users = [];
    $scope.getUsers = function () {
      $http.get('/api/users').success( function (data) {
        $scope.users = data;
      });
    };


  });

  app.controller('RegisterCtrl', function($scope,$http){

    $scope.usuario = {
      nombre : undefined,
      email: undefined,
      telefono : undefined,
      fecha : undefined,
      ciudad : undefined
    };

    $scope.addUser = function(usuario) {

      $scope.usuario = usuario;
      $http.post('/api/users', $scope.usuario).success( function (data) {
        console.log(data);
        $scope.usuario = {};
      });
    };
  });

  //Tabla de usuarios
  app.controller('RegisterTableCtrl', function($scope,$http){

  });

  //Widget Calendario
  app.controller('DatepickerCtrl', function ($scope) {
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    //Fecha minima
    $scope.toggleMin = function() {
      today = new Date();
      md = new Date();
      md.setFullYear(today.getFullYear() - 100);
      $scope.minDate = $scope.minDate ? null : md;
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
  });

  //Widget Ciudad
  app.controller('TypeheadCtrl',function($scope, $http){

    // Any function returning a promise object can be used to load values asynchronously
    $scope.getLocation = function(val) {
      return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: val,
          sensor: false
        }
      }).then(function(res){
        var addresses = [];
        angular.forEach(res.data.results, function(item){
          addresses.push(item.formatted_address);
        });
        return addresses;
      });
    };
  });

  //Dialogo de validacion
  app.controller('ModalCtrl',function ($scope, $modal) {

    $scope.open = function (size) {

      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: function ($scope, $modalInstance) {

          $scope.ok = function () {
            $modalInstance.close();
          };
        },
        size: size
      });
    };
  });

})();

(function() {

var app = angular.module('greenLeaves', ['ui.bootstrap']);

app.controller('RegisterCtrl', function($scope){

  $scope.usuario = {
    nombre : undefined,
    email: undefined,
    telefono : undefined,
    fecha : undefined,
    ciudad : undefined
  };

  $scope.addUser = function(usuario) {

    $scope.usuario = usuario;
    for(u in usuario){
      if(!usuario[u]){
        return "Faltan datos";
      }
    }
    console.log($scope.usuario);
  };

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

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
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
app.controller('ModalDemoCtrl',function ($scope, $modal, $log) {

$scope.items = ['item1', 'item2', 'item3'];

$scope.open = function (size) {

  var modalInstance = $modal.open({
    templateUrl: 'myModalContent.html',
    controller: function ($scope, $modalInstance, items) {

      $scope.items = items;
      $scope.selected = {
        item: $scope.items[0]
      };

      $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    },
    size: size,
    resolve: {
      items: function () {
        return $scope.items;
      }
    }
  });

  modalInstance.result.then(function (selectedItem) {
    $scope.selected = selectedItem;
  }, function () {
    $log.info('Modal dismissed at: ' + new Date());
  });
};
});

})();

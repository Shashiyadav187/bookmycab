angular.module('mycabApp').controller('DriverController', function($scope, $rootScope, $http,$filter) {
    

       $scope.AddCab = function() {
        alert("in connected ");
    
        $http.post('/driver/addDriver', $scope.newDriver).then(function(response) {
            console.log('Data Saved Successfully');
            alert('data for driver saved is Saved Successfully');

            $http.post('/driver/addUser', $scope.newDriver).then(function(response) {
            console.log('Data Saved Successfully');
            alert('data for cab saved is Saved Successfully');
        });
        });
        GetCab();

    }

    var GetCab = function() {
        $http.get('/driver/getUser').then(function(response) {
        $scope.user = response.data;
        });
        console.log($scope.user);

    }

GetCab();


    });
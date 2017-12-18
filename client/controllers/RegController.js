angular.module('mycabApp').controller('RegController', function($scope, $rootScope, $http) {
   

    $scope.AddUser = function() {
            $http.post('/register/addregisterUser', $scope.newUser).then(function(response) {
            console.log('Data Saved Successfully');
            alert('users data  Saved Successfully');
        });
    }


    });
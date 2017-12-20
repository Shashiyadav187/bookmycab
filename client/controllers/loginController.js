angular.module('mycabApp').controller('loginController', function($scope, $rootScope, $http,authService) {
   

$scope.Login=function(){
	console.log("sdfhj");
	authService.Login($scope.User);
}



    });
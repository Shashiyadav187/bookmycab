angular.module('mycabApp').controller('loginController', function($scope, $rootScope, $http,authService) {
   


// 	$http.post('login/Login',$scope.User).then(function(response){
// 		if(!response.data.succuess){
// 			alert(response.data.message);
// 		}
// 		else{
// console.log(response.data.authtoken);
// 		}
// 	})
$scope.Login=function(){
	console.log("sdfhj");
	authService.Login($scope.User);
}



    });
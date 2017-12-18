angular.module('mycabApp').service('authService', function($cookies, $http,$sessionStorage,$location) {
   this.Login=function(user){
   	$http.post('/api/Login',user).then(function(response){
 console.log(response.success);
  console.log(response.data.authtoken);
	if(response.data.success &&response.data.authtoken){
		$cookies.putObject('mycookie',response.data.userDetail);
		$sessionStorage.tokeninfo=response.data.authtoken;
		$location.path('/');
		}
	})
   }



    });

// var app = angular.module('myCabApp', ['ngRoute','ngFileUpload','ngStorage']);

// app.service('authService', function() {
// 	console.log("in here");

// });

//    		if(response.data.succuess &&response.data.token){
// $sessionStorage.tokenInfo={
// 	token:response.data.token
// };
// $http.defaults.headers.common.Authorization=response.data.token;
// var obj={
// 	currentuser:{
// 		isLogginIn:true
// 		userInfo:{
// 			id:response.data.userDetail._id,
// 			email:response.data.userDetail.EmailID,
// 			fname:response.data.userDetail.firstName,
// 			lname:response.data.userDetail.lastName,
// 			mobile:response.data.userDetail.mobileNum,
// 			userType:response.data.userDetail.role
// 		}
// 	}
// };
// $cookies.putObject('authUser',obj);
//    		}
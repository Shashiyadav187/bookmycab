angular.module('mycabApp').service('authService', function($cookies, $http,$sessionStorage,$location) {
   this.Login=function(user){
   	$http.post('/api/Login',user).then(function(response){
 console.log(response.success);
  console.log(response.data);if(response.data.success){
	if(response.data.success &&response.data.authtoken){
		$cookies.putObject('mycookie',response.data.userDetail);
  console.log('In service '+$cookies.getObject('mycookie'));

		if(response.data.userDetail.role=='driver'){
			console.log("whats up im a driver");
			$cookies.putObject('driverdet',response.data.userDetail);
      $location.path('/dripage');
		 }

		if(response.data.userDetail.role=='user'){
			console.log("whats up im a user");
			$cookies.putObject('userdet',response.data.userDetail);
		}
		$sessionStorage.tokeninfo=response.data.authtoken;
    if(response.data.userDetail.role=='driver'){
      $location.path('/dripage');
    }else
		$location.path('/');
		}}
    else {
      alert(response.data.message);
    }
	});
   }

   this.Logout=function(){
console.log("logged out");
   	var user = $cookies.remove('mycookie');
   	var driver = $cookies.remove('driverdet');
   	var customer = $cookies.remove('userdet');
   	console.log($sessionStorage.tokeninfo);
   	$sessionStorage.tokeninfo="";
   	console.log($sessionStorage.tokeninfo);
  
console.log(user);
$location.path('/');

   }



    });

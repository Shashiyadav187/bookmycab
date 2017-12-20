angular.module('mycabApp').service('authService', function($cookies, $http,$sessionStorage,$location) {
   this.Login=function(user){
   	$http.post('/api/Login',user).then(function(response){
 console.log(response.success);
  console.log(response.data.userDetail);
	if(response.data.success &&response.data.authtoken){
		$cookies.putObject('mycookie',response.data.userDetail);
		if(response.data.userDetail.role=='driver'){
			$cookies.putObject('driverdet',response.data.userDetail);
		}
		$sessionStorage.tokeninfo=response.data.authtoken;
		$location.path('/');
		}
	})
   }



    });

angular.module('mycabApp').controller('NavController', function($scope,$http,$cookies,authService) {
var cust='';
var cust = $cookies.getObject('mycookie');
console.log(cust);
$scope.isLoggedin=false;

$scope.ifnotlogged=function(){

 	if(cust==''){
 		return 1;
 	}else{
 	
 		return 0;
 	}
 }

 $scope.isUser=function(){
 	if(cust!=undefined&&cust!=''){
 		$scope.isLoggedin=true;
	if(cust.role=='user'){
	return 1;		 
	}
}
	else {

	return 0;	
	}
}

$scope.isAdmin=function(){
	if(cust!=undefined&&cust!=''){
	
	if(cust.role=='admin'){
	
	return 1;		
	}
}
	else 
	{
	return 0;	
	}
}

$scope.isDriver=function(){
	if(cust!=undefined&&cust!=''){
	$scope.isLoggedin=true;
	if(cust.role=='driver'){
	
	return 1;		 
	}
}
	else 
	{
	return 0;	
	}
}

$scope.logout=function(){
	console.log("logged out");
	isLoggedin=false;
	authService.Logout();
}

console.log($scope.isAdmin());

});
    

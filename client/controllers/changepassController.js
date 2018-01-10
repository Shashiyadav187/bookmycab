angular.module('mycabApp').controller('changepassController', function($scope,$http,$filter,$cookies) {

var loggeduser= $cookies.getObject('mycookie');

$scope.ChangePassword=function(){
$scope.mydata={
	cookiedata:loggeduser,
	password:$scope.Pass
}
console.log($scope.mydata);
$http.post('/api/checkPass',$scope.mydata).then(function(response) {
        console.log(response.data.success);
        if(response.data.success){
   $scope.updateUserDetails = {
   	 _id:response.data.password[0]._id,
    password:response.data.password[0].password,
            }


        $http.put('/api/updatePass/' + $scope.updateUserDetails._id,$scope.mydata.password).then(function(response) {
            console.log('Data Updated');
        });
        $scope.Pass="";
    }else {
    	alert("Enter correct password to change password");
    }
});

}




var GetUser= function() {
        $http.get('/driver/getUser').then(function(response) {

        $scope.user = response.data;
    });
    }

GetUser();


    });
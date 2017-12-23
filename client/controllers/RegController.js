angular.module('mycabApp').controller('RegController', function($scope, $rootScope, $http) {
    $scope.flag=0;

    $scope.AddUser = function() {


      for(let x in $scope.user){
            if($scope.user[x].mobileNum==$scope.newUser.mobile||$scope.user[x].EmailID==$scope.newUser.email){
            	 console.log("check");
                $scope.flag=0;
                break;
            }else{
                 $scope.flag=1;
            }
        }
        console.log("flag value"+$scope.flag);
if($scope.flag==1){
            $http.post('/register/addregisterUser', $scope.newUser).then(function(response) {
            console.log('Data Saved Successfully');
            alert('users data  Saved Successfully');
        });
    }
     else{
        alert("User already registered");
      }
      $scope.newUser="";
}


    var GetUser = function() {
        $http.get('/driver/getUser').then(function(response) {
        $scope.user = response.data;

        });
         console.log($scope.user);
   
     }
GetUser();

    });
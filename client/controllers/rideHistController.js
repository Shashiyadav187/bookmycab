angular.module('mycabApp').controller('rideHistController', function($scope, $http,$cookies) {
      var GetRides = function() {
      	$scope.rideHistory=[];
var cust = $cookies.getObject('mycookie');
        $http.get('/driver/getRide').then(function(response) {
        	 $scope.ride = response.data;
        	for(let m in $scope.ride){
        		if(cust.mobileNum==$scope.ride[m].custmob){
				$scope.rideHistory.push($scope.ride[m]);
        		}
        	}
        	console.log($scope.rideHistory);
        });
        
    }


    GetRides();
});
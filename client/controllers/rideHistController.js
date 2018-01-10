angular.module('mycabApp').controller('rideHistController', function($scope, $http,$cookies) {
      var GetRides = function() {
      	$scope.rideHistory=[];
var cust = $cookies.getObject('mycookie');
        $http.get('/driver/getRide').then(function(response) {
            $scope.ride = response.data;
        if(cust.role=='user'){
        	for(let m in $scope.ride){
        		if(cust.mobileNum==$scope.ride[m].custmob){
				$scope.rideHistory.push($scope.ride[m]);
        		}
        	}
        }else if(cust.role=='driver'){
                for(let m in $scope.ride){
                if(cust.mobileNum==$scope.ride[m].drimob){
                $scope.rideHistory.push($scope.ride[m]);
                }
            }

        	
        }
        });
        
    }


    GetRides();
});
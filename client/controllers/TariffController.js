angular.module('mycabApp').controller('TariffController', function($scope, $rootScope, $http,$filter) {
    
$scope.flag=0;

    $scope.updateTariffPlan = function() {
        console.log($scope.newTarifff);
          if($scope.newTarifff.carType==""||$scope.newTarifff.baseRate==""||$scope.newTarifff.normalRate==""||$scope.newTarifff.peakRate==""||$scope.newTarifff.startpeakTime==""||$scope.newTarifff.endpeakTime==""){
alert("Please enter all details and then update");
        }
        else{
        $http.put('/tariff/updateTariff/' + $scope.newTarifff.carType, $scope.newTarifff).then(function(response) {
            console.log('Data Updated');
        });
    }
         GetTariffs();
    }
    var GetTariffs = function() {
        $http.get('/tariff/getTariff').then(function(response) {
            $scope.Tariffs = response.data;
        });
    }

    $scope.SearchTariff = function(Tariff) {

        $http.get('/tariff/searchTariff/' + Tariff.carType).then(function(response) {
         //startpkTime = $filter('date')(response.data[0].startpeakTime, 'h:mm a');
         startpkTime = new Date(response.data[0].startpeakTime);
         endpkTime = new Date(response.data[0].endpeakTime);
    $scope.newTarifff = {
    carType:response.data[0].carType,
    baseRate:response.data[0].baseRate,
    normalRate:response.data[0].normalRate,
    peakRate:response.data[0].peakRate,
    startpeakTime:startpkTime,
    endpeakTime:endpkTime,
            }
        });
  
    }
    $scope.DeleteTariff = function(Tariff) {
        $http.delete('/tariff/deleteTariff/' + Tariff.carType).then(function(response) {
            console.log('tariff Removed Successfully');
        });
        GetTariffs();
    }
    $scope.AddTariffPlan = function() {

        if($scope.newTariff.carType==null||$scope.newTariff.baseRate==null||$scope.newTariff.normalRate==null||$scope.newTariff.peakRate==null||$scope.newTariff.startpeakTime==null||$scope.newTariff.endpeakTime==null){
alert("Please enter all details");
        }
        else {
                for(let m in $scope.Tariffs){

            //console.log($scope.Tariffs[m].carType);
            console.log("checking"+$scope.newTariff.carType+"with "+$scope.Tariffs[m].carType);
            if($scope.newTariff.carType===$scope.Tariffs[m].carType){
                alert("Tariff for this car type is already there, Update if any changes for this car type or change the car type to add!");
              $scope.flag=1;
              break;
            }
        }
        console.log( $scope.flag);
        // if($scope.newTariff.carType)
        if(!$scope.flag){
        $http.post('/tariff/addTariff', $scope.newTariff).then(function(response) {
            console.log('Data Saved Successfully');
            alert('Tariff for '+$scope.newTariff.carType+ ' is Saved Successfully');
        });

    }
        }
    
        GetTariffs();
        $scope.flag=0;
    }

    GetTariffs();
});

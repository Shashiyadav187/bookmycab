angular.module('mycabApp').directive("navBar", function() {
	return{
	restrict : 'E',
     templateUrl: './views/nav.html',
        controller:'NavController'
    }
         
    });


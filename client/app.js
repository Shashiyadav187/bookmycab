var app = angular.module('mycabApp',['ngRoute','ngFileUpload','ngStorage','ngCookies']);

app.config(function($routeProvider,$locationProvider) {
    $routeProvider.when('/', {
        templateUrl: './views/home.html',
        controller: 'HomeController',
     }).when('/driver', {
        templateUrl: './views/driver.html',
         controller: 'DriverController'
    }).when('/tariff', {
        templateUrl: './views/tariff.html',
        controller: 'TariffController'
    }).when('/book', {
        templateUrl: './views/bookingpage.html',
           controller: 'BookingController'
    }).when('/register', {
        templateUrl: './views/register.html',
           controller: 'RegController'
    }).when('/login', {
        templateUrl: './views/login.html',
           controller: 'loginController'
    }).when('/auth', {
        templateUrl: './views/unauth.html'
           
    }).when('/dripage',{
        templateUrl: './views/driverbooking.html',
          controller: 'dribookingController'
           
    }).when('/rides',{
        templateUrl: './views/myrides.html',
          controller: 'rideHistController'
           
    }).when('/changepass',{
        templateUrl: './views/changepass.html',
          controller: 'changepassController'
           
    });
    
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
});

    app.run(function($rootScope,$http,$location,$sessionStorage,$cookies){
      
        $rootScope.$on('$locationChangeStart',function(event,next,current){
             
            var public=['/','/login','/register'];
            var admin=['/tariff','/driver','/','/login','/register'];
            var customer=['/book','/','/login','/rides','/register','/changepass'];
            var driver=['/dripage','/','/login','/register','/changepass','/rides'];
            var user=$cookies.getObject('mycookie');

           
            if(user!=undefined){
                var loggedinuser=user;
            }
            console.log($sessionStorage.tokeninfo);
            var restrictpage=public.indexOf($location.path())=== -1;
            if(restrictpage&& !$sessionStorage.tokeninfo && $location.path()!=''){
                $location.path('/login');
            }
            else {
              console.log(user)

                 if(user!=undefined){
                      if(user.role=='user'){
                      console.log("what");
                       var notUser=customer.indexOf($location.path())=== -1; 
                        if(notUser){
                       $location.path('/auth');
                     
                     }
                    }
                    else if(user.role=='admin'){
                        console.log("im a user");
                      var notAdmin=admin.indexOf($location.path())=== -1;  
                      if(notAdmin){
                        $location.path('/auth');
                      } 
                    }
                    
                    else if(user.role=='driver'){
                        console.log("im adriver");
                      var Driver=driver.indexOf($location.path())=== -1;  
                      if(Driver){
                        $location.path('/auth');
                      } 
                    }
                    
                    }
                  }
       
        })
    })




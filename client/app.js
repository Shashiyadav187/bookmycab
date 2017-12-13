var app = angular.module('mycabApp',['ngRoute','ngFileUpload']);

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
    });
    
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);


});

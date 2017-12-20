var express=require('express');
var rideroutes=express.Router();
var history= require('../models/ridehistorymodel.js');


userrouter.post('/addRide',function(request,response){
	var newRide = new history({
	pickup:String,
	drop:String,
	ridedate:String,
	ridingtime:String,
	distance:String,
	status:String,
	});
console.log(newRide);
	newRide.save(function(error, data) {
        if (error) {
            throw error;
        } else {
           console.log("The ride details are added  successfully");
            response.end();
        }
	
	});
});
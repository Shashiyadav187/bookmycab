var express=require('express');
var rideroutes=express.Router();
var history= require('../models/ridehistorymodel.js');


rideroutes.post('/addRide',function(request,response){
	console.log('hi');
	var newRide = new history({
	custmob:request.body.custmob,
	drimob:request.body.drimob,
	pickup:request.body.pickup,
	drop:request.body.drop,
	ridedate:request.body.ridedate,
	ridingtime:request.body.ridingtime,
	distance:request.body.distance,
	status:request.body.status,
	totalfare:request.body.totalfare,
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


rideroutes.get('/getRide',function(request, response) {
    history.find({}, function(error, data) {
        if (error) {
            throw error;
        } else {
            response.json(data);
            console.log(data);
        }
    });
});
module.exports =rideroutes;

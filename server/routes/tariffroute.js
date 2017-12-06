var express=require('express');
var tariffroute=express.Router();
var tariff= require('../models/tariffmodel.js');


tariffroute.post('/addTariff',function(request,response){
	var  newTariff= new tariff({
	carType:request.body.carType,
    baseRate:request.body.baseRate,
	normalRate:request.body.normalRate,
	peakRate:request.body.peakRate,
	startpeakTime:request.body.startpeakTime,
	endpeakTime:request.body.endpeakTime
	});

	newTariff.save(function(error, data) {
        if (error) {
            throw error;
        } else {
           console.log("the tariff details are added successfully");
            response.end();
        }
	
	});
});



tariffroute.get('/getTariff',function(request, response) {
    tariff.find({}, function(error, data) {
        if (error) {
            throw error;
        } else {
            response.json(data);
            console.log(data);
        }
    });
});


tariffroute.put('/updateTariff/:id', function(request, response) {
    tariff.findOneAndUpdate({
            carType:request.body.carType,
    }, {
    baseRate:request.body.baseRate,
    normalRate:request.body.normalRate,
    peakRate:request.body.peakRate,
    startpeakTime:request.body.startpeakTime,
    endpeakTime:request.body.endpeakTime
    }, function(err, data) {
        if (err) {
            throw err;
        } else {
            console.log('Data Updated Successfully');
        }
    });
});

tariffroute.get('/searchTariff/:id', function(request, response) {
    tariff.find({
        carType:request.params.id,
    }, function(err, data) {
        if (err) {
            throw err;
        } else {
            response.json(data);
        }
    });
});

tariffroute.delete('/deleteTariff/:id', function(request, response) {
    tariff.remove({
        carType:request.params.id,
    }, function(err, data) {
        if (err) {
            throw err;
        } else {
            console.log('Tariff Removed Successfully');
        }
    });
});




module.exports = tariffroute;



var express=require('express');
var router=express.Router();
var driver= require('../models/cabmodel.js');



router.post('/addDriver',function(request,response){
	var newDriver = new driver({
	driverMobile:request.body.mobile,
	driverPhoto:'blah',
	driverLicense:request.body.license,
	driverAddress:request.body.address,
	carModel:request.body.model,
	carregNo:request.body.regNo,
	cabType:request.body.cabType,
    carMake:request.body.make
	});

	newDriver.save(function(error, data) {
        if (error) {
            throw error;
        } else {
           console.log("the driver details are added successfully");
            response.end();
        }
	
	});
});

router.get('/getDriver', function(request, response) {
    driver.find({}, function(error, data) {
        if (error) {
            throw error;
        } else {
            response.json(data);
        }
    });
});

// router.put('/updateDriver/:id', function(request, response) {
//     driver.findOneAndUpdate({
//         _id: req.params.id
//     }, {
//        	role:'driver',
// 	driverName:request.body.driverName,
// 	driverMobile:request.body.driverMobile,
// 	driverPhoto:request.body.driverPhoto,
// 	driverLicense:request.body.driverLicense,
// 	driverAddress:request.body.driverAddress,
// 	driverEmail:request.body.driverEmail,
// 	carModel:request.body.carModel,
// 	carregNo:request.body.carregNo,
// 	cabType:request.body.cabType,
// 	carMake:request.body.carMake
//     }, function(err, data) {
//         if (err) {
//             throw err;
//         } else {
//             console.log('Data Updated Successfully');
//         }
//     });
// });

// router.get('/searchDriver/:id', function(request, response) {
//     driver.find({
//         driverEmail:request.body.driverEmail,
//     }, function(err, data) {
//         if (err) {
//             throw err;
//         } else {
//             response.json(data);
//         }
//     });
// });

// router.delete('/deleteDriver/:id', function(request, response) {
//     driver.remove({
//         driverEmail:request.body.driverEmail,
//     }, function(err, data) {
//         if (err) {
//             throw err;
//         } else {
//             console.log('drivers Removed Successfully');
//         }
//     });
// });




module.exports = router;
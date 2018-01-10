var express=require('express');
var router=express.Router();
var cab= require('../models/cabmodel.js');
var multer=require('multer');
var filename="";
var time=Date.now();
var t=time.toString();
var res = t.slice(1, 12);


var storage=multer.diskStorage({
    destination:function(request,file,cb){
        cb(null,'./client/public/uploads/')
    },
    filename:function(request,file,cb){
        var timenw=Date.now();
        console.log(timenw);
        cb(null,file.fieldname + '-' + res+".jpg");
        filename=file.fieldname + '-' + res+".jpg";
    }

}) 
var upload=multer({
    storage:storage
}).single('file');


router.post('/imageupload',function(request,response){
    upload(request,response,function(error){
        if(!error){
            console.log("everthing went completely fine");
            var result=response.data;
            console.log(result);
            console.log(response.data);
                    }else{
             console.log("something not right in upload");
        }
        console.log("upload image is called ");
    })
});


router.post('/addCab',function(request,response){
	var newDriver = new cab({
	driverMobile:request.body.mobile,
	driverPhoto:filename,
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

router.get('/getCab', function(request, response) {
    cab.find({}, function(error, data) {
        if (error) {
            throw error;
        } else {
            response.json(data);
        }
    });
});

router.put('/updateCab/:id', function(request, response) {
    console.log("sd");
    console.log(request.body.mobileNum);
    cab.findOneAndUpdate({
         _id:request.params.id,
    }, {
        driverMobile:request.body.mobileNum,
    }, function(err, data) {
        if (err) {
            throw err;
        } else {
            console.log('Data with cab details Updated Successfully');
        }
    });
});

router.get('/searchCab/:id', function(request, response) {
    cab.find({
        driverMobile:request.params.id,
    }, function(err, data) {
        if (err) {
            throw err;
        } else {
            response.json(data);
            console.log(data);
        }
    });
});

router.delete('/deleteCab/:id', function(request, response) {
    cab.remove({
       driverMobile:request.params.id,
    }, function(err, data) {
        if (err) {
            throw err;
        } else {
            console.log('cab details Removed Successfully');
        }
    });
});




module.exports = router;
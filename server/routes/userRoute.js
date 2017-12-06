var express=require('express');
var userrouter=express.Router();
var user= require('../models/userdetailsmodel.js');





userrouter.post('/addUser',function(request,response){
	var newUser = new user({
	role:'driver',
	password:request.body.mobile,
	firstName:request.body.firstName,
	lastName:request.body.lastName,
	mobileNum:request.body.mobile,
    EmailID:request.body.email
	});

	newUser.save(function(error, data) {
        if (error) {
            throw error;
        } else {
           console.log("The user details are added successfully");
            response.end();
        }
	
	});
});

userrouter.get('/getUser', function(request, response) {
    user.find({}, function(error, data) {
        if (error) {
            throw error;
        } else {
            response.json(data);
        }
    });
});


module.exports = userrouter;
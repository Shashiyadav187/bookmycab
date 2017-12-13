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
console.log(newUser);
	newUser.save(function(error, data) {
        if (error) {
            throw error;
        } else {
           console.log("The User details are added successfully");
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



userrouter.delete('/deleteUser/:id',function(request,response){
    user.remove({
        mobileNum:request.params.id,
    }, function(err,data){
     if(err){
        throw err;

     }  else{
        console.log("user deleted succesfully")
     } 
    })
});




userrouter.put('/updateUser/:id',function(request,response){
    user.findOneAndUpdate({
        _id:request.params.id,
    },{
        firstName:request.body.firstName,
        mobileNum:request.body.mobileNum,
        EmailID:request.body.EmailID

    },function(err,data){
        if(err){
            throw err;
        }else{
           console.log('Data  for user Updated Successfully'); 
        }
    
    });

});

userrouter.get('/SearchUser/:id',function(request,response){
    user.find({mobileNum:request.params.id},function(error,data){
        if(error){
            throw error;
        }else{
            response.json(data);
        }
    });
});




module.exports = userrouter;
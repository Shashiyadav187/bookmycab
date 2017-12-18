var express=require('express');
var userrouter=express.Router();
var user= require('../models/userdetailsmodel.js');
var bcrypt=require('bcrypt-nodejs');
var jwt=require('jsonwebtoken');



userrouter.post('/addUser',function(request,response){
	var newUser = new user({
	role:'driver',
	password:bcrypt.hashSync(request.body.mobile),
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
userrouter.post('/Login',function(request,response){
    console.log("in here");
    console.log(request.body.username);
    user.findOne({
        EmailID:request.body.username
    },function(err,data){
        console.log(data);
        if(err){
            console.log("its an eroor");
            throw err;
        }else if(!data){
            console.log("user is not found");
            response.json({
                success:false,
                message:'user not found'
            });
        }else if(!bcrypt.compareSync(request.body.password,data.password)){
            console.log("password is not correct");
             response.json({
                success:false,
                message:'password is not correct'
            });
        }else{
            console.log("user and pass correct");
            var token=jwt.sign(data.toObject(),"mypasswordkey",{
                expiresIn:2000
            });
            
            response.json({
                success:true,
                message:"user and pass correct",
                authtoken:token,
                userDetail:data
            });

        }
    });
});




userrouter.post('/addregisterUser',function(request,response){
    var newUser = new user({
    role:'user',
    password:bcrypt.hashSync(request.body.password),
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
var express= require('express');
var app=express();
var logger=require('morgan');
var mongoose=require('mongoose');

var routes = require('./server/routes/driverroutes.js');
var tariffroutes = require('./server/routes/tariffroute.js');
var userrouter = require('./server/routes/userRoute.js');
var bodyParser = require('body-parser');
var path = require('path');

 app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/client')));

// app.use(bodyParser.urlencoded({
// 	extended:true
// }));





mongoose.connect('mongodb://localhost/bookmycab-db');

app.use('/driver',userrouter);
 app.use('/driver',routes);
app.use('/tariff',tariffroutes);

app.use(function(req,res){
	res.sendFile(__dirname +'/client/index.html')
});


app.use(logger('dev'));

app.listen(3000,function(request,response){
	console.log("server running on port number 3000");
});
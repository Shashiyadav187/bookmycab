var express= require('express');
var app=express();
var logger=require('morgan');
var mongoose=require('mongoose');
var logger = require('morgan');
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var routes = require('./server/routes/driverroutes.js');
var tariffroutes = require('./server/routes/tariffroute.js');
var rideroutes= require('./server/routes/ridehistory.js');
var userrouter = require('./server/routes/userRoute.js');
var bodyParser = require('body-parser');
var path = require('path');

 app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/client')));

// app.use(bodyParser.urlencoded({
// 	extended:true
// }));

app.use(logger('dev'));



mongoose.connect('mongodb://localhost/bookmycab-db');

app.use('/rides',rideroutes);
app.use('/driver',rideroutes);
app.use('/driver',userrouter);
app.use('/login',userrouter);
app.use('/register',userrouter);
 app.use('/driver',routes);
app.use('/tariff',tariffroutes);
app.use('/api', userrouter);
app.use('/changepass',userrouter);

app.use(function(req,res){
	res.sendFile(__dirname +'/client/index.html')
});

io.on('connection', function(socket) {
    console.log('Socket Connected');
    console.log(socket.id);
     socket.broadcast.emit('driver joined', {
      position: socket.position,
    });
    socket.on('SendLocation', function(data) {
         console.log("dirver in server");
        console.log(data.position);
        socket.broadcast.emit('SendtoAll', {
            location: data.position,
            drimob:data.drivermobile
        });
    });
    socket.on('disconnect', function(){
        console.log('hey your disconnected');

 socket.broadcast.emit('driverleft', {
            location: socket.position
        });
    });

          socket.on('bookedcab', function(data) {
            console.log("hi socket connected")
    console.log(data.hi);
        socket.broadcast.emit('check', {
            dridet:data.hi,
            status:data.status
            
        });
    });

     socket.on('bookedcust', function(data) {
            console.log("hi custoner connected")
    console.log(data.hi);
        socket.broadcast.emit('customer', {
            custdet:data.cabdet
            
        });
    });


});





app.use(logger('dev'));

server.listen(3000,function(request,response){
	console.log("server running on port number 3000");
});
var mongoose=require('mongoose');
var myrideSchema=mongoose.Schema({
	pickup:String,
	drop:String,
	ridedate:String,
	ridingtime:String,
	distance:String,
	status:String,
});

module.exports=mongoose.model('myride',myrideSchema);
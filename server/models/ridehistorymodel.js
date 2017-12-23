var mongoose=require('mongoose');
var myrideSchema=mongoose.Schema({
	custmob:String,
	pickup:String,
	drop:String,
	ridedate:String,
	ridingtime:String,
	distance:String,
	status:String,
	totalfare:String,
});

module.exports=mongoose.model('myride',myrideSchema);
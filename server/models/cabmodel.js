var mongoose=require('mongoose');
var carSchema= mongoose.Schema({
	driverPhoto:String,
	driverLicense:String,
	driverAddress:String,
	driverMobile:Number,
	carModel:String,
	carregNo:String,
	cabType:String,
	carMake:String,
});

module.exports=mongoose.model('cabdetail',carSchema);
var mongoose=require('mongoose');
var tariffSchema=mongoose.Schema({
	carType:String,
	baseRate:String,
	normalRate:String,
	peakRate:String,
	startpeakTime:Date,
	endpeakTime:Date
});

module.exports=mongoose.model('tariff',tariffSchema);
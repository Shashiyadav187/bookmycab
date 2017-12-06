var mongoose=require('mongoose');
var userSchema= mongoose.Schema({
	role:String,
	password:String,
	firstName:String,
	lastName:String,
	mobileNum:Number,
	EmailID:String,
});

module.exports=mongoose.model('user',userSchema);
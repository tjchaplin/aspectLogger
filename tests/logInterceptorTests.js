var should = require('should');
var LogInterceptor = require("../lib/logInterceptor.js");

var objectToLog = function(){
	var self = this;
	self.logger = logger.create();

};

objectToLog.prototype.log = function(){
	var self = this;
	self.someMethod = self.logger.intercept(self.someMethod);
};

objectToLog.prototype.someMethod = function(value){
	value = 1;
	console.log("In some method"+JSON.stringify(value));

	return value+1;
};

var doStuff = function () {
	console.log("do stuff");
	return 1234;
}

describe('When action executing an action',function(){
	this.timeout(60000);

	// it("should do stuff",function(onComplete){
	// 	var 
	// 	onComplete();
	// });

	it("should do stuff",function(onComplete){
		
		var d = new LogInterceptor(doStuff);
		var result = d();

		console.log(JSON.stringify(result));
		//d();
		onComplete();
	});
});
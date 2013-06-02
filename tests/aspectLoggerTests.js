var should = require('should');
var AspectLogger = require("../lib/aspectLogger.js");

var ObjectToLog = function(){};

ObjectToLog.prototype.log = function(){
	var self = this;
	self.someMethod = self.logger.intercept(self.someMethod);
};

ObjectToLog.prototype.someMethod = function(value){
	console.log("In some method"+JSON.stringify(value));
	return value+1;
};

describe('Given using a Aspect Logger',function(){
	describe('When creating logging aspect',function(){
		it("should still return method results",function(onComplete){
			var objectToLog = AspectLogger.proxy(ObjectToLog);
			var result = objectToLog.someMethod(1);
			result.should.be.eql(2);
			onComplete();
		});
	});
});

 function ObjectToLog2(){
	var self = this;
	self = AspectLogger.proxy(self);
	return self;
};

ObjectToLog2.prototype.someMethod = function(value){
	console.log("In some method2"+JSON.stringify(value));
	return value+1;
};

describe('Given using a Aspect Logger',function(){
	describe('When creating logging aspect',function(){
		it("should still return method results",function(onComplete){
			var objectToLog = new ObjectToLog2();
			var result = objectToLog.someMethod(1);
			result.should.be.eql(2);
			onComplete();
		});
	});
});
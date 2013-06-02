var should = require('should');
var LogInterceptor = require("../lib/logInterceptor.js");

var objectToLog = function(){};

objectToLog.prototype.log = function(){
	var self = this;
	self.someMethod = self.logger.intercept(self.someMethod);
};

objectToLog.prototype.someMethod = function(value){
	value = 1;
	console.log("In some method"+JSON.stringify(value));

	return value+1;
};

function interceptorContext(){
	var self = this;
	self.logMessage = undefined;
	self.error = undefined;
	self.methodHasBeenCalled = false;
	self.debugHasBeenCalled = false;
	self.errorHasBeenCalled = false;

	self.logInterceptor = new LogInterceptor();
	self.logInterceptor.method = function(){self.methodHasBeenCalled = true;};
	self.logInterceptor.debug = function(message){self.debugHasBeenCalled = true; self.logMessage = message;};
	self.logInterceptor.error = function(error){self.errorHasBeenCalled = true; self.error = error;};

	return self;
};

describe('Given using a log interceptor',function(){
	describe('When has a method to log',function(){
		var context = new interceptorContext();

		it("should call method",function(onComplete){
			context.logInterceptor.functionInvocation();
			context.methodHasBeenCalled.should.be.eql(true);
			onComplete();
		});

		it("should call debug log",function(onComplete){
			context.logInterceptor.functionInvocation();
			context.debugHasBeenCalled.should.be.eql(true);
			onComplete();
		});
	});

	describe('When method to log throws an exception',function(){
		var context = new interceptorContext();
		context.logInterceptor.method = function(){throw new Error("Something bad happened.") };
		it("should throw error",function(onComplete){
			try{
				context.logInterceptor.functionInvocation();
			}catch(exception){
				onComplete();
			}	
		});

		it("should call error log",function(onComplete){
			try{
				context.logInterceptor.functionInvocation();
			}catch(exception){
				context.errorHasBeenCalled = true;
				onComplete();
			}	
		});

		it("error should be in error message",function(onComplete){
			try{
				context.logInterceptor.functionInvocation();
			}catch(exception){
				context.error.toString().indexOf(exception).should.be.greaterThan(-1);
				onComplete();
			}	
		});
	});
});
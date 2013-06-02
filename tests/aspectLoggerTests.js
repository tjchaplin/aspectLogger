var should = require('should');
var AspectLogger = require("../lib/aspectLogger.js");

// AspectLogger.bindLogger()
// AspectLogger.appender().bindLogger();
// AspectLogger.appender().bindLogger();
// AspectLogger.reset();
var TestAppender = function(){
	this.didAppend = false;
};
TestAppender.prototype.append = function(message){this.didAppend = true; this.message = message;} 	


describe('Given using a Aspect Logger',function(){
	describe('When creating logging aspect',function(){
		it("should return method results without modification",function(onComplete){
			AspectLogger.unBindLogger();

			function ObjectToLog(){};
			ObjectToLog.prototype.someMethod = function(){return 1;};
			var testAppender = new TestAppender();
			AspectLogger.appender(testAppender).bindLogger(ObjectToLog);
			var objectToLog = new ObjectToLog();
			var result = objectToLog.someMethod();
			result.should.be.eql(1);
			onComplete();
		});
	});
	describe('When removing the bound logger',function(){
		it("should not log",function(onComplete){
			AspectLogger.unBindLogger();

			function ObjectToLog(){};
			ObjectToLog.prototype.someMethod = function(){return 1;};
			var testAppender = new TestAppender();
			AspectLogger.appender(testAppender).bindLogger(ObjectToLog);
			AspectLogger.unBindLogger();

			var objectToLog = new ObjectToLog();
			objectToLog.someMethod();
			testAppender.didAppend.should.be.eql(false);
			onComplete();
		});
	});
	describe('When binding a logger',function(){
		it("should log",function(onComplete){
			AspectLogger.unBindLogger();

			function ObjectToLog(){};
			ObjectToLog.prototype.someMethod = function(){return 1;};
			var testAppender = new TestAppender();
			AspectLogger.appender(testAppender).bindLogger(ObjectToLog);

			var objectToLog = new ObjectToLog();
			objectToLog.someMethod();
			testAppender.didAppend.should.be.eql(true);
			onComplete();
		});
	});
});
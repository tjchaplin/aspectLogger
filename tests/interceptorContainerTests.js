var should = require('should');
var InterceptorContainer = require("../lib/interceptorContainer.js");
var Interceptor = require("../lib/interceptor.js");

function add1Interceptor() { };
add1Interceptor.prototype = Object.create(Interceptor.prototype);
add1Interceptor.prototype.functionInvocation = function(targetMethod, paramaters){
	var self = this;
	var result = self.proceed(targetMethod,paramaters);
	return result+1;
};

describe('Given an Interceptor Container',function(){

		describe('When registering an interceptor',function(){
			it("should call the interceptor",function(onComplete){
				InterceptorContainer.reset();
				function function1(){};
				function1.prototype.return1 = function(){return 1;}

				InterceptorContainer.register(new add1Interceptor()).forObject(function1);
				var f1 = new function1();
				var result = f1.return1();
				result.should.be.eql(2);

				onComplete();
			});
		});
		describe('When registering and then reseting the container',function(){
			it("should reset protoype of object",function(onComplete){
				InterceptorContainer.reset();
				function function1(){};
				function1.prototype.return1 = function(){return 1;}

				InterceptorContainer.register(new add1Interceptor()).forObject(function1);
				InterceptorContainer.reset();

				var after = new function1();
				var result = after.return1();
				result.should.be.eql(1);
				onComplete();
				
			});
		});

		describe('When registering two interceptors for the different objects',function(){
			InterceptorContainer.reset();

			it("should intercept both",function(onComplete){
				InterceptorContainer.reset();
				function function1(){};
				function1.prototype.return1 = function(){return 1;}

				function function2(){};
				function2.prototype.return2 = function(){return 2;}

				InterceptorContainer.register(new add1Interceptor()).forObject(function1);
				InterceptorContainer.register(new add1Interceptor()).forObject(function2);

				var f1 = new function1();
				var result = f1.return1();
				result.should.be.eql(2);

				var f2 = new function2();
				var result = f2.return2();
				result.should.be.eql(3);
				onComplete();
				
			});
		 });

		describe('When registering two interceptors for different objects then resetting',function(){
			InterceptorContainer.reset();

			it("should reset both",function(onComplete){
				InterceptorContainer.reset();
				function function1(){};
				function1.prototype.return1 = function(){return 1;}

				function function2(){};
				function2.prototype.return2 = function(){return 2;}

				InterceptorContainer.register(new add1Interceptor()).forObject(function1);
				InterceptorContainer.register(new add1Interceptor()).forObject(function2);
				InterceptorContainer.reset();

				var f1 = new function1();
				var result = f1.return1();
				result.should.be.eql(1);

				var f2 = new function2();
				var result = f2.return2();
				result.should.be.eql(2);
				onComplete();
				
			});
		 });
		describe('When registering two interceptors for the same object',function(){
			InterceptorContainer.reset();

			it("should throw",function(onComplete){
				InterceptorContainer.reset();
				function function1(){};
				function function2(){};

				try{
					InterceptorContainer.register(new add1Interceptor()).forObject(function1);
					InterceptorContainer.register(new add1Interceptor()).forObject(function1);
				}catch(exception){
					onComplete();
				}
				
			});
		 });

		describe('When registering a single interceptor for an object',function(){
			it("should not throw",function(onComplete){
				InterceptorContainer.reset();
				function function1(){};
				InterceptorContainer.register(new add1Interceptor()).forObject(function1);
				onComplete();				
			});
		 });


		describe('When registering an interceptor for an object instance',function(){

			it("should throw",function(onComplete){
				InterceptorContainer.reset();
				function function1(){};

				try{
					InterceptorContainer.register(new add1Interceptor()).forObject(new function1());
				}catch(exception){
					onComplete();
				}

				
			});
		 });
});
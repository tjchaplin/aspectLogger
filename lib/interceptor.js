var Interceptor = module.exports = exports = function(){
	var self = this;
	console.log("Interceptor");
	return self;
};

Interceptor.prototype.intercept = function(functionToIntercept){
	console.log("intercept");
	if(!functionToIntercept instanceof Function)
		return functionToIntercept;

	var logger = new Logger(functionToIntercept);
	return new Logger(functionToIntercept);
};
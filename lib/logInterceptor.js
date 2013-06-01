
var Interceptor = require("./interceptor.js");
var consoleAppender = require("./consoleAppender");

var LogInterceptor = module.exports = exports = function(method,appender){
	var self = this;
	self.method = method;

	if(!appender)
		appender = new consoleAppender();

	self.appender = appender;

	return function(){return self.functionInvocation(arguments);};
};

LogInterceptor.prototype = Object.create(Interceptor.prototype);

LogInterceptor.prototype.functionInvocation = function(){
	var self = this;
	try{
		if(!self.method instanceof Function)
			return self.method;

		self.logDebug(self.method.toString()+"\narguments:"+JSON.stringify(arguments[0])+"");
		var parameters = self.toArgumentArray(arguments[0]);

		var startTime = new Date();
		var result = self.method.apply(self,parameters);
		var endTime = new Date();

		self.logDebug("return:"+JSON.stringify(result));
		self.logDebug("execution time:"+(endTime-startTime));
		
		return result;
	}
	catch(exception){
		self.logError(exception);
		throw exception;
	}
}

LogInterceptor.prototype.logError = function(message){
	var self = this;
	self.appender.append(self.format(new Date(),message,"Error"));
};

LogInterceptor.prototype.logDebug = function(message){
	var self = this;
	self.appender.append(self.format(new Date(),message,"Debug"));
};

LogInterceptor.prototype.logInfo = function(message){
	var self = this;
	self.appender.append(self.format(new Date(),message,"Info"));
};

LogInterceptor.prototype.format = function(time,message,logType){
	return "["+time+"] - "+logType+" - "+message;
};

LogInterceptor.prototype.toArgumentArray = function(parametersObject){
	var parameters = new Array(); 
    for (var i = 0; i < parametersObject.length; i++) 
        parameters[i] = parametersObject[i]; 

    return parameters;
};
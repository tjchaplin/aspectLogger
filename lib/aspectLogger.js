var LogInterceptor = require("./logInterceptor.js");
var ConsoleAppender = require("./consoleAppender.js");
var InterceptorContainer = require("./interceptorContainer.js");

(function(){
	
	var logAppender  = new ConsoleAppender();
	exports.appender = function(appender){logAppender = appender; return exports;};

	exports.bindLogger = function(objectToLog){
		if(!objectToLog)
			throw new Error("Object to bind must be defined");

		if(!objectToLog.prototype)
			throw new Error("Object to bind logger must be a type not an instance");

		var logInterceptor = new LogInterceptor(logAppender);
		InterceptorContainer.register(logInterceptor).forObject(objectToLog);
		extendObjectWithLogMethods(objectToLog,logInterceptor);
	};

	var extendObjectWithLogMethods = function(objectToLog,logInterceptor){
		if(!objectToLog.prototype.info)
			objectToLog.prototype.info = function(message){logInterceptor.info(message);};

		if(!objectToLog.prototype.error)
			objectToLog.prototype.error = function(message){logInterceptor.error(message);};

		if(!objectToLog.prototype.debug)
			objectToLog.prototype.debug = function(message){logInterceptor.debug(message);};
	};
	exports.unBindLogger = function(){
		InterceptorContainer.reset();
	};

})(exports);
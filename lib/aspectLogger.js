var LogInterceptor = require("./logInterceptor.js");
var ConsoleAppender = require("./consoleAppender.js");
var InterceptorContainer = require("./interceptorContainer.js");

AspectLogger.bindLogger()
AspectLogger.appender().bindLogger();
AspectLogger.appender().bindLogger();

(function(){
	
	var logAppender  = new ConsoleAppender();
	exports.appender = function(appender){logAppender = appender;};

	exports.bindLogger = function(objectToLog){
		if(!objectToLog.prototype)
			throw new Error("Object to bind logger must be a type not an instance");

		var logInterceptor = new LogInterceptor(logAppender);
		InterceptorContainer.register(logInterceptor).forObject(objectToLog).resolve();
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

})(exports);
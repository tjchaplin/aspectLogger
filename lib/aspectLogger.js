module.exports.create = function(){
		console.log("create");
	return new LogInterceptor();
};

var LogInterceptor = function(){
	var self = this;
	console.log("LogInterceptor");
	return self;
};

LogInterceptor.prototype.intercept = function(functionToIntercept){
	console.log("intercept");
	if(!functionToIntercept instanceof Function)
		return functionToIntercept;

	var logger = new Logger(functionToIntercept);
	return new Logger(functionToIntercept);
};

var Logger = function(method){
	var self = this;
	self.method = method;
		console.log("Logger");

	return function(){return self.log(arguments);};
};

Logger.prototype.log = function(){
	var self = this;
		console.log("log");
	if(!self.method instanceof Function)
		return self.method;

	var startTime = new Date();
	console.log("["+startTime+"]"+"- Calling:\n"+self.method.toString()+" with:\n"+JSON.stringify(arguments[0]));

	var parameters = self.toArgumentArray(arguments[0]);
	
	var result = self.method.apply(self,parameters);

	var endTime = new Date();
	console.log("["+endTime+"]"+"-result:"+JSON.stringify(result));
	var timeSpan = endTime-startTime;
	console.log("["+new Date()+"]"+"-execution time:"+timeSpan);

	return result;
}

Logger.prototype.toArgumentArray = function(parametersObject){
	console.log(parametersObject);
	var parameters = new Array(); 
    for (var i = 0; i < parametersObject.length; i++) 
        parameters[i] = parametersObject[i]; 

    return parameters;
};
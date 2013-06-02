var Interceptor = module.exports = exports = function(){
	var self = this;

	return self;
};

Interceptor.prototype.functionInvocation = function(targetMethod,parameters){
	var self = this;
	try{
		
		if(!targetMethod)
			return targetMethod;

		if(!targetMethod instanceof Function)
			return targetMethod;

		var result = self.proceed(parameters,targetMethod);
		
		return result;

	}catch(exception){
		throw exception;
	}
}

Interceptor.prototype.proceed = function(targetMethod,parameters){
	var self = this;

	var parameters = self.toArgumentArray(parameters[0]);
	var result = targetMethod.apply(self,parameters);
	return result;
};

Interceptor.prototype.toArgumentArray = function(parametersObject){
	if(!parametersObject)
		return parametersObject;

	var parameters = new Array(); 
    for (var i = 0; i < parametersObject.length; i++) 
        parameters[i] = parametersObject[i]; 

    return parameters;
};
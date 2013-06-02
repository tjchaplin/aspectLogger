(function(exports){
	var interceptors = {};
	var originalObects = {};
	exports.register = function(interceptor){
		var self = this;
		self.interceptor = interceptor;

		if(interceptor.prototype)
			self.interceptor = Object.create(interceptor.prototype);

		return { 
			interceptor : self.interceptor,
			objectToIntercept : null,
			forObject : function(objectToIntercept){		
				this.objectToIntercept = objectToIntercept;

				return this.createProxy(this.objectToIntercept);
			},
			createProxy : function(objectToIntercept){
				var self = this;

				if(!objectToIntercept.prototype)
					throw new Error("Object to intercept must be a type not an instance");

				if(hasInterceptor(objectToIntercept,self.interceptor))
					throw new Error("Unable to register multiple interceptors for an object");

				saveOldPrototype(objectToIntercept);
				for(var property in objectToIntercept.prototype){
					if(objectToIntercept.prototype[property] instanceof Function){
						if(self.interceptor.functionInvocation instanceof Function){
							var targetFunction = objectToIntercept.prototype[property];
							objectToIntercept.prototype[property] = function(){
								return self.interceptor.functionInvocation(targetFunction,arguments);
							};
						}
					}
				}

				registerInterceptorForObject(objectToIntercept,self.interceptor);

				return objectToIntercept;
			}
		};
	};
	var forEachObjectFunction = function(object,onFunctionFound){
		for(var property in object.prototype){
			if(object.prototype[property] instanceof Function){
				onFunctionFound(property);
			}
		}
	};
	var saveOldPrototype = function(object){
		var savedObject = function(){};
		forEachObjectFunction(object,function(property){
			savedObject.prototype[property] = object.prototype[property];
		});

		originalObects[getObjectName(object)] = {
			originalObect : object,
			savedObject : savedObject
		};
	};
	exports.reset = function(){
		for(var savedObject in originalObects){
			originalObects[savedObject].originalObect.prototype = Object.create(originalObects[savedObject].savedObject.prototype);
		};
		originalObects = {};
		interceptors = {};
	};
	var registerInterceptorForObject = function(objectToIntercept,interceptor){
		interceptors[getObjectName(objectToIntercept)] = getObjectName(interceptor);
	}
	var hasInterceptor = function(objectToIntercept,interceptor){
		var objectInterceptorName = interceptors[getObjectName(objectToIntercept)];
		if(objectInterceptorName=== undefined)
			return false;

		return objectInterceptorName === getObjectName(interceptor);
	};
	var getObjectName = function(object){
		var name = object.name;
		if(!name)
			name = object.constructor.name;

		return name;
	};
})(exports);

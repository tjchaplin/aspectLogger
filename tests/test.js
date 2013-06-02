var should = require('should');

var ObjectToLog = function(){};

ObjectToLog.prototype.log = function(){console.log("called log")};

describe('Given using a Aspect Logger',function(){
	describe('When creating logging aspect',function(){
		it("should still return method results",function(onComplete){
			// function a () {	};
			// a.prototype.newMethod = function(){console.log("new method")};
			// var b = new a();
			// b.newMethod();

			// function c (){};
			// c.prototype = Object.create(a.prototype);
			// a.prototype.newMethod2 = function(){console.log("new method2")};
			// a.prototype = Object.create(c.prototype);

			// var d = new a();
			// d.newMethod2();
			function a(){};
			a.prototype.newMethod = function(){console.log("new method")};
			function b(){};

			for(var property in a){
				if(a.prototype[property] instanceof Function){
					b.prototype[property] = a.prototype[property];
				}
			}
			a.prototype.newMethod2 = function(){console.log("new method2")};
			a.prototype = Object.create(b.prototype);
			var c = new a();
			c.newMethod2();
			onComplete();
		});
	});
});

// describe('Given using a Aspect Logger',function(){
// 	describe('When creating logging aspect',function(){
// 		it("should still return method results",function(onComplete){
// 			var o = new ObjectToLog();
// 			for(var p in o){

// 				console.log(ObjectToLog.prototype[p] instanceof Function);
// 				var existing = ObjectToLog.prototype[p];
// 				ObjectToLog.prototype[p] = function(){console.log("new");existing();};				
// 				console.log(p);
// 			}
// 			o.log();

// 			var n  = new ObjectToLog();
// 			n.log();
// 			onComplete();
// 		});
// 	});
// });


// describe('Given using a Aspect Logger',function(){
// 	describe('When creating logging aspect',function(){
// 		it("should still return method results",function(onComplete){
// 			ObjectToLog.prototype.myLog = function(){console.log("myLog")};
// 			var o = new ObjectToLog();
// 			o.myLog();
// 			onComplete();
// 		});
// 	});
// });

// describe('Given using a Aspect Logger',function(){
// 	describe('When creating logging aspect',function(){
// 		it("should still return method results",function(onComplete){
// 			var o = new ObjectToLog();
// 			o.myLog();
// 			onComplete();
// 		});
// 	});
// });
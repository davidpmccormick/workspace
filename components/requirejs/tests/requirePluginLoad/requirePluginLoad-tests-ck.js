var globals={};define("plug",{load:function(){throw new Error("Cannot dynamically load")}});define("app/test",[],function(){return{name:"test"}});define("app/test2",[],function(){return{name:"test2"}});define("plug!app/main",["!app/test","!app/test2"],function(e,t){return{name:"main",test:e,test2:t}});require(["plug!app/main"],function(e){globals.main=e});define("app/run",function(){});require({baseUrl:"./"},["app/run"],function(){require(["plug!app/main"],function(){doh.register("requirePluginLoad",[function(t){var n=globals.main;t.is("main",n.name);t.is("test",n.test.name);t.is("test2",n.test2.name)}]);doh.run()})});
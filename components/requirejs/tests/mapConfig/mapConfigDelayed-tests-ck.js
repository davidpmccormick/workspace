define("one",function(){return{name:"one"}});define("two",function(){return{name:"two"}});define("three",["one"],function(e){return{name:"three",one:e}});require([],function(){require({map:{"*":{one:"two"}}},["three"],function(e){doh.register("mapConfigDelayed",[function(n){n.is("three",e.name);n.is("two",e.one.name)}]);doh.run()})});define("app",function(){});
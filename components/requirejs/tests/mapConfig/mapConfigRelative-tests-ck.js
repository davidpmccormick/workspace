define("lib/b",[],{name:"b"});define("b1",[],{name:"b1"});define("lib/a",["./b"],function(e){return{name:"a",b:e}});require({map:{"lib/a":{"lib/b":"b1"}}},["lib/a"],function(e){doh.register("mapConfigRelative",[function(n){n.is("a",e.name);n.is("b1",e.b.name)}]);doh.run()});
require({baseUrl:requirejs.isBrowser?"./":"anon/",paths:{text:"../../../text/text",i18n:"../../../i18n/i18n"}},["require","magenta","red","blue","green","yellow","a","c"],function(e,t,n,r,i,s,o,u){doh.register("anonSimple",[function(l){l.is("redblue",t.name);l.is(requirejs.isBrowser?"./foo.html":"anon/foo.html",t.path);l.is("red",n.name);l.is("blue",r.name);l.is("green",i.name);l.is("yellow",s.name);l.is("a",o.name);l.is("sub/b",o.bName);l.is("c",u.name);l.is("a",u.aName);requirejs.isBrowser&&setTimeout(function(){e(["blue","red","magenta"],function(e,n){doh.register("anonSimpleCached",[function(i){i.is("red",n.name);i.is("blue",e.name);i.is("redblue",t.name);i.is("hello world",t.message)}]);doh.run()})},300)}]);doh.run()});
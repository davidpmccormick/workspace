require({baseUrl:requirejs.isBrowser?"./":"./circular/transpiler",paths:{text:"../../../../text/text",refine:"../../plugins/fromText/refine"}},["require","refine!a","refine!b","refine!d"],function(e,t,n,r){doh.register("circularTranspiler",[function(i){i.is("a",t.name);i.is("b",t.b.name);i.is("c",t.b.c.name);i.is("b",n.name);i.is("c",n.c.name);i.is("ed",r())}]);doh.run()});
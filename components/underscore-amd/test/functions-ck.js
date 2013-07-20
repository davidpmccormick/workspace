$(document).ready(function(){module("Functions");test("bind",function(){var e={name:"moe"},t=function(e){return"name: "+(this.name||e)},n=_.bind(t,e);equal(n(),"name: moe","can bind a function to a context");n=_(t).bind(e);equal(n(),"name: moe","can do OO-style binding");n=_.bind(t,null,"curly");equal(n(),"name: curly","can bind without specifying a context");t=function(e,t){return e+": "+t};t=_.bind(t,this,"hello");equal(t("moe"),"hello: moe","the function was partially applied in advance");t=_.bind(t,this,"curly");equal(t(),"hello: curly","the function was completely applied in advance");t=function(e,t,n){return e+": "+t+" "+n};t=_.bind(t,this,"hello","moe","curly");equal(t(),"hello: moe curly","the function was partially applied in advance and can accept multiple arguments");t=function(e,t){equal(this,e,t)};_.bind(t,0,0,"can bind a function to `0`")();_.bind(t,"","","can bind a function to an empty string")();_.bind(t,!1,!1,"can bind a function to `false`")();var r=function(){return this},i=_.bind(r,{hello:"moe curly"}),s=new i;equal(s.hello,undefined,"function should not be bound to the context, to comply with ECMAScript 5");equal(i().hello,"moe curly","When called without the new operator, it's OK to be bound to the context");ok(s instanceof r,"a bound instance is an instance of the original function")});test("partial",function(){var e={name:"moe"},t=function(){return this.name+" "+_.toArray(arguments).join(" ")};e.func=_.partial(t,"a","b");equal(e.func("c","d"),"moe a b c d","can partially apply")});test("bindAll",function(){var e={name:"curly"},t={name:"moe",getName:function(){return"name: "+this.name},sayHi:function(){return"hi: "+this.name}};e.getName=t.getName;_.bindAll(t,"getName","sayHi");e.sayHi=t.sayHi;equal(e.getName(),"name: curly","unbound function is bound to current object");equal(e.sayHi(),"hi: moe","bound function is still bound to original object");e={name:"curly"};t={name:"moe",getName:function(){return"name: "+this.name},sayHi:function(){return"hi: "+this.name}};raises(function(){_.bindAll(t)},Error,"throws an error for bindAll with no functions named");_.bindAll(t,"sayHi");e.sayHi=t.sayHi;equal(e.sayHi(),"hi: moe")});test("memoize",function(){var e=function(t){return t<2?t:e(t-1)+e(t-2)};equal(e(10),55,"a memoized version of fibonacci produces identical results");e=_.memoize(e);equal(e(10),55,"a memoized version of fibonacci produces identical results");var t=function(e){return e},n=_.memoize(t);equal(t("toString"),"toString","checks hasOwnProperty");equal(n("toString"),"toString","checks hasOwnProperty")});asyncTest("delay",2,function(){var e=!1;_.delay(function(){e=!0},100);setTimeout(function(){ok(!e,"didn't delay the function quite yet")},50);setTimeout(function(){ok(e,"delayed the function");start()},150)});asyncTest("defer",1,function(){var e=!1;_.defer(function(t){e=t},!0);_.delay(function(){ok(e,"deferred the function");start()},50)});asyncTest("throttle",2,function(){var e=0,t=function(){e++},n=_.throttle(t,32);n();n();equal(e,1,"incr was called immediately");_.delay(function(){equal(e,2,"incr was throttled");start()},64)});asyncTest("throttle arguments",2,function(){var e=0,t=function(t){e=t},n=_.throttle(t,32);n(1);n(2);_.delay(function(){n(3)},64);equal(e,1,"updated to latest value");_.delay(function(){equal(e,3,"updated to latest value");start()},96)});asyncTest("throttle once",2,function(){var e=0,t=function(){return++e},n=_.throttle(t,32),r=n();_.delay(function(){equal(r,1,"throttled functions return their value");equal(e,1,"incr was called once");start()},64)});asyncTest("throttle twice",1,function(){var e=0,t=function(){e++},n=_.throttle(t,32);n();n();_.delay(function(){equal(e,2,"incr was called twice");start()},64)});asyncTest("more throttling",3,function(){var e=0,t=function(){e++},n=_.throttle(t,30);n();n();ok(e==1);_.delay(function(){ok(e==2);n();ok(e==3);start()},85)});asyncTest("throttle repeatedly with results",6,function(){var e=0,t=function(){return++e},n=_.throttle(t,64),r=[],i=function(){r.push(n())};i();i();_.delay(i,32);_.delay(i,80);_.delay(i,96);_.delay(i,144);_.delay(function(){equal(r[0],1,"incr was called once");equal(r[1],1,"incr was throttled");equal(r[2],1,"incr was throttled");equal(r[3],2,"incr was called twice");equal(r[4],2,"incr was throttled");equal(r[5],3,"incr was called trailing");start()},192)});asyncTest("throttle triggers trailing call when invoked repeatedly",2,function(){var e=0,t=48,n=function(){e++},r=_.throttle(n,32),i=new Date;while(new Date-i<t)r();var s=e;ok(e>1);_.delay(function(){ok(e>s);start()},96)});asyncTest("throttle does not trigger leading call when leading is set to false",2,function(){var e=0,t=function(){e++},n=_.throttle(t,60,{leading:!1});n();n();ok(e===0);_.delay(function(){ok(e==1);start()},96)});asyncTest("more throttle does not trigger leading call when leading is set to false",3,function(){var e=0,t=function(){e++},n=_.throttle(t,100,{leading:!1});n();_.delay(n,50);_.delay(n,60);_.delay(n,200);ok(e===0);_.delay(function(){ok(e==1)},250);_.delay(function(){ok(e==2);start()},350)});asyncTest("one more throttle with leading: false test",2,function(){var e=0,t=function(){e++},n=_.throttle(t,100,{leading:!1}),r=new Date;while(new Date-r<350)n();ok(e===3);_.delay(function(){equal(e,4);start()},200)});asyncTest("throttle does not trigger trailing call when trailing is set to false",4,function(){var e=0,t=function(){e++},n=_.throttle(t,60,{trailing:!1});n();n();n();ok(e===1);_.delay(function(){ok(e==1);n();n();ok(e==2);_.delay(function(){ok(e==2);start()},96)},96)});asyncTest("debounce",1,function(){var e=0,t=function(){e++},n=_.debounce(t,32);n();n();_.delay(n,16);_.delay(function(){equal(e,1,"incr was debounced");start()},96)});asyncTest("debounce asap",4,function(){var e,t,n=0,r=function(){return++n},i=_.debounce(r,64,!0);e=i();t=i();equal(e,1);equal(t,1);equal(n,1,"incr was called immediately");_.delay(i,16);_.delay(i,32);_.delay(i,48);_.delay(function(){equal(n,1,"incr was debounced");start()},128)});asyncTest("debounce asap recursively",2,function(){var e=0,t=_.debounce(function(){e++;e<10&&t()},32,!0);t();equal(e,1,"incr was called immediately");_.delay(function(){equal(e,1,"incr was debounced");start()},96)});test("once",function(){var e=0,t=_.once(function(){e++});t();t();equal(e,1)});test("Recursive onced function.",1,function(){var e=_.once(function(){ok(!0);e()});e()});test("wrap",function(){var e=function(e){return"hi: "+e},t=_.wrap(e,function(e,t){return e(t)+" "+t.split("").reverse().join("")});equal(t("moe"),"hi: moe eom","wrapped the salutation function");var n=function(){return"Hello "},r={name:"Moe"};r.hi=_.wrap(n,function(e){return e()+this.name});equal(r.hi(),"Hello Moe");var i=function(){},s=_.wrap(i,function(e){return Array.prototype.slice.call(arguments,0)}),o=s(["whats","your"],"vector","victor");deepEqual(o,[i,["whats","your"],"vector","victor"])});test("compose",function(){var e=function(e){return"hi: "+e},t=function(e){return e+"!"},n=_.compose(t,e);equal(n("moe"),"hi: moe!","can compose a function that takes another");n=_.compose(e,t);equal(n("moe"),"hi: moe!","in this case, the functions are also commutative")});test("after",function(){var e=function(e,t){var n=0,r=_.after(e,function(){n++});while(t--)r();return n};equal(e(5,5),1,"after(N) should fire after being called N times");equal(e(5,4),0,"after(N) should not fire unless called N times");equal(e(0,0),0,"after(0) should not fire immediately");equal(e(0,1),1,"after(0) should fire when first invoked")})});
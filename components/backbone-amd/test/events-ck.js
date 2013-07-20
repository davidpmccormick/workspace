$(document).ready(function(){module("Backbone.Events");test("on and trigger",2,function(){var e={counter:0};_.extend(e,Backbone.Events);e.on("event",function(){e.counter+=1});e.trigger("event");equal(e.counter,1,"counter should be incremented.");e.trigger("event");e.trigger("event");e.trigger("event");e.trigger("event");equal(e.counter,5,"counter should be incremented five times.")});test("binding and triggering multiple events",4,function(){var e={counter:0};_.extend(e,Backbone.Events);e.on("a b c",function(){e.counter+=1});e.trigger("a");equal(e.counter,1);e.trigger("a b");equal(e.counter,3);e.trigger("c");equal(e.counter,4);e.off("a c");e.trigger("a b c");equal(e.counter,5)});test("binding and triggering with event maps",function(){var e={counter:0};_.extend(e,Backbone.Events);var t=function(){this.counter+=1};e.on({a:t,b:t,c:t},e);e.trigger("a");equal(e.counter,1);e.trigger("a b");equal(e.counter,3);e.trigger("c");equal(e.counter,4);e.off({a:t,c:t},e);e.trigger("a b c");equal(e.counter,5)});test("listenTo and stopListening",1,function(){var e=_.extend({},Backbone.Events),t=_.extend({},Backbone.Events);e.listenTo(t,"all",function(){ok(!0)});t.trigger("anything");e.listenTo(t,"all",function(){ok(!1)});e.stopListening();t.trigger("anything")});test("listenTo and stopListening with event maps",4,function(){var e=_.extend({},Backbone.Events),t=_.extend({},Backbone.Events),n=function(){ok(!0)};e.listenTo(t,{event:n});t.trigger("event");e.listenTo(t,{event2:n});t.on("event2",n);e.stopListening(t,{event2:n});t.trigger("event event2");e.stopListening();t.trigger("event event2")});test("stopListening with omitted args",2,function(){var e=_.extend({},Backbone.Events),t=_.extend({},Backbone.Events),n=function(){ok(!0)};e.listenTo(t,"event",n);t.on("event",n);e.listenTo(t,"event2",n);e.stopListening(null,{event:n});t.trigger("event event2");t.off();e.listenTo(t,"event event2",n);e.stopListening(null,"event");e.stopListening();t.trigger("event2")});test("listenToOnce and stopListening",1,function(){var e=_.extend({},Backbone.Events),t=_.extend({},Backbone.Events);e.listenToOnce(t,"all",function(){ok(!0)});t.trigger("anything");t.trigger("anything");e.listenToOnce(t,"all",function(){ok(!1)});e.stopListening();t.trigger("anything")});test("listenTo, listenToOnce and stopListening",1,function(){var e=_.extend({},Backbone.Events),t=_.extend({},Backbone.Events);e.listenToOnce(t,"all",function(){ok(!0)});t.trigger("anything");t.trigger("anything");e.listenTo(t,"all",function(){ok(!1)});e.stopListening();t.trigger("anything")});test("listenTo and stopListening with event maps",1,function(){var e=_.extend({},Backbone.Events),t=_.extend({},Backbone.Events);e.listenTo(t,{change:function(){ok(!0)}});t.trigger("change");e.listenTo(t,{change:function(){ok(!1)}});e.stopListening();t.trigger("change")});test("listenTo yourself",1,function(){var e=_.extend({},Backbone.Events);e.listenTo(e,"foo",function(){ok(!0)});e.trigger("foo")});test("listenTo yourself cleans yourself up with stopListening",1,function(){var e=_.extend({},Backbone.Events);e.listenTo(e,"foo",function(){ok(!0)});e.trigger("foo");e.stopListening();e.trigger("foo")});test("listenTo with empty callback doesn't throw an error",1,function(){var e=_.extend({},Backbone.Events);e.listenTo(e,"foo",null);e.trigger("foo");ok(!0)});test("trigger all for each event",3,function(){var e,t,n={counter:0};_.extend(n,Backbone.Events);n.on("all",function(r){n.counter++;r=="a"&&(e=!0);r=="b"&&(t=!0)}).trigger("a b");ok(e);ok(t);equal(n.counter,2)});test("on, then unbind all functions",1,function(){var e={counter:0};_.extend(e,Backbone.Events);var t=function(){e.counter+=1};e.on("event",t);e.trigger("event");e.off("event");e.trigger("event");equal(e.counter,1,"counter should have only been incremented once.")});test("bind two callbacks, unbind only one",2,function(){var e={counterA:0,counterB:0};_.extend(e,Backbone.Events);var t=function(){e.counterA+=1};e.on("event",t);e.on("event",function(){e.counterB+=1});e.trigger("event");e.off("event",t);e.trigger("event");equal(e.counterA,1,"counterA should have only been incremented once.");equal(e.counterB,2,"counterB should have been incremented twice.")});test("unbind a callback in the midst of it firing",1,function(){var e={counter:0};_.extend(e,Backbone.Events);var t=function(){e.counter+=1;e.off("event",t)};e.on("event",t);e.trigger("event");e.trigger("event");e.trigger("event");equal(e.counter,1,"the callback should have been unbound.")});test("two binds that unbind themeselves",2,function(){var e={counterA:0,counterB:0};_.extend(e,Backbone.Events);var t=function(){e.counterA+=1;e.off("event",t)},n=function(){e.counterB+=1;e.off("event",n)};e.on("event",t);e.on("event",n);e.trigger("event");e.trigger("event");e.trigger("event");equal(e.counterA,1,"counterA should have only been incremented once.");equal(e.counterB,1,"counterB should have only been incremented once.")});test("bind a callback with a supplied context",1,function(){var e=function(){return this};e.prototype.assertTrue=function(){ok(!0,"`this` was bound to the callback")};var t=_.extend({},Backbone.Events);t.on("event",function(){this.assertTrue()},new e);t.trigger("event")});test("nested trigger with unbind",1,function(){var e={counter:0};_.extend(e,Backbone.Events);var t=function(){e.counter+=1;e.off("event",t);e.trigger("event")},n=function(){e.counter+=1};e.on("event",t);e.on("event",n);e.trigger("event");equal(e.counter,3,"counter should have been incremented three times")});test("callback list is not altered during trigger",2,function(){var e=0,t=_.extend({},Backbone.Events),n=function(){e++};t.on("event",function(){t.on("event",n).on("all",n)}).trigger("event");equal(e,0,"bind does not alter callback list");t.off().on("event",function(){t.off("event",n).off("all",n)}).on("event",n).on("all",n).trigger("event");equal(e,2,"unbind does not alter callback list")});test("#1282 - 'all' callback list is retrieved after each event.",1,function(){var e=0,t=_.extend({},Backbone.Events),n=function(){e++};t.on("x",function(){t.on("y",n).on("all",n)}).trigger("x y");strictEqual(e,2)});test("if no callback is provided, `on` is a noop",0,function(){_.extend({},Backbone.Events).on("test").trigger("test")});test("if callback is truthy but not a function, `on` should throw an error just like jQuery",1,function(){var e=_.extend({},Backbone.Events).on("test","noop");throws(function(){e.trigger("test")})});test("remove all events for a specific context",4,function(){var e=_.extend({},Backbone.Events);e.on("x y all",function(){ok(!0)});e.on("x y all",function(){ok(!1)},e);e.off(null,null,e);e.trigger("x y")});test("remove all events for a specific callback",4,function(){var e=_.extend({},Backbone.Events),t=function(){ok(!0)},n=function(){ok(!1)};e.on("x y all",t);e.on("x y all",n);e.off(null,n);e.trigger("x y")});test("#1310 - off does not skip consecutive events",0,function(){var e=_.extend({},Backbone.Events);e.on("event",function(){ok(!1)},e);e.on("event",function(){ok(!1)},e);e.off(null,null,e);e.trigger("event")});test("once",2,function(){var e={counterA:0,counterB:0};_.extend(e,Backbone.Events);var t=function(){e.counterA+=1;e.trigger("event")},n=function(){e.counterB+=1};e.once("event",t);e.once("event",n);e.trigger("event");equal(e.counterA,1,"counterA should have only been incremented once.");equal(e.counterB,1,"counterB should have only been incremented once.")});test("once variant one",3,function(){var e=function(){ok(!0)},t=_.extend({},Backbone.Events).once("event",e),n=_.extend({},Backbone.Events).on("event",e);t.trigger("event");n.trigger("event");n.trigger("event")});test("once variant two",3,function(){var e=function(){ok(!0)},t=_.extend({},Backbone.Events);t.once("event",e).on("event",e).trigger("event").trigger("event")});test("once with off",0,function(){var e=function(){ok(!0)},t=_.extend({},Backbone.Events);t.once("event",e);t.off("event",e);t.trigger("event")});test("once with event maps",function(){var e={counter:0};_.extend(e,Backbone.Events);var t=function(){this.counter+=1};e.once({a:t,b:t,c:t},e);e.trigger("a");equal(e.counter,1);e.trigger("a b");equal(e.counter,2);e.trigger("c");equal(e.counter,3);e.trigger("a b c");equal(e.counter,3)});test("once with off only by context",0,function(){var e={},t=_.extend({},Backbone.Events);t.once("event",function(){ok(!1)},e);t.off(null,null,e);t.trigger("event")});test("Backbone object inherits Events",function(){ok(Backbone.on===Backbone.Events.on)});asyncTest("once with asynchronous events",1,function(){var e=_.debounce(function(){ok(!0);start()},50),t=_.extend({},Backbone.Events).once("async",e);t.trigger("async");t.trigger("async")});test("once with multiple events.",2,function(){var e=_.extend({},Backbone.Events);e.once("x y",function(){ok(!0)});e.trigger("x y")});test("Off during iteration with once.",2,function(){var e=_.extend({},Backbone.Events),t=function(){this.off("event",t)};e.on("event",t);e.once("event",function(){});e.on("event",function(){ok(!0)});e.trigger("event");e.trigger("event")});test("`once` on `all` should work as expected",1,function(){Backbone.once("all",function(){ok(!0);Backbone.trigger("all")});Backbone.trigger("all")});test("once without a callback is a noop",0,function(){_.extend({},Backbone.Events).once("event").trigger("event")});test("event functions are chainable",function(){var e=_.extend({},Backbone.Events),t=_.extend({},Backbone.Events),n=function(){};equal(e,e.trigger("noeventssetyet"));equal(e,e.off("noeventssetyet"));equal(e,e.stopListening("noeventssetyet"));equal(e,e.on("a",n));equal(e,e.once("c",n));equal(e,e.trigger("a"));equal(e,e.listenTo(t,"a",n));equal(e,e.listenToOnce(t,"b",n));equal(e,e.off("a c"));equal(e,e.stopListening(t,"a"));equal(e,e.stopListening())})});
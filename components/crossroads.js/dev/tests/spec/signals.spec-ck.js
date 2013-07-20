/*jshint onevar:false *///for node
var crossroads=crossroads||require("../../../dist/crossroads");describe("crossroads Signals",function(){afterEach(function(){crossroads.resetState();crossroads.removeAllRoutes();crossroads.bypassed.removeAll();crossroads.routed.removeAll()});it("should dispatch bypassed if don't match any route",function(){var e=0,t=[],n=crossroads.addRoute("/{foo}_{bar}");n.matched.add(function(e,t){expect(null).toEqual("fail: shouldn't match")});crossroads.bypassed.add(function(n){t.push(n);e++});crossroads.parse("/lorem/ipsum");crossroads.parse("/foo/bar");expect(t[0]).toBe("/lorem/ipsum");expect(t[1]).toBe("/foo/bar");expect(e).toBe(2)});it("should dispatch routed at each match",function(){var e=0,t=[],n=0,r,i,s=crossroads.addRoute("/{foo}_{bar}");s.matched.add(function(t,n){e++});crossroads.bypassed.add(function(e){t.push(e);n++});crossroads.routed.add(function(n,o){t.push(n);e++;expect(n).toBe("/foo_bar");expect(o.route).toBe(s);expect(o.params[0]).toEqual("foo");expect(o.params[1]).toEqual("bar");r=!0;i=o.isFirst});crossroads.parse("/lorem/ipsum");crossroads.parse("/foo_bar");expect(t[0]).toBe("/lorem/ipsum");expect(t[1]).toBe("/foo_bar");expect(e).toBe(2);expect(n).toBe(1);expect(r).toEqual(!0);expect(i).toEqual(!0)});it("should not dispatch routed/bypassed/matched twice for same request multiple times in a row",function(){var e=[],t=[],n=[],r=[],i=crossroads.addRoute("/{foo}_{bar}");i.matched.add(function(e,t){n.push(e,t)});i.switched.add(function(e){r.push(e)});crossroads.bypassed.add(function(t){e.push(t)});crossroads.routed.add(function(e,n){t.push(e);expect(n.route).toBe(i)});crossroads.parse("/lorem/ipsum");crossroads.parse("/foo_bar");crossroads.parse("/foo_bar");crossroads.parse("/lorem_ipsum");crossroads.parse("/dolor");crossroads.parse("/dolor");crossroads.parse("/lorem_ipsum");crossroads.parse("/lorem_ipsum");crossroads.parse("/lorem_ipsum");expect(t).toEqual(["/foo_bar","/lorem_ipsum"]);expect(e).toEqual(["/lorem/ipsum","/dolor"]);expect(r).toEqual([]);expect(n).toEqual(["foo","bar","lorem","ipsum"])});it("should dispatch routed/bypassed/matched twice for same request if calling resetState() in between",function(){var e=[],t=[],n=[],r=[],i=crossroads.addRoute("/{foo}_{bar}");i.matched.add(function(e,t){n.push(e,t)});i.switched.add(function(e){r.push(e)});var s=crossroads.addRoute("/maecennas");s.matched.add(function(){n.push("maecennas")});s.switched.add(function(e){r.push(e)});crossroads.bypassed.add(function(t){e.push(t)});crossroads.routed.add(function(e,n){t.push(e)});crossroads.parse("/lorem/ipsum");crossroads.parse("/foo_bar");crossroads.resetState();crossroads.parse("/foo_bar");crossroads.parse("/lorem_ipsum");crossroads.parse("/dolor");crossroads.resetState();crossroads.parse("/dolor");crossroads.parse("/lorem_ipsum");crossroads.parse("/maecennas");crossroads.parse("/lorem_ipsum");crossroads.parse("/lorem_ipsum");expect(t).toEqual(["/foo_bar","/foo_bar","/lorem_ipsum","/lorem_ipsum","/maecennas","/lorem_ipsum"]);expect(e).toEqual(["/lorem/ipsum","/dolor","/dolor"]);expect(r).toEqual(["/maecennas","/lorem_ipsum"]);expect(n).toEqual(["foo","bar","foo","bar","lorem","ipsum","lorem","ipsum","maecennas","lorem","ipsum"])});it("should dispatch routed/bypassed/matched multiple times for same request if ignoreState == true",function(){var e=[],t=[],n=[],r=[];crossroads.ignoreState=!0;var i=crossroads.addRoute("/{foo}_{bar}");i.matched.add(function(e,t){n.push(e,t)});i.switched.add(function(e){r.push(e)});crossroads.bypassed.add(function(t){e.push(t)});crossroads.routed.add(function(e,n){t.push(e);expect(n.route).toBe(i)});crossroads.parse("/lorem/ipsum");crossroads.parse("/foo_bar");crossroads.parse("/foo_bar");crossroads.parse("/lorem_ipsum");crossroads.parse("/dolor");crossroads.parse("/dolor");crossroads.parse("/lorem_ipsum");crossroads.parse("/lorem_ipsum");expect(t).toEqual(["/foo_bar","/foo_bar","/lorem_ipsum","/lorem_ipsum","/lorem_ipsum"]);expect(e).toEqual(["/lorem/ipsum","/dolor","/dolor"]);expect(r).toEqual([]);expect(n).toEqual(["foo","bar","foo","bar","lorem","ipsum","lorem","ipsum","lorem","ipsum"])});it("isFirst should be false on greedy matches",function(){var e=0,t=[];crossroads.routed.add(function(n,r){e+=1;t.push(r.isFirst)});crossroads.addRoute("/{a}/{b}");crossroads.addRoute("/{a}/{b}").greedy=!0;crossroads.addRoute("/{a}/{b}").greedy=!0;crossroads.parse("/foo/bar");expect(e).toEqual(3);expect(t[0]).toEqual(!0);expect(t[1]).toEqual(!1);expect(t[2]).toEqual(!1)});it("should dispatch `switched` when matching another route",function(){var e=0,t=[],n,r=crossroads.addRoute("/{a}",function(n){t.push(n);e+=1});r.switched.add(function(r){t.push("SWITCH");n=r;e+=1});var i=crossroads.addRoute("/foo/{a}",function(n){t.push(n);e+=1});crossroads.parse("/foo");crossroads.parse("/dolor");crossroads.parse("/foo/bar");expect(e).toBe(4);expect(t).toEqual(["foo","dolor","SWITCH","bar"]);expect(n).toEqual("/foo/bar")})});
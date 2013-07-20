/*global YUI:false, signals:false, window:false *//*jshint onevar:false, asi:true */YUI().use("node","console","test",function(e){var t=new e.Test.Case({name:"Basic Test",_should:{ignore:{},error:{testAddNull:"listener is a required param of add() and should be a Function.",testAddOnceNull:"listener is a required param of addOnce() and should be a Function.",testAddSameListenerMixed1:"You cannot add() then addOnce() the same listener without removing the relationship first.",testAddSameListenerMixed2:"You cannot addOnce() then add() the same listener without removing the relationship first.",testRemoveNull:"listener is a required param of remove() and should be a Function.",testBindingDispose:"b1.dispose is not a function",testDispose1:!0,testDispose2:!0,testDispose3:!0,testDispose4:!0}},setUp:function(){this.signal=new signals.Signal},tearDown:function(){delete this.signal},testSignalType:function(){var t=this.signal;e.Assert.isObject(t);e.Assert.isInstanceOf(signals.Signal,t)},testNumListeners0:function(){var t=this.signal;e.Assert.areSame(0,t.getNumListeners())},testAlias:function(){e.Assert.areSame(signals,signals.Signal)},testAddSingle:function(){var t=this.signal;t.add(function(){});e.Assert.areSame(1,t.getNumListeners())},testAddDouble:function(){var t=this.signal;t.add(function(){});t.add(function(){});e.Assert.areSame(2,t.getNumListeners())},testAddDoubleSameListener:function(){var t=this.signal,n=function(){};t.add(n);t.add(n);e.Assert.areSame(1,t.getNumListeners())},testAddDoubleSameListenerDiffContext:function(){var t=this.signal,n=function(){};t.add(n);t.add(n,{});e.Assert.areSame(2,t.getNumListeners())},testAddNull:function(){var t=this.signal;t.add();e.Assert.areSame(0,t.getNumListeners())},testHasListener:function(){var t=this.signal,n=function(){};t.add(n);e.Assert.areSame(!0,t.has(n))},testAddOnce:function(){var t=this.signal;t.addOnce(function(){});e.Assert.areSame(1,t.getNumListeners())},testAddOnceDouble:function(){var t=this.signal;t.addOnce(function(){});t.addOnce(function(){});e.Assert.areSame(2,t.getNumListeners())},testAddOnceSameDouble:function(){var t=this.signal,n=function(){};t.addOnce(n);t.addOnce(n);e.Assert.areSame(1,t.getNumListeners())},testAddOnceNull:function(){var t=this.signal;t.addOnce();e.Assert.areSame(0,t.getNumListeners())},testAddSameListenerMixed1:function(){var e=this.signal,t=function(){};e.add(t);e.addOnce(t)},testAddSameListenerMixed2:function(){var e=this.signal,t=function(){};e.addOnce(t);e.add(t)},testDispatchSingleListener:function(){var t=this.signal,n=0,r=function(){n++};t.add(r);t.dispatch();e.Assert.areSame(1,n)},testDispatchDoubleListeners:function(){var t=this.signal,n=0,r=function(){n++},i=function(){n++};t.add(r);t.add(i);t.dispatch();e.Assert.areSame(2,n)},testDispatchDoubleListeners2:function(){var t=this.signal,n="",r=function(){n+="a"},i=function(){n+="b"};t.add(r);t.add(i);t.dispatch();e.Assert.areSame("ab",n)},testDispatchMultipleListenersPriority:function(){var t=this.signal,n="",r=function(){n+="a"},i=function(){n+="b"},s=function(){n+="c"};t.add(r);t.add(i,null,1);t.add(s);t.dispatch();e.Assert.areSame("bac",n)},testDispatchMultipleListenersPriority2:function(){var t=this.signal,n="",r=function(){n+="a"},i=function(){n+="b"},s=function(){n+="c"};t.add(r,null,1);t.add(i,null,12);t.add(s,null,2);t.dispatch();e.Assert.areSame("bca",n)},testDispatchSingleListenerTwice:function(){var t=this.signal,n=0,r=function(){n++};t.add(r);t.dispatch();t.dispatch();e.Assert.areSame(2,n)},testDispatchDoubleListenersTwice:function(){var t=this.signal,n=0,r=function(){n++},i=function(){n++};t.add(r);t.add(i);t.dispatch();t.dispatch();e.Assert.areSame(4,n)},testDispatchScope:function(){var t=this.signal,n={n:0,sum:function(){this.n++}},r=function(){this.sum()};t.add(r,n);t.dispatch();e.Assert.areSame(1,n.n)},testDispatchScopeDouble:function(){var t=this.signal,n={n:0,sum:function(){this.n++}},r=function(){this.sum()},i=function(){this.sum()};t.add(r,n);t.add(i,n);t.dispatch();e.Assert.areSame(2,n.n)},testDispatchScopeDouble2:function(){var t=this.signal,n={n:0,sum:function(){this.n++}},r={n:0,sum:function(){this.n++}},i=function(){this.sum()},s=function(){this.sum()};t.add(i,n);t.add(s,r);t.dispatch();e.Assert.areSame(1,n.n);e.Assert.areSame(1,r.n)},testDispatchScopeTwice:function(){var t=this.signal,n={n:0,sum:function(){this.n++}},r=function(){this.sum()};t.add(r,n);t.dispatch();t.dispatch();e.Assert.areSame(2,n.n)},testDispatchScopeDoubleTwice:function(){var t=this.signal,n={n:0,sum:function(){this.n++}},r=function(){this.sum()},i=function(){this.sum()};t.add(r,n);t.add(i,n);t.dispatch();t.dispatch();e.Assert.areSame(4,n.n)},testDispatchScopeDouble2Twice:function(){var t=this.signal,n={n:0,sum:function(){this.n++}},r={n:0,sum:function(){this.n++}},i=function(){this.sum()},s=function(){this.sum()};t.add(i,n);t.add(s,r);t.dispatch();t.dispatch();e.Assert.areSame(2,n.n);e.Assert.areSame(2,r.n)},testDispatchAddOnceSingleListener:function(){var t=this.signal,n=0,r=function(){n++};t.addOnce(r);t.dispatch();e.Assert.areSame(1,n)},testDispatchAddOnceSingleListenerTwice:function(){var t=this.signal,n=0,r=function(){n++};t.addOnce(r);t.dispatch();t.dispatch();e.Assert.areSame(1,n)},testDispatchAddOnceDoubleListener:function(){var t=this.signal,n=0,r=function(){n++},i=function(){n++};t.addOnce(r);t.addOnce(i);t.dispatch();e.Assert.areSame(2,n)},testDispatchAddOnceDoubleListenerTwice:function(){var t=this.signal,n=0,r=function(){n++},i=function(){n++};t.addOnce(r);t.addOnce(i);e.Assert.areSame(2,t.getNumListeners());t.dispatch();t.dispatch();e.Assert.areSame(2,n)},testDispatchAddOnceScope:function(){var t=this.signal,n={n:0,sum:function(){this.n++}},r=function(){this.sum()};t.addOnce(r,n);t.dispatch();e.Assert.areSame(1,n.n)},testDispatchAddOnceScopeDouble:function(){var t=this.signal,n={n:0,sum:function(){this.n++}},r=function(){this.sum()},i=function(){this.sum()};t.addOnce(r,n);t.addOnce(i,n);t.dispatch();e.Assert.areSame(2,n.n)},testDispatchAddOnceScopeDouble2:function(){var t=this.signal,n={n:0,sum:function(){this.n++}},r={n:0,sum:function(){this.n++}},i=function(){this.sum()},s=function(){this.sum()};t.addOnce(i,n);t.addOnce(s,r);t.dispatch();e.Assert.areSame(1,n.n);e.Assert.areSame(1,r.n)},testDispatchAddOnceScopeTwice:function(){var t=this.signal,n={n:0,sum:function(){this.n++}},r=function(){this.sum()};t.addOnce(r,n);t.dispatch();t.dispatch();e.Assert.areSame(1,n.n)},testDispatchAddOnceScopeDoubleTwice:function(){var t=this.signal,n={n:0,sum:function(){this.n++}},r=function(){this.sum()},i=function(){this.sum()};t.addOnce(r,n);t.addOnce(i,n);t.dispatch();t.dispatch();e.Assert.areSame(2,n.n)},testDispatchAddOnceScopeDouble2Twice:function(){var t=this.signal,n={n:0,sum:function(){this.n++}},r={n:0,sum:function(){this.n++}},i=function(){this.sum()},s=function(){this.sum()};t.addOnce(i,n);t.addOnce(s,r);t.dispatch();t.dispatch();e.Assert.areSame(1,n.n);e.Assert.areSame(1,r.n)},testDispatchInvalidListener:function(){var t=this.signal,n=0,r=function(){n+=1},i=function(){n+=1;t.remove(r)};t.add(i);t.add(r);t.dispatch();e.Assert.areSame(1,n)},testDispatchInvalidContext:function(){var t=this.signal,n=0,r=function(){n++};t.add(r);t.dispatch.call(window);e.Assert.areSame(1,n)},testDispatchSingleListenerParams:function(){var t=this.signal,n=0,r=function(e){n+=e};t.add(r);t.dispatch(1);e.Assert.areSame(1,n)},testDispatchDoubleListenersParams:function(){var t=this.signal,n=0,r=function(e){n+=e},i=function(e){n+=e};t.add(r);t.add(i);t.dispatch(1);e.Assert.areSame(2,n)},testDispatchSingleListenerTwiceParams:function(){var t=this.signal,n=0,r=function(e,t){n+=e+t};t.add(r);t.dispatch(1,2);t.dispatch(3,4);e.Assert.areSame(10,n)},testDispatchDoubleListenersTwiceParams:function(){var t=this.signal,n=0,r=function(e,t){n+=e+t},i=function(e,t){n+=e+t};t.add(r);t.add(i);t.dispatch(2,2);t.dispatch(3,3);e.Assert.areSame(20,n)},testDispatchScopeParams:function(){var t=this.signal,n={n:0,sum:function(e,t,n){this.n=e+t+n}},r=function(e,t,n){this.sum(e,t,n)};t.add(r,n);t.dispatch(10,20,5);e.Assert.areSame(35,n.n)},testDispatchAddOnceSingleListenerParams:function(){var t=this.signal,n=0,r=function(e){n+=e};t.addOnce(r);t.dispatch(1);e.Assert.areSame(1,n)},testDispatchAddOnceDoubleListenersParams:function(){var t=this.signal,n=0,r=function(e){n+=e},i=function(e){n+=e};t.addOnce(r);t.addOnce(i);t.dispatch(1);e.Assert.areSame(2,n)},testDispatchAddOnceSingleListenerTwiceParams:function(){var t=this.signal,n=0,r=function(e,t){n+=e+t};t.addOnce(r);t.dispatch(1,2);t.dispatch(3,4);e.Assert.areSame(3,n)},testDispatchAddOnceDoubleListenersTwiceParams:function(){var t=this.signal,n=0,r=function(e,t){n+=e+t},i=function(e,t){n+=e+t};t.addOnce(r);t.addOnce(i);t.dispatch(2,2);t.dispatch(3,3);e.Assert.areSame(8,n)},testDispatchAddOnceScopeParams:function(){var t=this.signal,n={n:0,add:function(e,t,n){this.n=e+t+n}},r=function(e,t,n){this.add(e,t,n)};t.addOnce(r,n);t.dispatch(10,20,5);e.Assert.areSame(35,n.n)},testDispatchInvalidContextWithParams:function(){var t=this.signal,n=0,r=function(e,t){n+=e+t};t.add(r);t.dispatch.call(window,1,3);e.Assert.areSame(4,n)},testStopPropagation:function(){var t=this.signal,n=0,r=function(){n++},i=function(){return!1},s=function(){n++};t.add(r);t.add(i);t.add(s);t.dispatch();e.Assert.areSame(1,n)},testStopPropagation2:function(){var t=this.signal,n=0,r=function(){n++},i=function(){t.halt()},s=function(){n++};t.add(r);t.add(i);t.add(s);t.dispatch();e.Assert.areSame(1,n)},testStopPropagation3:function(){var t=this.signal;t.halt();var n=0,r=function(){n++},i=function(){n++},s=function(){n++};t.add(r);t.add(i);t.add(s);t.dispatch();e.Assert.areSame(3,n)},testEnableDisableSignal:function(){var t=this.signal,n=0,r=function(){n++},i=function(){n++},s=function(){n++};t.add(r);t.add(i);t.add(s);e.Assert.areSame(!0,t.active);t.dispatch();t.active=!1;e.Assert.areSame(!1,t.active);t.dispatch();t.active=!0;e.Assert.areSame(!0,t.active);t.dispatch();e.Assert.areSame(6,n)},testEnableDisableBinding:function(){var t=this.signal,n=0,r=function(){n++},i=function(){n++},s=function(){n++},o=t.add(r),u=t.add(i),a=t.add(s);e.Assert.areSame(!0,t.active);e.Assert.areSame(!0,u.active);t.dispatch();u.active=!1;e.Assert.areSame(!0,t.active);e.Assert.areSame(!1,u.active);t.dispatch();u.active=!0;e.Assert.areSame(!0,t.active);e.Assert.areSame(!0,u.active);t.dispatch();e.Assert.areSame(8,n)},testBindingsIsOnce:function(){var t=this.signal,n=t.addOnce(function(){});e.Assert.areSame(1,t.getNumListeners());e.Assert.areSame(!0,n.isOnce())},testBindingsIsOnce2:function(){var t=this.signal,n=t.addOnce(function(){}),r=t.addOnce(function(){});e.Assert.areSame(2,t.getNumListeners());e.Assert.areSame(!0,n.isOnce());e.Assert.areSame(!0,r.isOnce());e.Assert.areNotSame(n,r)},testBindingsIsOnce3:function(){var t=this.signal,n=function(){},r=t.addOnce(n),i=t.addOnce(n);e.Assert.areSame(1,t.getNumListeners());e.Assert.areSame(!0,r.isOnce());e.Assert.areSame(!0,i.isOnce());e.Assert.areSame(r,i)},testBindingsIsNotOnce:function(){var t=this.signal,n=t.add(function(){});e.Assert.areSame(1,t.getNumListeners());e.Assert.areSame(!1,n.isOnce())},testBindingsIsNotOnce2:function(){var t=this.signal,n=t.add(function(){}),r=t.add(function(){});e.Assert.areSame(2,t.getNumListeners());e.Assert.areSame(!1,n.isOnce());e.Assert.areSame(!1,r.isOnce());e.Assert.areNotSame(n,r)},testBindingsIsNotOnce3:function(){var t=this.signal,n=function(){},r=t.add(n),i=t.add(n);e.Assert.areSame(1,t.getNumListeners());e.Assert.areSame(!1,r.isOnce());e.Assert.areSame(!1,i.isOnce());e.Assert.areSame(r,i)},testBindingDetach:function(){var t=this.signal,n=t.add(function(){e.Assert.fail()});e.Assert.areSame(1,t.getNumListeners());n.detach();e.Assert.areSame(0,t.getNumListeners());t.dispatch()},testBindingDetachTwice:function(){var t=this.signal,n=t.add(function(){e.Assert.fail()});e.Assert.areSame(1,t.getNumListeners());n.detach();n.detach();e.Assert.areSame(0,t.getNumListeners());t.dispatch()},testBindingIsBound:function(){var t=this.signal,n=t.add(function(){e.Assert.fail()});e.Assert.areSame(1,t.getNumListeners());e.Assert.areSame(!0,n.isBound());n.detach();e.Assert.areSame(!1,n.isBound());e.Assert.areSame(0,t.getNumListeners());t.dispatch()},testBindingGetListener:function(){var t=this.signal,n=function(){},r=t.add(n);e.Assert.isUndefined(r.listener);e.Assert.areSame(1,t.getNumListeners());e.Assert.areSame(n,r.getListener())},testBindingContext:function(){var t=this.signal,n={n:0,sum:function(){this.n++}},r={n:0,sum:function(){this.n++}},i=function(){this.sum()},s=function(){this.sum()},o=t.add(i,n),u=t.add(s,r);t.dispatch();e.Assert.areSame(1,n.n);e.Assert.areSame(1,r.n);o.context=r;t.dispatch();e.Assert.areSame(1,n.n);e.Assert.areSame(3,r.n)},testBindingDispose:function(){var t=this.signal,n=t.add(function(){},{});e.Assert.areSame(1,t.getNumListeners());n.dispose();e.Assert.areSame(0,t.getNumListeners());e.Assert.isUndefined(n.listener);e.Assert.isUndefined(n.getListener());e.Assert.isUndefined(n.context)},testBindingCurry:function(){var t=this.signal,n,r,i,s=t.add(function(e,t,s){n=e;r=t;i=s});s.params=["foo","bar"];t.dispatch(123);e.Assert.areSame("foo",n,"curried param 1");e.Assert.areSame("bar",r,"curried param 2");e.Assert.areSame(123,i,"dispatched param")},testBindingCurry2:function(){var t=this.signal,n,r,i,s=t.add(function(e,t,s){n=e;r=t;i=s});s.params=["foo","bar"];t.dispatch();e.Assert.areSame("foo",n,"curried param 1");e.Assert.areSame("bar",r,"curried param 2");e.Assert.isUndefined(i,"dispatched param")},testBindingGetSignal:function(){var t=this.signal,n,r=t.add(function(e){n=e});e.Assert.areSame(t,r.getSignal(),"return Signal instance")},testRemoveSingle:function(){var t=this.signal,n=function(){e.Assert.fail()},r=t.add(n);t.remove(n);e.Assert.areSame(0,t.getNumListeners());t.dispatch()},testRemoveSingle2:function(){var t=this.signal,n=function(){e.Assert.fail()},r=t.add(n);t.remove(n);e.Assert.areSame(0,t.getNumListeners());e.Assert.isUndefined(r.listener);e.Assert.isUndefined(r.getListener());e.Assert.isUndefined(r.context);t.dispatch()},testRemoveSingleTwice:function(){var t=this.signal,n=function(){e.Assert.fail()};t.add(n);t.remove(n);t.remove(n);e.Assert.areSame(0,t.getNumListeners());t.dispatch()},testRemoveSingleTwice2:function(){var t=this.signal,n=function(){e.Assert.fail()};t.add(n);t.remove(n);e.Assert.areSame(0,t.getNumListeners());t.dispatch();t.remove(n);t.dispatch()},testRemoveDouble:function(){var t=this.signal,n=function(){e.Assert.fail()},r=function(){e.Assert.fail()};t.add(n);t.addOnce(r);t.remove(n);e.Assert.areSame(1,t.getNumListeners());t.remove(r);e.Assert.areSame(0,t.getNumListeners());t.dispatch()},testRemoveDoubleTwice:function(){var t=this.signal,n=function(){e.Assert.fail()},r=function(){e.Assert.fail()};t.add(n);t.add(r);t.remove(n);t.remove(n);e.Assert.areSame(1,t.getNumListeners());t.remove(r);t.remove(r);e.Assert.areSame(0,t.getNumListeners());t.dispatch()},testRemoveDoubleTwice2:function(){var t=this.signal,n=function(){e.Assert.fail()},r=function(){e.Assert.fail()};t.add(n);t.addOnce(r);t.remove(n);e.Assert.areSame(1,t.getNumListeners());t.remove(r);e.Assert.areSame(0,t.getNumListeners());t.dispatch();t.remove(n);t.remove(r);t.dispatch()},testRemoveAll:function(){var t=this.signal;t.add(function(){e.Assert.fail()});t.add(function(){e.Assert.fail()});t.addOnce(function(){e.Assert.fail()});t.add(function(){e.Assert.fail()});t.addOnce(function(){e.Assert.fail()});e.Assert.areSame(5,t.getNumListeners());t.removeAll();e.Assert.areSame(0,t.getNumListeners());t.dispatch()},testRemoveAll2:function(){var t=this.signal,n=t.add(function(){e.Assert.fail()}),r=t.add(function(){e.Assert.fail()}),i=t.addOnce(function(){e.Assert.fail()}),s=t.add(function(){e.Assert.fail()}),o=t.addOnce(function(){e.Assert.fail()});e.Assert.areSame(5,t.getNumListeners());t.removeAll();e.Assert.areSame(0,t.getNumListeners());e.Assert.isUndefined(n.listener);e.Assert.isUndefined(n.getListener());e.Assert.isUndefined(n.context);e.Assert.isUndefined(r.listener);e.Assert.isUndefined(r.getListener());e.Assert.isUndefined(r.context);e.Assert.isUndefined(i.listener);e.Assert.isUndefined(i.getListener());e.Assert.isUndefined(i.context);e.Assert.isUndefined(s.listener);e.Assert.isUndefined(s.getListener());e.Assert.isUndefined(s.context);e.Assert.isUndefined(o.listener);e.Assert.isUndefined(o.getListener());e.Assert.isUndefined(o.context);t.dispatch()},testRemoveAllTwice:function(){var t=this.signal;t.addOnce(function(){e.Assert.fail()});t.addOnce(function(){e.Assert.fail()});t.add(function(){e.Assert.fail()});t.add(function(){e.Assert.fail()});t.add(function(){e.Assert.fail()});e.Assert.areSame(5,t.getNumListeners());t.removeAll();t.removeAll();e.Assert.areSame(0,t.getNumListeners());t.dispatch()},testRemoveNull:function(){var t=this.signal,n=function(){e.Assert.fail()},r=t.add(n);t.remove();e.Assert.areSame(0,t.getNumListeners());t.dispatch()},testRemoveDiffContext:function(){var t=this.signal,n=function(){e.Assert.fail()},r={},i=t.add(n),s=t.add(n,r);e.Assert.areSame(2,t.getNumListeners());e.Assert.isUndefined(i.context);e.Assert.areSame(n,i.getListener());e.Assert.areSame(r,s.context);e.Assert.areSame(n,s.getListener());t.remove(n,r);e.Assert.isUndefined(s.context);e.Assert.isUndefined(s.getListener());e.Assert.isUndefined(i.context);e.Assert.areSame(n,i.getListener());e.Assert.areSame(1,t.getNumListeners());t.remove(n);e.Assert.areSame(0,t.getNumListeners());t.dispatch()},testRemoveDiffContext2:function(){var t=this.signal,n=function(){e.Assert.fail()},r={},i=t.add(n),s=t.add(n,r);e.Assert.areSame(2,t.getNumListeners());e.Assert.isUndefined(i.context);e.Assert.areSame(n,i.getListener());e.Assert.areSame(r,s.context);e.Assert.areSame(n,s.getListener());t.remove(n);e.Assert.isUndefined(i.context);e.Assert.isUndefined(i.getListener());e.Assert.areSame(r,s.context);e.Assert.areSame(n,s.getListener());e.Assert.areSame(1,t.getNumListeners());t.remove(n,r);e.Assert.areSame(0,t.getNumListeners());t.dispatch()},testMemorize:function(){var t=new signals.Signal;t.memorize=!0;var n=0,r=+(new Date);t.addOnce(function(t,i){n++;e.Assert.areSame("foo",t);e.Assert.areSame(r,i)});t.dispatch("foo",r);t.addOnce(function(t,i){n++;e.Assert.areSame("foo",t);e.Assert.areSame(r,i)});var i=+(new Date);t.dispatch("bar",i);t.addOnce(function(t,r){n++;e.Assert.areSame("bar",t);e.Assert.areSame(i,r)});e.Assert.areSame(3,n)},testMemorizeForget:function(){var t=new signals.Signal;t.memorize=!0;var n=0,r=+(new Date);t.addOnce(function(t,i){n++;e.Assert.areSame("foo",t);e.Assert.areSame(r,i)});t.dispatch("foo",r);t.addOnce(function(t,i){n++;e.Assert.areSame("foo",t);e.Assert.areSame(r,i)});var i=+(new Date);t.dispatch("bar",i);t.forget();t.addOnce(function(t,r){n++;e.Assert.fail("a: "+t+" - b: "+r)});e.Assert.areSame(2,n)},testMemorizeDispose:function(){var t=new signals.Signal;t.memorize=!0;t.dispatch("foo",123);e.Assert.areSame("foo",t._prevParams[0]);e.Assert.areSame(123,t._prevParams[1]);e.Assert.areSame(0,t._bindings.length);t.dispose();e.Assert.areSame(undefined,t._prevParams);e.Assert.areSame(undefined,t._bindings)},testDispose1:function(){var t=this.signal;t.addOnce(function(){});t.add(function(){});e.Assert.areSame(2,t.getNumListeners());t.dispose();t.dispatch()},testDispose2:function(){var t=this.signal;t.addOnce(function(){});t.add(function(){});e.Assert.areSame(2,t.getNumListeners());t.dispose();t.add(function(){})},testDispose3:function(){var t=this.signal;t.addOnce(function(){});t.add(function(){});e.Assert.areSame(2,t.getNumListeners());t.dispose();t.remove(function(){})},testDispose4:function(){var t=this.signal;t.addOnce(function(){});t.add(function(){});e.Assert.areSame(2,t.getNumListeners());t.dispose();t.getNumListeners()}}),n=new e.Console({verbose:!0,newestOnTop:!1});n.render("#testLogger");e.Test.Runner.add(t);e.Test.Runner.on("complete",function(){var t=document.getElementById("coverageOutput");t&&(t.value=e.Test.Runner.getCoverage(e.Coverage.Format.JSON))});e.Test.Runner.run()});
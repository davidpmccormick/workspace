define(["require","exports","module","test","a/b/c/d"],function(e,t,n){var r=e("test");r.assert(e("a/b/c/d").foo()==1,"nested module identifier");r.print("DONE","info")});
define(["require","exports","module","test","a"],function(e,t,n){var r=e("test");r.assert(e("a").foo()==1,"transitive");r.print("DONE","info")});
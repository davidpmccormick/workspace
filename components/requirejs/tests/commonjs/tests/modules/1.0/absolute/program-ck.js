define(["require","exports","module","test","submodule/a","b"],function(e,t,n){var r=e("test"),i=e("submodule/a"),s=e("b");r.assert(i.foo().foo===s.foo,"require works with absolute identifiers");r.print("DONE","info")});
define("funcTwo",["require","funcOne"],function(e){var t=function(t){this.name=t;this.one=new(e("funcOne"))("ONE")};t.prototype.oneName=function(){return this.one.getName()};return t});
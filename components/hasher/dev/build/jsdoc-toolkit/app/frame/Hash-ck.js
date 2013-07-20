/**
	@constructor
	@example
	var _index = new Hash();
	_index.set("a", "apple");
	_index.set("b", "blue");
	_index.set("c", "coffee");

	for (var p = _index.first(); p; p = _index.next()) {
		print(p.key+" is for "+p.value);
	}
	
 */var Hash=function(){this._map={};this._keys=[];this._vals=[];this.reset()};Hash.prototype.set=function(e,t){if(e!=""){this._keys.push(e);this._map["="+e]=this._vals.length;this._vals.push(t)}};Hash.prototype.replace=function(e,t,n){if(e==t)return;var r=this._map["="+e];this._keys[r]=t;typeof n!="undefined"&&(this._vals[r]=n);this._map["="+t]=r;delete this._map["="+e]};Hash.prototype.drop=function(e){if(e!=""){var t=this._map["="+e];this._keys.splice(t,1);this._vals.splice(t,1);delete this._map["="+e];for(var n in this._map)this._map[n]>=t&&this._map[n]--;this._cursor>=t&&this._cursor>0&&this._cursor--}};Hash.prototype.get=function(e){if(e!="")return this._vals[this._map["="+e]]};Hash.prototype.keys=function(){return this._keys};Hash.prototype.hasKey=function(e){if(e!="")return typeof this._map["="+e]!="undefined"};Hash.prototype.values=function(){return this._vals};Hash.prototype.reset=function(){this._cursor=0};Hash.prototype.first=function(){this.reset();return this.next()};Hash.prototype.next=function(){if(this._cursor++<this._keys.length)return{key:this._keys[this._cursor-1],value:this._vals[this._cursor-1]}};
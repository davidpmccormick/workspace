typeof JSDOC=="undefined"&&(JSDOC={});JSDOC.Symbol=function(){this.init();arguments.length&&this.populate.apply(this,arguments)};JSDOC.Symbol.count=0;JSDOC.Symbol.prototype.init=function(){this._name="";this._params=[];this.$args=[];this.addOn="";this.alias="";this.augments=[];this.author="";this.classDesc="";this.comment={};this.defaultValue=undefined;this.deprecated="";this.desc="";this.example=[];this.exceptions=[];this.fires=[];this.id=JSDOC.Symbol.count++;this.inherits=[];this.inheritsFrom=[];this.isa="OBJECT";this.isConstant=!1;this.isEvent=!1;this.isIgnored=!1;this.isInner=!1;this.isNamespace=!1;this.isPrivate=!1;this.isStatic=!1;this.memberOf="";this.methods=[];this.properties=[];this.requires=[];this.returns=[];this.see=[];this.since="";this.srcFile={};this.type="";this.version=""};JSDOC.Symbol.prototype.serialize=function(){var e=[];for(var t in this)e.push(t);e=e.sort();var n="";for(var r in e){if(typeof this[e[r]]=="function")continue;n+=e[r]+" => "+Dumper.dump(this[e[r]])+",\n"}return"\n{\n"+n+"}\n"};JSDOC.Symbol.prototype.clone=function(){var e=new JSDOC.Symbol;e.populate.apply(e,this.$args);e.srcFile=this.srcFile;return e};JSDOC.Symbol.prototype.__defineSetter__("name",function(e){e=e.replace(/^_global_[.#-]/,"");e=e.replace(/\.prototype\.?/g,"#");this._name=e});JSDOC.Symbol.prototype.__defineGetter__("name",function(){return this._name});JSDOC.Symbol.prototype.__defineSetter__("params",function(e){for(var t=0,n=e.length;t<n;t++)e[t].constructor!=JSDOC.DocTag?this._params[t]=new JSDOC.DocTag("param"+(e[t].type?" {"+e[t].type+"}":"")+" "+e[t].name):this._params[t]=e[t]});JSDOC.Symbol.prototype.__defineGetter__("params",function(){return this._params});JSDOC.Symbol.prototype.getEvents=function(){var e=[];for(var t=0,n=this.methods.length;t<n;t++)if(this.methods[t].isEvent){this.methods[t].name=this.methods[t].name.replace("event:","");e.push(this.methods[t])}return e};JSDOC.Symbol.prototype.getMethods=function(){var e=[];for(var t=0,n=this.methods.length;t<n;t++)this.methods[t].isEvent||e.push(this.methods[t]);return e};JSDOC.Symbol.prototype.populate=function(e,t,n,r){this.$args=arguments;this.name=e;this.alias=this.name;this.params=t;this.isa=n=="VIRTUAL"?"OBJECT":n;this.comment=r||new JSDOC.DocComment("");this.srcFile=JSDOC.Symbol.srcFile;this.is("FILE")&&!this.alias&&(this.alias=this.srcFile);this.setTags();typeof JSDOC.PluginManager!="undefined"&&JSDOC.PluginManager.run("onSymbol",this)};JSDOC.Symbol.prototype.setTags=function(){var e=this.comment.getTag("author");e.length&&(this.author=e.map(function(e){return e.desc}).join(", "));var t=this.comment.getTag("desc");t.length&&(this.desc=t.map(function(e){return e.desc}).join("\n"));if(this.is("FILE")){this.alias||(this.alias=this.srcFile);var n=this.comment.getTag("overview");n.length&&(this.desc=[this.desc].concat(n.map(function(e){return e.desc})).join("\n"))}var r=this.comment.getTag("since");r.length&&(this.since=r.map(function(e){return e.desc}).join(", "));this.comment.getTag("constant").length&&(this.isConstant=!0);var i=this.comment.getTag("version");i.length&&(this.version=i.map(function(e){return e.desc}).join(", "));var s=this.comment.getTag("deprecated");s.length&&(this.deprecated=s.map(function(e){return e.desc}).join("\n"));var o=this.comment.getTag("example");o.length&&(this.example=o.map(function(e){e.desc=e.desc.replace(/\s+$/,"");return e}));var u=this.comment.getTag("see");if(u.length){var a=this.see;u.map(function(e){a.push(e.desc)})}var f=this.comment.getTag("class");if(f.length){this.isa="CONSTRUCTOR";this.classDesc=f[0].desc}var l=this.comment.getTag("namespace");if(l.length){this.classDesc=l[0].desc;this.isNamespace=!0}var c=this.comment.getTag("param");if(c.length){var h=this.params;if(h.length==0)this.params=c;else for(var p=0,d=c.length;p<d;p++)if(h[p]){c[p].type&&(h[p].type=c[p].type);h[p].name=c[p].name;h[p].desc=c[p].desc;h[p].isOptional=c[p].isOptional;h[p].defaultValue=c[p].defaultValue}else h[p]=c[p]}this.comment.getTag("constructor").length&&(this.isa="CONSTRUCTOR");if(this.comment.getTag("static").length){this.isStatic=!0;this.isa=="CONSTRUCTOR"&&(this.isNamespace=!0)}if(this.comment.getTag("inner").length){this.isInner=!0;this.isStatic=!1}var v=this.comment.getTag("name");v.length&&(this.name=v[0].desc);this.comment.getTag("field").length&&(this.isa="OBJECT");if(this.comment.getTag("function").length){this.isa="FUNCTION";/event:/.test(this.alias)&&(this.isEvent=!0)}var m=this.comment.getTag("event");if(m.length){this.isa="FUNCTION";this.isEvent=!0;/event:/.test(this.alias)||(this.alias=this.alias.replace(/^(.*[.#-])([^.#-]+)$/,"$1event:$2"))}var g=this.comment.getTag("fires");if(g.length)for(var p=0;p<g.length;p++)this.fires.push(g[p].desc);var y=this.comment.getTag("property");if(y.length){thisProperties=this.properties;for(var p=0;p<y.length;p++){var b=new JSDOC.Symbol(this.alias+"#"+y[p].name,[],"OBJECT",new JSDOC.DocComment("/**"+y[p].desc+"*/"));y[p].type&&(b.type=y[p].type);y[p].defaultValue&&(b.defaultValue=y[p].defaultValue);this.addProperty(b);JSDOC.Parser.symbols.getSymbolByName(b.name)||JSDOC.Parser.addSymbol(b)}}var w=this.comment.getTag("return");if(w.length){this.returns=w;this.type=w.map(function(e){return e.type}).join(", ")}this.exceptions=this.comment.getTag("throws");var E=this.comment.getTag("requires");E.length&&(this.requires=E.map(function(e){return e.desc}));var S=this.comment.getTag("type");S.length&&(this.type=S[0].desc);if(this.comment.getTag("private").length||this.isInner)this.isPrivate=!0;this.comment.getTag("ignore").length&&(this.isIgnored=!0);var x=this.comment.getTag("inherits");if(x.length)for(var p=0;p<x.length;p++){if(/^\s*([a-z$0-9_.#:-]+)(?:\s+as\s+([a-z$0-9_.#:-]+))?/i.test(x[p].desc)){var T=RegExp.$1,N=RegExp.$2||T;T&&(T=T.replace(/\.prototype\.?/g,"#"));if(N){N=N.replace(/\.prototype\.?/g,"#");N=N.replace(/^this\.?/,"#")}if(N.indexOf(T)!=0){var C=".";if(this.alias.charAt(this.alias.length-1)=="#"||N.charAt(0)=="#")C="";N=this.alias+C+N}}this.inherits.push({alias:T,as:N})}this.augments=this.comment.getTag("augments");var k=this.comment.getTag("default");k.length&&this.is("OBJECT")&&(this.defaultValue=k[0].desc);var L=this.comment.getTag("memberOf");if(L.length){this.memberOf=L[0].desc;this.memberOf=this.memberOf.replace(/\.prototype\.?/g,"#")}this.comment.getTag("public").length&&(this.isPrivate=!1);JSDOC.PluginManager&&JSDOC.PluginManager.run("onSetTags",this)};JSDOC.Symbol.prototype.is=function(e){return this.isa===e};JSDOC.Symbol.prototype.isBuiltin=function(){return JSDOC.Lang.isBuiltin(this.alias)};JSDOC.Symbol.prototype.setType=function(e,t){if(!t&&this.type)return;var n=JSDOC.DocComment.unwrapComment(e);this.type=n};JSDOC.Symbol.prototype.inherit=function(e){!this.hasMember(e.name)&&!e.isInner&&(e.is("FUNCTION")?this.methods.push(e):e.is("OBJECT")&&this.properties.push(e))};JSDOC.Symbol.prototype.hasMember=function(e){return this.hasMethod(e)||this.hasProperty(e)};JSDOC.Symbol.prototype.addMember=function(e){e.is("FUNCTION")?this.addMethod(e):e.is("OBJECT")&&this.addProperty(e)};JSDOC.Symbol.prototype.hasMethod=function(e){var t=this.methods;for(var n=0,r=t.length;n<r;n++){if(t[n].name==e)return!0;if(t[n].alias==e)return!0}return!1};JSDOC.Symbol.prototype.addMethod=function(e){var t=e.alias,n=this.methods;for(var r=0,i=n.length;r<i;r++)if(n[r].alias==t){n[r]=e;return}n.push(e)};JSDOC.Symbol.prototype.hasProperty=function(e){var t=this.properties;for(var n=0,r=t.length;n<r;n++){if(t[n].name==e)return!0;if(t[n].alias==e)return!0}return!1};JSDOC.Symbol.prototype.addProperty=function(e){var t=e.alias,n=this.properties;for(var r=0,i=n.length;r<i;r++)if(n[r].alias==t){n[r]=e;return}n.push(e)};JSDOC.Symbol.srcFile="";
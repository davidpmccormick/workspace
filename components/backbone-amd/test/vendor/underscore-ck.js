//     Underscore.js 1.4.3
//     http://underscorejs.org
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore may be freely distributed under the MIT license.
(function(){var e=this,t=e._,n={},r=Array.prototype,i=Object.prototype,s=Function.prototype,o=r.push,u=r.slice,a=r.concat,f=i.toString,l=i.hasOwnProperty,c=r.forEach,h=r.map,p=r.reduce,d=r.reduceRight,v=r.filter,m=r.every,g=r.some,y=r.indexOf,b=r.lastIndexOf,w=Array.isArray,E=Object.keys,S=s.bind,x=function(e){if(e instanceof x)return e;if(!(this instanceof x))return new x(e);this._wrapped=e};if(typeof exports!="undefined"){typeof module!="undefined"&&module.exports&&(exports=module.exports=x);exports._=x}else e._=x;x.VERSION="1.4.3";var T=x.each=x.forEach=function(e,t,r){if(e==null)return;if(c&&e.forEach===c)e.forEach(t,r);else if(e.length===+e.length){for(var i=0,s=e.length;i<s;i++)if(t.call(r,e[i],i,e)===n)return}else for(var o in e)if(x.has(e,o)&&t.call(r,e[o],o,e)===n)return};x.map=x.collect=function(e,t,n){var r=[];if(e==null)return r;if(h&&e.map===h)return e.map(t,n);T(e,function(e,i,s){r[r.length]=t.call(n,e,i,s)});return r};var N="Reduce of empty array with no initial value";x.reduce=x.foldl=x.inject=function(e,t,n,r){var i=arguments.length>2;e==null&&(e=[]);if(p&&e.reduce===p){r&&(t=x.bind(t,r));return i?e.reduce(t,n):e.reduce(t)}T(e,function(e,s,o){if(!i){n=e;i=!0}else n=t.call(r,n,e,s,o)});if(!i)throw new TypeError(N);return n};x.reduceRight=x.foldr=function(e,t,n,r){var i=arguments.length>2;e==null&&(e=[]);if(d&&e.reduceRight===d){r&&(t=x.bind(t,r));return i?e.reduceRight(t,n):e.reduceRight(t)}var s=e.length;if(s!==+s){var o=x.keys(e);s=o.length}T(e,function(u,a,f){a=o?o[--s]:--s;if(!i){n=e[a];i=!0}else n=t.call(r,n,e[a],a,f)});if(!i)throw new TypeError(N);return n};x.find=x.detect=function(e,t,n){var r;C(e,function(e,i,s){if(t.call(n,e,i,s)){r=e;return!0}});return r};x.filter=x.select=function(e,t,n){var r=[];if(e==null)return r;if(v&&e.filter===v)return e.filter(t,n);T(e,function(e,i,s){t.call(n,e,i,s)&&(r[r.length]=e)});return r};x.reject=function(e,t,n){return x.filter(e,function(e,r,i){return!t.call(n,e,r,i)},n)};x.every=x.all=function(e,t,r){t||(t=x.identity);var i=!0;if(e==null)return i;if(m&&e.every===m)return e.every(t,r);T(e,function(e,s,o){if(!(i=i&&t.call(r,e,s,o)))return n});return!!i};var C=x.some=x.any=function(e,t,r){t||(t=x.identity);var i=!1;if(e==null)return i;if(g&&e.some===g)return e.some(t,r);T(e,function(e,s,o){if(i||(i=t.call(r,e,s,o)))return n});return!!i};x.contains=x.include=function(e,t){return e==null?!1:y&&e.indexOf===y?e.indexOf(t)!=-1:C(e,function(e){return e===t})};x.invoke=function(e,t){var n=u.call(arguments,2);return x.map(e,function(e){return(x.isFunction(t)?t:e[t]).apply(e,n)})};x.pluck=function(e,t){return x.map(e,function(e){return e[t]})};x.where=function(e,t){return x.isEmpty(t)?[]:x.filter(e,function(e){for(var n in t)if(t[n]!==e[n])return!1;return!0})};x.max=function(e,t,n){if(!t&&x.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.max.apply(Math,e);if(!t&&x.isEmpty(e))return-Infinity;var r={computed:-Infinity,value:-Infinity};T(e,function(e,i,s){var o=t?t.call(n,e,i,s):e;o>=r.computed&&(r={value:e,computed:o})});return r.value};x.min=function(e,t,n){if(!t&&x.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.min.apply(Math,e);if(!t&&x.isEmpty(e))return Infinity;var r={computed:Infinity,value:Infinity};T(e,function(e,i,s){var o=t?t.call(n,e,i,s):e;o<r.computed&&(r={value:e,computed:o})});return r.value};x.shuffle=function(e){var t,n=0,r=[];T(e,function(e){t=x.random(n++);r[n-1]=r[t];r[t]=e});return r};var k=function(e){return x.isFunction(e)?e:function(t){return t[e]}};x.sortBy=function(e,t,n){var r=k(t);return x.pluck(x.map(e,function(e,t,i){return{value:e,index:t,criteria:r.call(n,e,t,i)}}).sort(function(e,t){var n=e.criteria,r=t.criteria;if(n!==r){if(n>r||n===void 0)return 1;if(n<r||r===void 0)return-1}return e.index<t.index?-1:1}),"value")};var L=function(e,t,n,r){var i={},s=k(t||x.identity);T(e,function(t,o){var u=s.call(n,t,o,e);r(i,u,t)});return i};x.groupBy=function(e,t,n){return L(e,t,n,function(e,t,n){(x.has(e,t)?e[t]:e[t]=[]).push(n)})};x.countBy=function(e,t,n){return L(e,t,n,function(e,t){x.has(e,t)||(e[t]=0);e[t]++})};x.sortedIndex=function(e,t,n,r){n=n==null?x.identity:k(n);var i=n.call(r,t),s=0,o=e.length;while(s<o){var u=s+o>>>1;n.call(r,e[u])<i?s=u+1:o=u}return s};x.toArray=function(e){return e?x.isArray(e)?u.call(e):e.length===+e.length?x.map(e,x.identity):x.values(e):[]};x.size=function(e){return e==null?0:e.length===+e.length?e.length:x.keys(e).length};x.first=x.head=x.take=function(e,t,n){return e==null?void 0:t!=null&&!n?u.call(e,0,t):e[0]};x.initial=function(e,t,n){return u.call(e,0,e.length-(t==null||n?1:t))};x.last=function(e,t,n){return e==null?void 0:t!=null&&!n?u.call(e,Math.max(e.length-t,0)):e[e.length-1]};x.rest=x.tail=x.drop=function(e,t,n){return u.call(e,t==null||n?1:t)};x.compact=function(e){return x.filter(e,x.identity)};var A=function(e,t,n){T(e,function(e){x.isArray(e)?t?o.apply(n,e):A(e,t,n):n.push(e)});return n};x.flatten=function(e,t){return A(e,t,[])};x.without=function(e){return x.difference(e,u.call(arguments,1))};x.uniq=x.unique=function(e,t,n,r){if(x.isFunction(t)){r=n;n=t;t=!1}var i=n?x.map(e,n,r):e,s=[],o=[];T(i,function(n,r){if(t?!r||o[o.length-1]!==n:!x.contains(o,n)){o.push(n);s.push(e[r])}});return s};x.union=function(){return x.uniq(a.apply(r,arguments))};x.intersection=function(e){var t=u.call(arguments,1);return x.filter(x.uniq(e),function(e){return x.every(t,function(t){return x.indexOf(t,e)>=0})})};x.difference=function(e){var t=a.apply(r,u.call(arguments,1));return x.filter(e,function(e){return!x.contains(t,e)})};x.zip=function(){var e=u.call(arguments),t=x.max(x.pluck(e,"length")),n=new Array(t);for(var r=0;r<t;r++)n[r]=x.pluck(e,""+r);return n};x.object=function(e,t){if(e==null)return{};var n={};for(var r=0,i=e.length;r<i;r++)t?n[e[r]]=t[r]:n[e[r][0]]=e[r][1];return n};x.indexOf=function(e,t,n){if(e==null)return-1;var r=0,i=e.length;if(n){if(typeof n!="number"){r=x.sortedIndex(e,t);return e[r]===t?r:-1}r=n<0?Math.max(0,i+n):n}if(y&&e.indexOf===y)return e.indexOf(t,n);for(;r<i;r++)if(e[r]===t)return r;return-1};x.lastIndexOf=function(e,t,n){if(e==null)return-1;var r=n!=null;if(b&&e.lastIndexOf===b)return r?e.lastIndexOf(t,n):e.lastIndexOf(t);var i=r?n:e.length;while(i--)if(e[i]===t)return i;return-1};x.range=function(e,t,n){if(arguments.length<=1){t=e||0;e=0}n=arguments[2]||1;var r=Math.max(Math.ceil((t-e)/n),0),i=0,s=new Array(r);while(i<r){s[i++]=e;e+=n}return s};var O=function(){};x.bind=function(e,t){var n,r;if(e.bind===S&&S)return S.apply(e,u.call(arguments,1));if(!x.isFunction(e))throw new TypeError;n=u.call(arguments,2);return r=function(){if(this instanceof r){O.prototype=e.prototype;var i=new O;O.prototype=null;var s=e.apply(i,n.concat(u.call(arguments)));return Object(s)===s?s:i}return e.apply(t,n.concat(u.call(arguments)))}};x.bindAll=function(e){var t=u.call(arguments,1);t.length===0&&(t=x.functions(e));T(t,function(t){e[t]=x.bind(e[t],e)});return e};x.memoize=function(e,t){var n={};t||(t=x.identity);return function(){var r=t.apply(this,arguments);return x.has(n,r)?n[r]:n[r]=e.apply(this,arguments)}};x.delay=function(e,t){var n=u.call(arguments,2);return setTimeout(function(){return e.apply(null,n)},t)};x.defer=function(e){return x.delay.apply(x,[e,1].concat(u.call(arguments,1)))};x.throttle=function(e,t){var n,r,i,s,o=0,u=function(){o=new Date;i=null;s=e.apply(n,r)};return function(){var a=new Date,f=t-(a-o);n=this;r=arguments;if(f<=0){clearTimeout(i);i=null;o=a;s=e.apply(n,r)}else i||(i=setTimeout(u,f));return s}};x.debounce=function(e,t,n){var r,i;return function(){var s=this,o=arguments,u=function(){r=null;n||(i=e.apply(s,o))},a=n&&!r;clearTimeout(r);r=setTimeout(u,t);a&&(i=e.apply(s,o));return i}};x.once=function(e){var t=!1,n;return function(){if(t)return n;t=!0;n=e.apply(this,arguments);e=null;return n}};x.wrap=function(e,t){return function(){var n=[e];o.apply(n,arguments);return t.apply(this,n)}};x.compose=function(){var e=arguments;return function(){var t=arguments;for(var n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}};x.after=function(e,t){return e<=0?t():function(){if(--e<1)return t.apply(this,arguments)}};x.keys=E||function(e){if(e!==Object(e))throw new TypeError("Invalid object");var t=[];for(var n in e)x.has(e,n)&&(t[t.length]=n);return t};x.values=function(e){var t=[];for(var n in e)x.has(e,n)&&t.push(e[n]);return t};x.pairs=function(e){var t=[];for(var n in e)x.has(e,n)&&t.push([n,e[n]]);return t};x.invert=function(e){var t={};for(var n in e)x.has(e,n)&&(t[e[n]]=n);return t};x.functions=x.methods=function(e){var t=[];for(var n in e)x.isFunction(e[n])&&t.push(n);return t.sort()};x.extend=function(e){T(u.call(arguments,1),function(t){if(t)for(var n in t)e[n]=t[n]});return e};x.pick=function(e){var t={},n=a.apply(r,u.call(arguments,1));T(n,function(n){n in e&&(t[n]=e[n])});return t};x.omit=function(e){var t={},n=a.apply(r,u.call(arguments,1));for(var i in e)x.contains(n,i)||(t[i]=e[i]);return t};x.defaults=function(e){T(u.call(arguments,1),function(t){if(t)for(var n in t)e[n]==null&&(e[n]=t[n])});return e};x.clone=function(e){return x.isObject(e)?x.isArray(e)?e.slice():x.extend({},e):e};x.tap=function(e,t){t(e);return e};var M=function(e,t,n,r){if(e===t)return e!==0||1/e==1/t;if(e==null||t==null)return e===t;e instanceof x&&(e=e._wrapped);t instanceof x&&(t=t._wrapped);var i=f.call(e);if(i!=f.call(t))return!1;switch(i){case"[object String]":return e==String(t);case"[object Number]":return e!=+e?t!=+t:e==0?1/e==1/t:e==+t;case"[object Date]":case"[object Boolean]":return+e==+t;case"[object RegExp]":return e.source==t.source&&e.global==t.global&&e.multiline==t.multiline&&e.ignoreCase==t.ignoreCase}if(typeof e!="object"||typeof t!="object")return!1;var s=n.length;while(s--)if(n[s]==e)return r[s]==t;n.push(e);r.push(t);var o=0,u=!0;if(i=="[object Array]"){o=e.length;u=o==t.length;if(u)while(o--)if(!(u=M(e[o],t[o],n,r)))break}else{var a=e.constructor,l=t.constructor;if(a!==l&&!(x.isFunction(a)&&a instanceof a&&x.isFunction(l)&&l instanceof l))return!1;for(var c in e)if(x.has(e,c)){o++;if(!(u=x.has(t,c)&&M(e[c],t[c],n,r)))break}if(u){for(c in t)if(x.has(t,c)&&!(o--))break;u=!o}}n.pop();r.pop();return u};x.isEqual=function(e,t){return M(e,t,[],[])};x.isEmpty=function(e){if(e==null)return!0;if(x.isArray(e)||x.isString(e))return e.length===0;for(var t in e)if(x.has(e,t))return!1;return!0};x.isElement=function(e){return!!e&&e.nodeType===1};x.isArray=w||function(e){return f.call(e)=="[object Array]"};x.isObject=function(e){return e===Object(e)};T(["Arguments","Function","String","Number","Date","RegExp"],function(e){x["is"+e]=function(t){return f.call(t)=="[object "+e+"]"}});x.isArguments(arguments)||(x.isArguments=function(e){return!!e&&!!x.has(e,"callee")});typeof /./!="function"&&(x.isFunction=function(e){return typeof e=="function"});x.isFinite=function(e){return isFinite(e)&&!isNaN(parseFloat(e))};x.isNaN=function(e){return x.isNumber(e)&&e!=+e};x.isBoolean=function(e){return e===!0||e===!1||f.call(e)=="[object Boolean]"};x.isNull=function(e){return e===null};x.isUndefined=function(e){return e===void 0};x.has=function(e,t){return l.call(e,t)};x.noConflict=function(){e._=t;return this};x.identity=function(e){return e};x.times=function(e,t,n){var r=Array(e);for(var i=0;i<e;i++)r[i]=t.call(n,i);return r};x.random=function(e,t){if(t==null){t=e;e=0}return e+(0|Math.random()*(t-e+1))};var _={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};_.unescape=x.invert(_.escape);var D={escape:new RegExp("["+x.keys(_.escape).join("")+"]","g"),unescape:new RegExp("("+x.keys(_.unescape).join("|")+")","g")};x.each(["escape","unescape"],function(e){x[e]=function(t){return t==null?"":(""+t).replace(D[e],function(t){return _[e][t]})}});x.result=function(e,t){if(e==null)return null;var n=e[t];return x.isFunction(n)?n.call(e):n};x.mixin=function(e){T(x.functions(e),function(t){var n=x[t]=e[t];x.prototype[t]=function(){var e=[this._wrapped];o.apply(e,arguments);return F.call(this,n.apply(x,e))}})};var P=0;x.uniqueId=function(e){var t=""+ ++P;return e?e+t:t};x.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var H=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},j=/\\|'|\r|\n|\t|\u2028|\u2029/g;x.template=function(e,t,n){var r;n=x.defaults({},n,x.templateSettings);var i=new RegExp([(n.escape||H).source,(n.interpolate||H).source,(n.evaluate||H).source].join("|")+"|$","g"),s=0,o="__p+='";e.replace(i,function(t,n,r,i,u){o+=e.slice(s,u).replace(j,function(e){return"\\"+B[e]});n&&(o+="'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'");r&&(o+="'+\n((__t=("+r+"))==null?'':__t)+\n'");i&&(o+="';\n"+i+"\n__p+='");s=u+t.length;return t});o+="';\n";n.variable||(o="with(obj||{}){\n"+o+"}\n");o="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+o+"return __p;\n";try{r=new Function(n.variable||"obj","_",o)}catch(u){u.source=o;throw u}if(t)return r(t,x);var a=function(e){return r.call(this,e,x)};a.source="function("+(n.variable||"obj")+"){\n"+o+"}";return a};x.chain=function(e){return x(e).chain()};var F=function(e){return this._chain?x(e).chain():e};x.mixin(x);T(["pop","push","reverse","shift","sort","splice","unshift"],function(e){var t=r[e];x.prototype[e]=function(){var n=this._wrapped;t.apply(n,arguments);(e=="shift"||e=="splice")&&n.length===0&&delete n[0];return F.call(this,n)}});T(["concat","join","slice"],function(e){var t=r[e];x.prototype[e]=function(){return F.call(this,t.apply(this._wrapped,arguments))}});x.extend(x.prototype,{chain:function(){this._chain=!0;return this},value:function(){return this._wrapped}})}).call(this);
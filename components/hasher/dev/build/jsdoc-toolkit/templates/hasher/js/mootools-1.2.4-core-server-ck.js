/*
---

script: Core.js

description: The core of MooTools, contains all the base functions and the Native and Hash implementations. Required by all the other scripts.

license: MIT-style license.

copyright: Copyright (c) 2006-2008 [Valerio Proietti](http://mad4milk.net/).

authors: The MooTools production team (http://mootools.net/developers/)

inspiration:
- Class implementation inspired by [Base.js](http://dean.edwards.name/weblog/2006/03/base/) Copyright (c) 2006 Dean Edwards, [GNU Lesser General Public License](http://opensource.org/licenses/lgpl-license.php)
- Some functionality inspired by [Prototype.js](http://prototypejs.org) Copyright (c) 2005-2007 Sam Stephenson, [MIT License](http://opensource.org/licenses/mit-license.php)

provides: [Mootools, Native, Hash.base, Array.each, $util]

...
*/function $A(e){if(e.item){var t=e.length,n=new Array(t);while(t--)n[t]=e[t];return n}return Array.prototype.slice.call(e)}function $arguments(e){return function(){return arguments[e]}}function $chk(e){return!!e||e===0}function $clear(e){clearTimeout(e);clearInterval(e);return null}function $defined(e){return e!=undefined}function $each(e,t,n){var r=$type(e);(r=="arguments"||r=="collection"||r=="array"?Array:Hash).each(e,t,n)}function $empty(){}function $extend(e,t){for(var n in t||{})e[n]=t[n];return e}function $H(e){return new Hash(e)}function $lambda(e){return $type(e)=="function"?e:function(){return e}}function $merge(){var e=Array.slice(arguments);e.unshift({});return $mixin.apply(null,e)}function $mixin(e){for(var t=1,n=arguments.length;t<n;t++){var r=arguments[t];if($type(r)!="object")continue;for(var i in r){var s=r[i],o=e[i];e[i]=o&&$type(s)=="object"&&$type(o)=="object"?$mixin(o,s):$unlink(s)}}return e}function $pick(){for(var e=0,t=arguments.length;e<t;e++)if(arguments[e]!=undefined)return arguments[e];return null}function $random(e,t){return Math.floor(Math.random()*(t-e+1)+e)}function $splat(e){var t=$type(e);return t?t!="array"&&t!="arguments"?[e]:e:[]}function $try(){for(var e=0,t=arguments.length;e<t;e++)try{return arguments[e]()}catch(n){}return null}function $type(e){if(e==undefined)return!1;if(e.$family)return e.$family.name=="number"&&!isFinite(e)?!1:e.$family.name;if(e.nodeName)switch(e.nodeType){case 1:return"element";case 3:return/\S/.test(e.nodeValue)?"textnode":"whitespace"}else if(typeof e.length=="number"){if(e.callee)return"arguments";if(e.item)return"collection"}return typeof e}function $unlink(e){var t;switch($type(e)){case"object":t={};for(var n in e)t[n]=$unlink(e[n]);break;case"hash":t=new Hash(e);break;case"array":t=[];for(var r=0,i=e.length;r<i;r++)t[r]=$unlink(e[r]);break;default:return e}return t}function Class(e){e instanceof Function&&(e={initialize:e});var t=function(){Object.reset(this);if(t._prototyping)return this;this._current=$empty;var e=this.initialize?this.initialize.apply(this,arguments):this;delete this._current;delete this.caller;return e}.extend(this);t.implement(e);t.constructor=Class;t.prototype.constructor=t;return t}var MooTools={version:"1.2.4",build:"0d9113241a90b9cd5643b926795852a2026710d4"},Native=function(e){e=e||{};var t=e.name,n=e.legacy,r=e.protect,i=e.implement,s=e.generics,o=e.initialize,u=e.afterImplement||function(){},a=o||n;s=s!==!1;a.constructor=Native;a.$family={name:"native"};n&&o&&(a.prototype=n.prototype);a.prototype.constructor=a;if(t){var f=t.toLowerCase();a.prototype.$family={name:f};Native.typize(a,f)}var l=function(e,t,n,i){if(!r||i||!e.prototype[t])e.prototype[t]=n;s&&Native.genericize(e,t,r);u.call(e,t,n);return e};a.alias=function(e,t,n){if(typeof e=="string"){var r=this.prototype[e];if(e=r)return l(this,t,e,n)}for(var i in e)this.alias(i,e[i],t);return this};a.implement=function(e,t,n){if(typeof e=="string")return l(this,e,t,n);for(var r in e)l(this,r,e[r],t);return this};i&&a.implement(i);return a};Native.genericize=function(e,t,n){(!n||!e[t])&&typeof e.prototype[t]=="function"&&(e[t]=function(){var n=Array.prototype.slice.call(arguments);return e.prototype[t].apply(n.shift(),n)})};Native.implement=function(e,t){for(var n=0,r=e.length;n<r;n++)e[n].implement(t)};Native.typize=function(e,t){e.type||(e.type=function(e){return $type(e)===t})};(function(){var e={Array:Array,Date:Date,Function:Function,Number:Number,RegExp:RegExp,String:String};for(var t in e)new Native({name:t,initialize:e[t],protect:!0});var n={"boolean":Boolean,"native":Native,object:Object};for(var r in n)Native.typize(n[r],r);var i={Array:["concat","indexOf","join","lastIndexOf","pop","push","reverse","shift","slice","sort","splice","toString","unshift","valueOf"],String:["charAt","charCodeAt","concat","indexOf","lastIndexOf","match","replace","search","slice","split","substr","substring","toLowerCase","toUpperCase","valueOf"]};for(var s in i)for(var o=i[s].length;o--;)Native.genericize(e[s],i[s][o],!0)})();var Hash=new Native({name:"Hash",initialize:function(e){$type(e)=="hash"&&(e=$unlink(e.getClean()));for(var t in e)this[t]=e[t];return this}});Hash.implement({forEach:function(e,t){for(var n in this)this.hasOwnProperty(n)&&e.call(t,this[n],n,this)},getClean:function(){var e={};for(var t in this)this.hasOwnProperty(t)&&(e[t]=this[t]);return e},getLength:function(){var e=0;for(var t in this)this.hasOwnProperty(t)&&e++;return e}});Hash.alias("forEach","each");Array.implement({forEach:function(e,t){for(var n=0,r=this.length;n<r;n++)e.call(t,this[n],n,this)}});Array.alias("forEach","each");var $time=Date.now||function(){return+(new Date)};Array.implement({every:function(e,t){for(var n=0,r=this.length;n<r;n++)if(!e.call(t,this[n],n,this))return!1;return!0},filter:function(e,t){var n=[];for(var r=0,i=this.length;r<i;r++)e.call(t,this[r],r,this)&&n.push(this[r]);return n},clean:function(){return this.filter($defined)},indexOf:function(e,t){var n=this.length;for(var r=t<0?Math.max(0,n+t):t||0;r<n;r++)if(this[r]===e)return r;return-1},map:function(e,t){var n=[];for(var r=0,i=this.length;r<i;r++)n[r]=e.call(t,this[r],r,this);return n},some:function(e,t){for(var n=0,r=this.length;n<r;n++)if(e.call(t,this[n],n,this))return!0;return!1},associate:function(e){var t={},n=Math.min(this.length,e.length);for(var r=0;r<n;r++)t[e[r]]=this[r];return t},link:function(e){var t={};for(var n=0,r=this.length;n<r;n++)for(var i in e)if(e[i](this[n])){t[i]=this[n];delete e[i];break}return t},contains:function(e,t){return this.indexOf(e,t)!=-1},extend:function(e){for(var t=0,n=e.length;t<n;t++)this.push(e[t]);return this},getLast:function(){return this.length?this[this.length-1]:null},getRandom:function(){return this.length?this[$random(0,this.length-1)]:null},include:function(e){this.contains(e)||this.push(e);return this},combine:function(e){for(var t=0,n=e.length;t<n;t++)this.include(e[t]);return this},erase:function(e){for(var t=this.length;t--;t)this[t]===e&&this.splice(t,1);return this},empty:function(){this.length=0;return this},flatten:function(){var e=[];for(var t=0,n=this.length;t<n;t++){var r=$type(this[t]);if(!r)continue;e=e.concat(r=="array"||r=="collection"||r=="arguments"?Array.flatten(this[t]):this[t])}return e},hexToRgb:function(e){if(this.length!=3)return null;var t=this.map(function(e){e.length==1&&(e+=e);return e.toInt(16)});return e?t:"rgb("+t+")"},rgbToHex:function(e){if(this.length<3)return null;if(this.length==4&&this[3]==0&&!e)return"transparent";var t=[];for(var n=0;n<3;n++){var r=(this[n]-0).toString(16);t.push(r.length==1?"0"+r:r)}return e?t:"#"+t.join("")}});Function.implement({extend:function(e){for(var t in e)this[t]=e[t];return this},create:function(e){var t=this;e=e||{};return function(n){var r=e.arguments;r=r!=undefined?$splat(r):Array.slice(arguments,e.event?1:0);e.event&&(r=[n||window.event].extend(r));var i=function(){return t.apply(e.bind||null,r)};return e.delay?setTimeout(i,e.delay):e.periodical?setInterval(i,e.periodical):e.attempt?$try(i):i()}},run:function(e,t){return this.apply(t,$splat(e))},pass:function(e,t){return this.create({bind:t,arguments:e})},bind:function(e,t){return this.create({bind:e,arguments:t})},bindWithEvent:function(e,t){return this.create({bind:e,arguments:t,event:!0})},attempt:function(e,t){return this.create({bind:t,arguments:e,attempt:!0})()},delay:function(e,t,n){return this.create({bind:t,arguments:n,delay:e})()},periodical:function(e,t,n){return this.create({bind:t,arguments:n,periodical:e})()}});Number.implement({limit:function(e,t){return Math.min(t,Math.max(e,this))},round:function(e){e=Math.pow(10,e||0);return Math.round(this*e)/e},times:function(e,t){for(var n=0;n<this;n++)e.call(t,n,this)},toFloat:function(){return parseFloat(this)},toInt:function(e){return parseInt(this,e||10)}});Number.alias("times","each");(function(e){var t={};e.each(function(e){Number[e]||(t[e]=function(){return Math[e].apply(null,[this].concat($A(arguments)))})});Number.implement(t)})(["abs","acos","asin","atan","atan2","ceil","cos","exp","floor","log","max","min","pow","sin","sqrt","tan"]);String.implement({test:function(e,t){return(typeof e=="string"?new RegExp(e,t):e).test(this)},contains:function(e,t){return t?(t+this+t).indexOf(t+e+t)>-1:this.indexOf(e)>-1},trim:function(){return this.replace(/^\s+|\s+$/g,"")},clean:function(){return this.replace(/\s+/g," ").trim()},camelCase:function(){return this.replace(/-\D/g,function(e){return e.charAt(1).toUpperCase()})},hyphenate:function(){return this.replace(/[A-Z]/g,function(e){return"-"+e.charAt(0).toLowerCase()})},capitalize:function(){return this.replace(/\b[a-z]/g,function(e){return e.toUpperCase()})},escapeRegExp:function(){return this.replace(/([-.*+?^${}()|[\]\/\\])/g,"\\$1")},toInt:function(e){return parseInt(this,e||10)},toFloat:function(){return parseFloat(this)},hexToRgb:function(e){var t=this.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);return t?t.slice(1).hexToRgb(e):null},rgbToHex:function(e){var t=this.match(/\d{1,3}/g);return t?t.rgbToHex(e):null},stripScripts:function(e){var t="",n=this.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){t+=arguments[1]+"\n";return""});e===!0?$exec(t):$type(e)=="function"&&e(t,n);return n},substitute:function(e,t){return this.replace(t||/\\?\{([^{}]+)\}/g,function(t,n){return t.charAt(0)=="\\"?t.slice(1):e[n]!=undefined?e[n]:""})}});Hash.implement({has:Object.prototype.hasOwnProperty,keyOf:function(e){for(var t in this)if(this.hasOwnProperty(t)&&this[t]===e)return t;return null},hasValue:function(e){return Hash.keyOf(this,e)!==null},extend:function(e){Hash.each(e||{},function(e,t){Hash.set(this,t,e)},this);return this},combine:function(e){Hash.each(e||{},function(e,t){Hash.include(this,t,e)},this);return this},erase:function(e){this.hasOwnProperty(e)&&delete this[e];return this},get:function(e){return this.hasOwnProperty(e)?this[e]:null},set:function(e,t){if(!this[e]||this.hasOwnProperty(e))this[e]=t;return this},empty:function(){Hash.each(this,function(e,t){delete this[t]},this);return this},include:function(e,t){this[e]==undefined&&(this[e]=t);return this},map:function(e,t){var n=new Hash;Hash.each(this,function(r,i){n.set(i,e.call(t,r,i,this))},this);return n},filter:function(e,t){var n=new Hash;Hash.each(this,function(r,i){e.call(t,r,i,this)&&n.set(i,r)},this);return n},every:function(e,t){for(var n in this)if(this.hasOwnProperty(n)&&!e.call(t,this[n],n))return!1;return!0},some:function(e,t){for(var n in this)if(this.hasOwnProperty(n)&&e.call(t,this[n],n))return!0;return!1},getKeys:function(){var e=[];Hash.each(this,function(t,n){e.push(n)});return e},getValues:function(){var e=[];Hash.each(this,function(t){e.push(t)});return e},toQueryString:function(e){var t=[];Hash.each(this,function(n,r){e&&(r=e+"["+r+"]");var i;switch($type(n)){case"object":i=Hash.toQueryString(n,r);break;case"array":var s={};n.each(function(e,t){s[t]=e});i=Hash.toQueryString(s,r);break;default:i=r+"="+encodeURIComponent(n)}n!=undefined&&t.push(i)});return t.join("&")}});Hash.alias({keyOf:"indexOf",hasValue:"contains"});Function.prototype.protect=function(){this._protected=!0;return this};Object.reset=function(e,t){if(t==null){for(var n in e)Object.reset(e,n);return e}switch($type(e[t])){case"object":var r=function(){};r.prototype=e[t];var i=new r;e[t]=Object.reset(i);break;case"array":e[t]=$unlink(e[t])}return e};(new Native({name:"Class",initialize:Class})).extend({instantiate:function(e){e._prototyping=!0;var t=new e;delete e._prototyping;return t},wrap:function(e,t,n){n._origin&&(n=n._origin);return function(){if(n._protected&&this._current==null)throw new Error('The method "'+t+'" cannot be called.');var e=this.caller,r=this._current;this.caller=r;this._current=arguments.callee;var i=n.apply(this,arguments);this._current=r;this.caller=e;return i}.extend({_owner:e,_origin:n,_name:t})}});Class.implement({implement:function(e,t){if($type(e)=="object"){for(var n in e)this.implement(n,e[n]);return this}var r=Class.Mutators[e];if(r){t=r.call(this,t);if(t==null)return this}var i=this.prototype;switch($type(t)){case"function":if(t._hidden)return this;i[e]=Class.wrap(this,e,t);break;case"object":var s=i[e];$type(s)=="object"?$mixin(s,t):i[e]=$unlink(t);break;case"array":i[e]=$unlink(t);break;default:i[e]=t}return this}});Class.Mutators={Extends:function(e){this.parent=e;this.prototype=Class.instantiate(e);this.implement("parent",function(){var e=this.caller._name,t=this.caller._owner.parent.prototype[e];if(!t)throw new Error('The method "'+e+'" has no parent.');return t.apply(this,arguments)}.protect())},Implements:function(e){$splat(e).each(function(e){e instanceof Function&&(e=Class.instantiate(e));this.implement(e)},this)}};var Chain=new Class({$chain:[],chain:function(){this.$chain.extend(Array.flatten(arguments));return this},callChain:function(){return this.$chain.length?this.$chain.shift().apply(this,arguments):!1},clearChain:function(){this.$chain.empty();return this}}),Events=new Class({$events:{},addEvent:function(e,t,n){e=Events.removeOn(e);if(t!=$empty){this.$events[e]=this.$events[e]||[];this.$events[e].include(t);n&&(t.internal=!0)}return this},addEvents:function(e){for(var t in e)this.addEvent(t,e[t]);return this},fireEvent:function(e,t,n){e=Events.removeOn(e);if(!this.$events||!this.$events[e])return this;this.$events[e].each(function(e){e.create({bind:this,delay:n,arguments:t})()},this);return this},removeEvent:function(e,t){e=Events.removeOn(e);if(!this.$events[e])return this;t.internal||this.$events[e].erase(t);return this},removeEvents:function(e){var t;if($type(e)=="object"){for(t in e)this.removeEvent(t,e[t]);return this}e&&(e=Events.removeOn(e));for(t in this.$events){if(e&&e!=t)continue;var n=this.$events[t];for(var r=n.length;r--;r)this.removeEvent(t,n[r])}return this}});Events.removeOn=function(e){return e.replace(/^on([A-Z])/,function(e,t){return t.toLowerCase()})};var Options=new Class({setOptions:function(){this.options=$merge.run([this.options].extend(arguments));if(!this.addEvent)return this;for(var e in this.options){if($type(this.options[e])!="function"||!/^on[A-Z]/.test(e))continue;this.addEvent(e,this.options[e]);delete this.options[e]}return this}});
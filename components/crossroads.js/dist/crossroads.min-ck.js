/** @license
 * crossroads <http://millermedeiros.github.com/crossroads.js/>
 * Author: Miller Medeiros | MIT License
 * v0.12.0 (2013/01/21 13:47)
 */(function(){var e=function(e){function t(e,t){if(e.indexOf)return e.indexOf(t);var n=e.length;while(n--)if(e[n]===t)return n;return-1}function n(e,n){var r=t(e,n);r!==-1&&e.splice(r,1)}function r(e,t){return"[object "+t+"]"===Object.prototype.toString.call(e)}function i(e){return r(e,"RegExp")}function s(e){return r(e,"Array")}function o(e){return typeof e=="function"}function u(e){var t;return e===null||e==="null"?t=null:e==="true"?t=!0:e==="false"?t=!1:e===d||e==="undefined"?t=d:e===""||isNaN(e)?t=e:t=parseFloat(e),t}function a(e){var t=e.length,n=[];while(t--)n[t]=u(e[t]);return n}function f(e,t){var n=(e||"").replace("?","").split("&"),r=n.length,i={},s,o;while(r--)s=n[r].split("="),o=t?u(s[1]):s[1],i[s[0]]=typeof o=="string"?decodeURIComponent(o):o;return i}function l(){this.bypassed=new e.Signal,this.routed=new e.Signal,this._routes=[],this._prevRoutes=[],this._piped=[],this.resetState()}function c(t,n,r,s){var o=i(t),u=s.patternLexer;this._router=s,this._pattern=t,this._paramsIds=o?null:u.getParamIds(t),this._optionalParamsIds=o?null:u.getOptionalParamsIds(t),this._matchRegexp=o?t:u.compilePattern(t,s.ignoreCase),this.matched=new e.Signal,this.switched=new e.Signal,n&&this.matched.add(n),this._priority=r||0}var h,p,d;return p=/t(.+)?/.exec("t")[1]==="",l.prototype={greedy:!1,greedyEnabled:!0,ignoreCase:!0,ignoreState:!1,shouldTypecast:!1,normalizeFn:null,resetState:function(){this._prevRoutes.length=0,this._prevMatchedRequest=null,this._prevBypassedRequest=null},create:function(){return new l},addRoute:function(e,t,n){var r=new c(e,t,n,this);return this._sortedInsert(r),r},removeRoute:function(e){n(this._routes,e),e._destroy()},removeAllRoutes:function(){var e=this.getNumRoutes();while(e--)this._routes[e]._destroy();this._routes.length=0},parse:function(e,t){e=e||"",t=t||[];if(!this.ignoreState&&(e===this._prevMatchedRequest||e===this._prevBypassedRequest))return;var n=this._getMatchedRoutes(e),r=0,i=n.length,s;if(i){this._prevMatchedRequest=e,this._notifyPrevRoutes(n,e),this._prevRoutes=n;while(r<i)s=n[r],s.route.matched.dispatch.apply(s.route.matched,t.concat(s.params)),s.isFirst=!r,this.routed.dispatch.apply(this.routed,t.concat([e,s])),r+=1}else this._prevBypassedRequest=e,this.bypassed.dispatch.apply(this.bypassed,t.concat([e]));this._pipeParse(e,t)},_notifyPrevRoutes:function(e,t){var n=0,r;while(r=this._prevRoutes[n++])r.route.switched&&this._didSwitch(r.route,e)&&r.route.switched.dispatch(t)},_didSwitch:function(e,t){var n,r=0;while(n=t[r++])if(n.route===e)return!1;return!0},_pipeParse:function(e,t){var n=0,r;while(r=this._piped[n++])r.parse(e,t)},getNumRoutes:function(){return this._routes.length},_sortedInsert:function(e){var t=this._routes,n=t.length;do--n;while(t[n]&&e._priority<=t[n]._priority);t.splice(n+1,0,e)},_getMatchedRoutes:function(e){var t=[],n=this._routes,r=n.length,i;while(i=n[--r]){(!t.length||this.greedy||i.greedy)&&i.match(e)&&t.push({route:i,params:i._getParamsArray(e)});if(!this.greedyEnabled&&t.length)break}return t},pipe:function(e){this._piped.push(e)},unpipe:function(e){n(this._piped,e)},toString:function(){return"[crossroads numRoutes:"+this.getNumRoutes()+"]"}},h=new l,h.VERSION="0.12.0",h.NORM_AS_ARRAY=function(e,t){return[t.vals_]},h.NORM_AS_OBJECT=function(e,t){return[t]},c.prototype={greedy:!1,rules:void 0,match:function(e){return e=e||"",this._matchRegexp.test(e)&&this._validateParams(e)},_validateParams:function(e){var t=this.rules,n=this._getParamsObject(e),r;for(r in t)if(r!=="normalize_"&&t.hasOwnProperty(r)&&!this._isValidParam(e,r,n))return!1;return!0},_isValidParam:function(e,n,r){var u=this.rules[n],a=r[n],f=!1,l=n.indexOf("?")===0;return a==null&&this._optionalParamsIds&&t(this._optionalParamsIds,n)!==-1?f=!0:i(u)?(l&&(a=r[n+"_"]),f=u.test(a)):s(u)?(l&&(a=r[n+"_"]),f=this._isValidArrayRule(u,a)):o(u)&&(f=u(a,e,r)),f},_isValidArrayRule:function(e,n){if(!this._router.ignoreCase)return t(e,n)!==-1;typeof n=="string"&&(n=n.toLowerCase());var r=e.length,i,s;while(r--){i=e[r],s=typeof i=="string"?i.toLowerCase():i;if(s===n)return!0}return!1},_getParamsObject:function(e){var n=this._router.shouldTypecast,r=this._router.patternLexer.getParamValues(e,this._matchRegexp,n),i={},s=r.length,o,a;while(s--)a=r[s],this._paramsIds&&(o=this._paramsIds[s],o.indexOf("?")===0&&a&&(i[o+"_"]=a,a=f(a,n),r[s]=a),p&&a===""&&t(this._optionalParamsIds,o)!==-1&&(a=void 0,r[s]=a),i[o]=a),i[s]=a;return i.request_=n?u(e):e,i.vals_=r,i},_getParamsArray:function(e){var t=this.rules?this.rules.normalize_:null,n;return t=t||this._router.normalizeFn,t&&o(t)?n=t(e,this._getParamsObject(e)):n=this._getParamsObject(e).vals_,n},interpolate:function(e){var t=this._router.patternLexer.interpolate(this._pattern,e);if(!this._validateParams(t))throw new Error("Generated string doesn't validate against `Route.rules`.");return t},dispose:function(){this._router.removeRoute(this)},_destroy:function(){this.matched.dispose(),this.switched.dispose(),this.matched=this.switched=this._pattern=this._matchRegexp=null},toString:function(){return'[Route pattern:"'+this._pattern+'", numListeners:'+this.matched.getNumListeners()+"]"}},l.prototype.patternLexer=function(){function e(){var e,t;for(e in p)p.hasOwnProperty(e)&&(t=p[e],t.id="__CR_"+e+"__",t.save="save"in t?t.save.replace("{{id}}",t.id):t.id,t.rRestore=new RegExp(t.id,"g"))}function t(e,t){var n=[],r;e.lastIndex=0;while(r=e.exec(t))n.push(r[1]);return n}function n(e){return t(h,e)}function r(e){return t(p.OP.rgx,e)}function i(e,t){return e=e||"",e&&(g===d?e=e.replace(l,""):g===m&&(e=e.replace(c,"")),e=s(e,"rgx","save"),e=e.replace(f,"\\$&"),e=s(e,"rRestore","res"),g===d&&(e="\\/?"+e)),g!==v&&(e+="\\/?"),new RegExp("^"+e+"$",t?"i":"")}function s(e,t,n){var r,i;for(i in p)p.hasOwnProperty(i)&&(r=p[i],e=e.replace(r[t],r[n]));return e}function o(e,t,n){var r=t.exec(e);return r&&(r.shift(),n&&(r=a(r))),r}function u(e,t){if(typeof e!="string")throw new Error("Route pattern should be a string.");var n=function(e,n){var r;n=n.substr(0,1)==="?"?n.substr(1):n;if(t[n]!=null){if(typeof t[n]=="object"){var i=[];for(var s in t[n])i.push(encodeURI(s+"="+t[n][s]));r="?"+i.join("&")}else r=String(t[n]);if(e.indexOf("*")===-1&&r.indexOf("/")!==-1)throw new Error('Invalid value "'+r+'" for segment "'+e+'".')}else{if(e.indexOf("{")!==-1)throw new Error("The segment "+e+" is required.");r=""}return r};return p.OS.trail||(p.OS.trail=new RegExp("(?:"+p.OS.id+")+$")),e.replace(p.OS.rgx,p.OS.save).replace(h,n).replace(p.OS.trail,"").replace(p.OS.rRestore,"/")}var f=/[\\.+*?\^$\[\](){}\/'#]/g,l=/^\/|\/$/g,c=/\/$/g,h=/(?:\{|:)([^}:]+)(?:\}|:)/g,p={OS:{rgx:/([:}]|\w(?=\/))\/?(:|(?:\{\?))/g,save:"$1{{id}}$2",res:"\\/?"},RS:{rgx:/([:}])\/?(\{)/g,save:"$1{{id}}$2",res:"\\/"},RQ:{rgx:/\{\?([^}]+)\}/g,res:"\\?([^#]+)"},OQ:{rgx:/:\?([^:]+):/g,res:"(?:\\?([^#]*))?"},OR:{rgx:/:([^:]+)\*:/g,res:"(.*)?"},RR:{rgx:/\{([^}]+)\*\}/g,res:"(.+)"},RP:{rgx:/\{([^}]+)\}/g,res:"([^\\/?]+)"},OP:{rgx:/:([^:]+):/g,res:"([^\\/?]+)?/?"}},d=1,v=2,m=3,g=d;return e(),{strict:function(){g=v},loose:function(){g=d},legacy:function(){g=m},getParamIds:n,getOptionalParamsIds:r,getParamValues:o,compilePattern:i,interpolate:u}}(),h};typeof define=="function"&&define.amd?define(["signals"],e):typeof module!="undefined"&&module.exports?module.exports=e(require("signals")):window.crossroads=e(window.signals)})();
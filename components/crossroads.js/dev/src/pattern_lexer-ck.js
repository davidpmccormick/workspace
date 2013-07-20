// Pattern Lexer ------
//=====================
Crossroads.prototype.patternLexer=function(){function f(){var e,t;for(e in i)if(i.hasOwnProperty(e)){t=i[e];t.id="__CR_"+e+"__";t.save="save"in t?t.save.replace("{{id}}",t.id):t.id;t.rRestore=new RegExp(t.id,"g")}}function l(e,t){var n=[],r;e.lastIndex=0;while(r=e.exec(t))n.push(r[1]);return n}function c(e){return l(r,e)}function h(e){return l(i.OP.rgx,e)}function p(r,i){r=r||"";if(r){a===s?r=r.replace(t,""):a===u&&(r=r.replace(n,""));r=d(r,"rgx","save");r=r.replace(e,"\\$&");r=d(r,"rRestore","res");a===s&&(r="\\/?"+r)}a!==o&&(r+="\\/?");return new RegExp("^"+r+"$",i?"i":"")}function d(e,t,n){var r,s;for(s in i)if(i.hasOwnProperty(s)){r=i[s];e=e.replace(r[t],r[n])}return e}function v(e,t,n){var r=t.exec(e);if(r){r.shift();n&&(r=typecastArrayValues(r))}return r}function m(e,t){if(typeof e!="string")throw new Error("Route pattern should be a string.");var n=function(e,n){var r;n=n.substr(0,1)==="?"?n.substr(1):n;if(t[n]!=null){if(typeof t[n]=="object"){var i=[];for(var s in t[n])i.push(encodeURI(s+"="+t[n][s]));r="?"+i.join("&")}else r=String(t[n]);if(e.indexOf("*")===-1&&r.indexOf("/")!==-1)throw new Error('Invalid value "'+r+'" for segment "'+e+'".')}else{if(e.indexOf("{")!==-1)throw new Error("The segment "+e+" is required.");r=""}return r};i.OS.trail||(i.OS.trail=new RegExp("(?:"+i.OS.id+")+$"));return e.replace(i.OS.rgx,i.OS.save).replace(r,n).replace(i.OS.trail,"").replace(i.OS.rRestore,"/")}var e=/[\\.+*?\^$\[\](){}\/'#]/g,t=/^\/|\/$/g,n=/\/$/g,r=/(?:\{|:)([^}:]+)(?:\}|:)/g,i={OS:{rgx:/([:}]|\w(?=\/))\/?(:|(?:\{\?))/g,save:"$1{{id}}$2",res:"\\/?"},RS:{rgx:/([:}])\/?(\{)/g,save:"$1{{id}}$2",res:"\\/"},RQ:{rgx:/\{\?([^}]+)\}/g,res:"\\?([^#]+)"},OQ:{rgx:/:\?([^:]+):/g,res:"(?:\\?([^#]*))?"},OR:{rgx:/:([^:]+)\*:/g,res:"(.*)?"},RR:{rgx:/\{([^}]+)\*\}/g,res:"(.+)"},RP:{rgx:/\{([^}]+)\}/g,res:"([^\\/?]+)"},OP:{rgx:/:([^:]+):/g,res:"([^\\/?]+)?/?"}},s=1,o=2,u=3,a=s;f();return{strict:function(){a=o},loose:function(){a=s},legacy:function(){a=u},getParamIds:c,getOptionalParamsIds:h,getParamValues:v,compilePattern:p,interpolate:m}}();
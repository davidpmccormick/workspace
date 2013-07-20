//Like text.js but does a setTimeout before returning a value, to simulate
//slow template fetching.
/**
 * @license RequireJS text 1.0.2 Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 *//*jslint regexp: false, nomen: false, plusplus: false, strict: false *//*global require: false, XMLHttpRequest: false, ActiveXObject: false,
  define: false, window: false, process: false, Packages: false,
  java: false, location: false, setTimeout */(function(){var e=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],t=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,n=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,r=typeof location!="undefined"&&location.href,i=r&&location.protocol&&location.protocol.replace(/\:/,""),s=r&&location.hostname,o=r&&(location.port||undefined),u=[];define(function(){var a,f,l;if(typeof window!="undefined"&&window.navigator&&window.document)f=function(e,t){var n=a.createXhr();n.open("GET",e,!0);n.onreadystatechange=function(e){n.readyState===4&&t(n.responseText)};n.send(null)};else if(typeof process!="undefined"&&process.versions&&!!process.versions.node){l=require.nodeRequire("fs");f=function(e,t){t(l.readFileSync(e,"utf8"))}}else typeof Packages!="undefined"&&(f=function(e,t){var n="utf-8",r=new java.io.File(e),i=java.lang.System.getProperty("line.separator"),s=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(r),n)),o,u,a="";try{o=new java.lang.StringBuffer;u=s.readLine();u&&u.length()&&u.charAt(0)===65279&&(u=u.substring(1));o.append(u);while((u=s.readLine())!==null){o.append(i);o.append(u)}a=String(o.toString())}finally{s.close()}t(a)});a={version:"1.0.2",strip:function(e){if(e){e=e.replace(t,"");var r=e.match(n);r&&(e=r[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r")},createXhr:function(){var t,n,r;if(typeof XMLHttpRequest!="undefined")return new XMLHttpRequest;for(n=0;n<3;n++){r=e[n];try{t=new ActiveXObject(r)}catch(i){}if(t){e=[r];break}}if(!t)throw new Error("createXhr(): XMLHttpRequest not available");return t},get:f,parseName:function(e){var t=!1,n=e.indexOf("."),r=e.substring(0,n),i=e.substring(n+1,e.length);n=i.indexOf("!");if(n!==-1){t=i.substring(n+1,i.length);t=t==="strip";i=i.substring(0,n)}return{moduleName:r,ext:i,strip:t}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,t,n,r){var i=a.xdRegExp.exec(e),s,o,u;if(!i)return!0;s=i[2];o=i[3];o=o.split(":");u=o[1];o=o[0];return(!s||s===t)&&(!o||o===n)&&(!u&&!o||u===r)},finishLoad:function(e,t,n,r,i){n=t?a.strip(n):n;i.isBuild&&(u[e]=n);setTimeout(function(){r(n)},500)},load:function(e,t,n,u){if(u.isBuild&&!u.inlineText){n();return}var f=a.parseName(e),l=f.moduleName+"."+f.ext,c=t.toUrl(l),h=u&&u.text&&u.text.useXhr||a.useXhr;!r||h(c,i,s,o)?a.get(c,function(t){a.finishLoad(e,f.strip,t,n,u)}):t([l],function(e){a.finishLoad(f.moduleName+"."+f.ext,f.strip,e,n,u)})},write:function(e,t,n,r){if(t in u){var i=a.jsEscape(u[t]);n.asModule(e+"!"+t,"define(function () { return '"+i+"';});\n")}},writeFile:function(e,t,n,r,i){var s=a.parseName(t),o=s.moduleName+"."+s.ext,u=n.toUrl(s.moduleName+"."+s.ext)+".js";a.load(o,n,function(t){var n=function(e){return r(u,e)};n.asModule=function(e,t){return r.asModule(e,u,t)};a.write(e,o,n,i)},i)}};return a})})();
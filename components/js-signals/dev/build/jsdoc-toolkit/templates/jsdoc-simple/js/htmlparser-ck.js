/*
 * HTML Parser By John Resig (ejohn.org)
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 *
 * // Use like so:
 * HTMLParser(htmlString, {
 *     start: function(tag, attrs, unary) {},
 *     end: function(tag) {},
 *     chars: function(text) {},
 *     comment: function(text) {}
 * });
 *
 * // or to get an XML string:
 * HTMLtoXML(htmlString);
 *
 * // or to get an XML DOM Document
 * HTMLtoDOM(htmlString);
 *
 * // or to inject into an existing document/DOM node
 * HTMLtoDOM(htmlString, document);
 * HTMLtoDOM(htmlString, document.body);
 *
 */(function(){function l(e){var t={},n=e.split(",");for(var r=0;r<n.length;r++)t[n[r]]=!0;return t}var e=/^<(\w+)((?:\s+\w+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,t=/^<\/(\w+)[^>]*>/,n=/(\w+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,r=l("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed"),i=l("address,applet,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,p,pre,script,table,tbody,td,tfoot,th,thead,tr,ul"),s=l("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"),o=l("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"),u=l("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"),a=l(""),f=this.HTMLParser=function(f,l){function g(e,t,a,f){if(i[t])while(d.last()&&s[d.last()])y("",d.last());o[t]&&d.last()==t&&y("",t);f=r[t]||!!f;f||d.push(t);if(l.start){var c=[];a.replace(n,function(e,t){var n=arguments[2]?arguments[2]:arguments[3]?arguments[3]:arguments[4]?arguments[4]:u[t]?t:"";c.push({name:t,value:n,escaped:n.replace(/(^|[^\\])"/g,'$1\\"')})});l.start&&l.start(t,c,f)}}function y(e,t){if(!t)var n=0;else for(var n=d.length-1;n>=0;n--)if(d[n]==t)break;if(n>=0){for(var r=d.length-1;r>=n;r--)l.end&&l.end(d[r]);d.length=n}}var c,h,p,d=[],v=f;d.last=function(){return this[this.length-1]};while(f){h=!0;if(!d.last()||!a[d.last()]){if(f.indexOf("<!--")==0){c=f.indexOf("-->");if(c>=0){l.comment&&l.comment(f.substring(4,c));f=f.substring(c+3);h=!1}}else if(f.indexOf("</")==0){p=f.match(t);if(p){f=f.substring(p[0].length);p[0].replace(t,y);h=!1}}else if(f.indexOf("<")==0){p=f.match(e);if(p){f=f.substring(p[0].length);p[0].replace(e,g);h=!1}}if(h){c=f.indexOf("<");var m=c<0?f:f.substring(0,c);f=c<0?"":f.substring(c);l.chars&&l.chars(m)}}else{f=f.replace(new RegExp("(.*)</"+d.last()+"[^>]*>"),function(e,t){t=t.replace(/<!--(.*?)-->/g,"$1").replace(/<!\[CDATA\[(.*?)]]>/g,"$1");l.chars&&l.chars(t);return""});y("",d.last())}if(f==v)throw"Parse Error: "+f;v=f}y()};this.HTMLtoXML=function(e){var t="";f(e,{start:function(e,n,r){t+="<"+e;for(var i=0;i<n.length;i++)t+=" "+n[i].name+'="'+n[i].escaped+'"';t+=(r?"/":"")+">"},end:function(e){t+="</"+e+">"},chars:function(e){t+=e},comment:function(e){t+="<!--"+e+"-->"}});return t};this.HTMLtoDOM=function(e,t){var n=l("html,head,body,title"),r={link:"head",base:"head"};t?t=t.ownerDocument||t.getOwnerDocument&&t.getOwnerDocument()||t:typeof DOMDocument!="undefined"?t=new DOMDocument:typeof document!="undefined"&&document.implementation&&document.implementation.createDocument?t=document.implementation.createDocument("","",null):typeof ActiveX!="undefined"&&(t=new ActiveXObject("Msxml.DOMDocument"));var i=[],s=t.documentElement||t.getDocumentElement&&t.getDocumentElement();!s&&t.createElement&&function(){var e=t.createElement("html"),n=t.createElement("head");n.appendChild(t.createElement("title"));e.appendChild(n);e.appendChild(t.createElement("body"));t.appendChild(e)}();if(t.getElementsByTagName)for(var o in n)n[o]=t.getElementsByTagName(o)[0];var u=n.body;f(e,{start:function(e,s,o){if(n[e]){u=n[e];return}var a=t.createElement(e);for(var f in s)a.setAttribute(s[f].name,s[f].value);r[e]&&typeof n[r[e]]!="boolean"?n[r[e]].appendChild(a):u&&u.appendChild&&u.appendChild(a);if(!o){i.push(a);u=a}},end:function(e){i.length-=1;u=i[i.length-1]},chars:function(e){u.appendChild(t.createTextNode(e))},comment:function(e){}});return t}})();
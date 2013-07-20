/*!
 * Hasher <http://github.com/millermedeiros/hasher>
 * @author Miller Medeiros
 * @version 1.1.3 (2013/03/14 07:02 PM)
 * Released under the MIT License
 */(function(){var e=function(e){var t=function(t){function w(e){return String(e||"").replace(/[\\.+*?\^$\[\](){}\/'#]/g,"\\$&")}function E(e){if(!e)return"";var t=new RegExp("^"+w(o.prependHash)+"|"+w(o.appendHash)+"$","g");return e.replace(t,"")}function S(){var e=h.exec(o.getURL());return e&&e[1]?decodeURIComponent(e[1]):""}function x(){return l?l.contentWindow.frameHash:null}function T(){l=r.createElement("iframe");l.src="about:blank";l.style.display="none";r.body.appendChild(l)}function N(){if(l&&u!==x()){var e=l.contentWindow.document;e.open();e.write("<html><head><title>"+r.title+'</title><script type="text/javascript">var frameHash="'+u+'";</script></head><body>&nbsp;</body></html>');e.close()}}function C(e,t){if(u!==e){var n=u;u=e;g&&(t?l.contentWindow.frameHash=e:N());o.changed.dispatch(E(e),E(n))}}function k(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on"+t,n)}function L(e,t,n){e.removeEventListener?e.removeEventListener(t,n,!1):e.detachEvent&&e.detachEvent("on"+t,n)}function A(e){e=Array.prototype.slice.call(arguments);var t=e.join(o.separator);t=t?o.prependHash+t.replace(d,"")+o.appendHash:t;return t}function O(e){e=encodeURI(e);v&&y&&(e=e.replace(/\?/,"%3F"));return e}var n=25,r=t.document,i=t.history,s=e.Signal,o,u,a,f,l,c,h=/#(.*)$/,p=/(\?.*)|(\#.*)/,d=/^\#/,v=!1,m="onhashchange"in t&&r.documentMode!==7,g=v&&!m,y=location.protocol==="file:";g?c=function(){var e=S(),t=x();t!==u&&t!==e?o.setHash(E(t)):e!==u&&C(e)}:c=function(){var e=S();e!==u&&C(e)};o={VERSION:"1.1.3",appendHash:"",prependHash:"/",separator:"/",changed:new s,stopped:new s,initialized:new s,init:function(){if(f)return;u=S();if(m)k(t,"hashchange",c);else{if(g){l||T();N()}a=setInterval(c,n)}f=!0;o.initialized.dispatch(E(u))},stop:function(){if(!f)return;if(m)L(t,"hashchange",c);else{clearInterval(a);a=null}f=!1;o.stopped.dispatch(E(u))},isActive:function(){return f},getURL:function(){return t.location.href},getBaseURL:function(){return o.getURL().replace(p,"")},setHash:function(e){e=A.apply(null,arguments);if(e!==u){C(e);e===u&&(t.location.hash="#"+O(e))}},replaceHash:function(e){e=A.apply(null,arguments);if(e!==u){C(e,!0);e===u&&t.location.replace("#"+O(e))}},getHash:function(){return E(u)},getHashAsArray:function(){return o.getHash().split(o.separator)},dispose:function(){o.stop();o.initialized.dispose();o.stopped.dispose();o.changed.dispose();l=o=t.hasher=null},toString:function(){return'[hasher version="'+o.VERSION+'" hash="'+o.getHash()+'"]'}};o.initialized.memorize=!0;return o}(window);return t};typeof define=="function"&&define.amd?define(["signals"],e):window.hasher=e(window.signals)})();
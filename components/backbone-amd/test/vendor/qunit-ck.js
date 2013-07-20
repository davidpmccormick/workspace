/**
 * QUnit v1.11.0 - A JavaScript Unit Testing Framework
 *
 * http://qunitjs.com
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */(function(e){function p(e){T(this,e);this.assertions=[];this.testNumber=++p.count}function d(){r.autorun=!0;r.currentModule&&_("moduleDone",t,{name:r.currentModule,failed:r.moduleStats.bad,passed:r.moduleStats.all-r.moduleStats.bad,total:r.moduleStats.all});var n,i,s=O("qunit-banner"),o=O("qunit-tests"),u=+(new f)-r.started,a=r.stats.all-r.stats.bad,c=["Tests completed in ",u," milliseconds.<br/>","<span class='passed'>",a,"</span> assertions of <span class='total'>",r.stats.all,"</span> passed, <span class='failed'>",r.stats.bad,"</span> failed."].join("");s&&(s.className=r.stats.bad?"qunit-fail":"qunit-pass");o&&(O("qunit-testresult").innerHTML=c);r.altertitle&&typeof document!="undefined"&&document.title&&(document.title=[r.stats.bad?"✖":"✔",document.title.replace(/^[\u2714\u2716] /i,"")].join(" "));if(r.reorder&&l.sessionStorage&&r.stats.bad===0)for(n=0;n<sessionStorage.length;n++){i=sessionStorage.key(n++);i.indexOf("qunit-test-")===0&&sessionStorage.removeItem(i)}e.scrollTo&&e.scrollTo(0,0);_("done",t,{failed:r.stats.bad,passed:a,total:r.stats.all,runtime:u})}function v(e){var t,n=r.filter&&r.filter.toLowerCase(),i=r.module&&r.module.toLowerCase(),s=(e.module+": "+e.testName).toLowerCase();if(e.callback&&e.callback.validTest===v){delete e.callback.validTest;return!0}if(r.testNumber)return e.testNumber===r.testNumber;if(i&&(!e.module||e.module.toLowerCase()!==i))return!1;if(!n)return!0;t=n.charAt(0)!=="!";t||(n=n.slice(1));return s.indexOf(n)!==-1?t:!t}function m(e,t){t=t===undefined?3:t;var n,r,i;if(e.stacktrace)return e.stacktrace.split("\n")[t+3];if(e.stack){n=e.stack.split("\n");/^error$/i.test(n[0])&&n.shift();if(o){r=[];for(i=t;i<n.length;i++){if(n[i].indexOf(o)!==-1)break;r.push(n[i])}if(r.length)return r.join("\n")}return n[t]}if(e.sourceURL){if(/qunit.js$/.test(e.sourceURL))return;return e.sourceURL+":"+e.line}}function g(e){try{throw new Error}catch(t){return m(t,e)}}function y(e){if(!e)return"";e+="";return e.replace(/['"<>&]/g,function(e){switch(e){case"'":return"&#039;";case'"':return"&quot;";case"<":return"&lt;";case">":return"&gt;";case"&":return"&amp;"}})}function b(e,t){r.queue.push(e);r.autorun&&!r.blocking&&w(t)}function w(t){function n(){w(t)}var i=(new f).getTime();r.depth=r.depth?r.depth+1:1;while(r.queue.length&&!r.blocking){if(!(!l.setTimeout||r.updateRate<=0||(new f).getTime()-i<r.updateRate)){e.setTimeout(n,13);break}r.queue.shift()()}r.depth--;t&&!r.blocking&&!r.queue.length&&r.depth===0&&d()}function E(){r.pollution=[];if(r.noglobals)for(var t in e){if(!a.call(e,t)||/^qunit-test-output/.test(t))continue;r.pollution.push(t)}}function S(){var e,n,i=r.pollution;E();e=x(r.pollution,i);e.length>0&&t.pushFailure("Introduced global variable(s): "+e.join(", "));n=x(i,r.pollution);n.length>0&&t.pushFailure("Deleted global variable(s): "+n.join(", "))}function x(e,t){var n,r,i=e.slice();for(n=0;n<i.length;n++)for(r=0;r<t.length;r++)if(i[n]===t[r]){i.splice(n,1);n--;break}return i}function T(t,n){for(var r in n)if(n[r]===undefined)delete t[r];else if(r!=="constructor"||t!==e)t[r]=n[r];return t}function N(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent("on"+t,n)}function C(e,t,n){var r=e.length;while(r--)N(e[r],t,n)}function k(e,t){return(" "+e.className+" ").indexOf(" "+t+" ")>-1}function L(e,t){k(e,t)||(e.className+=(e.className?" ":"")+t)}function A(t,n){var r=" "+t.className+" ";while(r.indexOf(" "+n+" ")>-1)r=r.replace(" "+n+" "," ");t.className=e.jQuery?jQuery.trim(r):r.trim?r.trim():r}function O(e){return typeof document!="undefined"&&!!document&&!!document.getElementById&&document.getElementById(e)}function M(e){return function(t){r[e].push(t)}}function _(e,n,i){var s,o;if(t.hasOwnProperty(e))t[e].call(n,i);else{o=r[e];for(s=0;s<o.length;s++)o[s].call(n,i)}}function D(e,t){if(t.indexOf)return t.indexOf(e);for(var n=0,r=t.length;n<r;n++)if(t[n]===e)return n;return-1}var t,n,r,i,s=0,o=(g(0)||"").replace(/(:\d+)+\)?/,"").replace(/.+\//,""),u=Object.prototype.toString,a=Object.prototype.hasOwnProperty,f=e.Date,l={setTimeout:typeof e.setTimeout!="undefined",sessionStorage:function(){var e="qunit-test-string";try{sessionStorage.setItem(e,e);sessionStorage.removeItem(e);return!0}catch(t){return!1}}()},c=function(e){var t,n,r=e.toString();if(r.substring(0,7)==="[object"){t=e.name?e.name.toString():"Error";n=e.message?e.message.toString():"";return t&&n?t+": "+n:t?t:n?n:"Error"}return r},h=function(e){var n,r,i=t.is("array",e)?[]:{};for(n in e)if(a.call(e,n)){r=e[n];i[n]=r===Object(r)?h(r):r}return i};p.count=0;p.prototype={init:function(){var e,n,r,i=O("qunit-tests");if(i){n=document.createElement("strong");n.innerHTML=this.nameHtml;e=document.createElement("a");e.innerHTML="Rerun";e.href=t.url({testNumber:this.testNumber});r=document.createElement("li");r.appendChild(n);r.appendChild(e);r.className="running";r.id=this.id="qunit-test-output"+s++;i.appendChild(r)}},setup:function(){if(this.module!==r.previousModule){r.previousModule&&_("moduleDone",t,{name:r.previousModule,failed:r.moduleStats.bad,passed:r.moduleStats.all-r.moduleStats.bad,total:r.moduleStats.all});r.previousModule=this.module;r.moduleStats={all:0,bad:0};_("moduleStart",t,{name:this.module})}else r.autorun&&_("moduleStart",t,{name:this.module});r.current=this;this.testEnvironment=T({setup:function(){},teardown:function(){}},this.moduleTestEnvironment);this.started=+(new f);_("testStart",t,{name:this.testName,module:this.module});t.current_testEnvironment=this.testEnvironment;r.pollution||E();if(r.notrycatch){this.testEnvironment.setup.call(this.testEnvironment);return}try{this.testEnvironment.setup.call(this.testEnvironment)}catch(e){t.pushFailure("Setup failed on "+this.testName+": "+(e.message||e),m(e,1))}},run:function(){r.current=this;var e=O("qunit-testresult");e&&(e.innerHTML="Running: <br/>"+this.nameHtml);this.async&&t.stop();this.callbackStarted=+(new f);if(r.notrycatch){this.callback.call(this.testEnvironment,t.assert);this.callbackRuntime=+(new f)-this.callbackStarted;return}try{this.callback.call(this.testEnvironment,t.assert);this.callbackRuntime=+(new f)-this.callbackStarted}catch(n){this.callbackRuntime=+(new f)-this.callbackStarted;t.pushFailure("Died on test #"+(this.assertions.length+1)+" "+this.stack+": "+(n.message||n),m(n,0));E();r.blocking&&t.start()}},teardown:function(){r.current=this;if(r.notrycatch){typeof this.callbackRuntime=="undefined"&&(this.callbackRuntime=+(new f)-this.callbackStarted);this.testEnvironment.teardown.call(this.testEnvironment);return}try{this.testEnvironment.teardown.call(this.testEnvironment)}catch(e){t.pushFailure("Teardown failed on "+this.testName+": "+(e.message||e),m(e,1))}S()},finish:function(){r.current=this;r.requireExpects&&this.expected===null?t.pushFailure("Expected number of assertions to be defined, but expect() was not called.",this.stack):this.expected!==null&&this.expected!==this.assertions.length?t.pushFailure("Expected "+this.expected+" assertions, but "+this.assertions.length+" were run",this.stack):this.expected===null&&!this.assertions.length&&t.pushFailure("Expected at least one assertion, but none were run - call expect(0) to accept zero assertions.",this.stack);var n,i,s,o,u,a,c,h=this,p=0,d=0,v=O("qunit-tests");this.runtime=+(new f)-this.started;r.stats.all+=this.assertions.length;r.moduleStats.all+=this.assertions.length;if(v){c=document.createElement("ol");c.className="qunit-assert-list";for(n=0;n<this.assertions.length;n++){i=this.assertions[n];a=document.createElement("li");a.className=i.result?"pass":"fail";a.innerHTML=i.message||(i.result?"okay":"failed");c.appendChild(a);if(i.result)p++;else{d++;r.stats.bad++;r.moduleStats.bad++}}t.config.reorder&&l.sessionStorage&&(d?sessionStorage.setItem("qunit-test-"+this.module+"-"+this.testName,d):sessionStorage.removeItem("qunit-test-"+this.module+"-"+this.testName));d===0&&L(c,"qunit-collapsed");o=document.createElement("strong");o.innerHTML=this.nameHtml+" <b class='counts'>(<b class='failed'>"+d+"</b>, <b class='passed'>"+p+"</b>, "+this.assertions.length+")</b>";N(o,"click",function(){var e=o.parentNode.lastChild,t=k(e,"qunit-collapsed");(t?A:L)(e,"qunit-collapsed")});N(o,"dblclick",function(n){var r=n&&n.target?n.target:e.event.srcElement;if(r.nodeName.toLowerCase()==="span"||r.nodeName.toLowerCase()==="b")r=r.parentNode;e.location&&r.nodeName.toLowerCase()==="strong"&&(e.location=t.url({testNumber:h.testNumber}))});u=document.createElement("span");u.className="runtime";u.innerHTML=this.runtime+" ms";a=O(this.id);a.className=d?"fail":"pass";a.removeChild(a.firstChild);s=a.firstChild;a.appendChild(o);a.appendChild(s);a.appendChild(u);a.appendChild(c)}else for(n=0;n<this.assertions.length;n++)if(!this.assertions[n].result){d++;r.stats.bad++;r.moduleStats.bad++}_("testDone",t,{name:this.testName,module:this.module,failed:d,passed:this.assertions.length-d,total:this.assertions.length,duration:this.runtime});t.reset();r.current=undefined},queue:function(){function r(){b(function(){n.setup()});b(function(){n.run()});b(function(){n.teardown()});b(function(){n.finish()})}var e,n=this;b(function(){n.init()});e=t.config.reorder&&l.sessionStorage&&+sessionStorage.getItem("qunit-test-"+this.module+"-"+this.testName);e?r():b(r,!0)}};t={module:function(e,t){r.currentModule=e;r.currentModuleTestEnvironment=t;r.modules[e]=!0},asyncTest:function(e,n,r){if(arguments.length===2){r=n;n=null}t.test(e,n,r,!0)},test:function(e,t,n,i){var s,o="<span class='test-name'>"+y(e)+"</span>";if(arguments.length===2){n=t;t=null}r.currentModule&&(o="<span class='module-name'>"+y(r.currentModule)+"</span>: "+o);s=new p({nameHtml:o,testName:e,expected:t,async:i,callback:n,module:r.currentModule,moduleTestEnvironment:r.currentModuleTestEnvironment,stack:g(2)});if(!v(s))return;s.queue()},expect:function(e){if(arguments.length!==1)return r.current.expected;r.current.expected=e},start:function(n){if(r.semaphore===undefined){t.begin(function(){setTimeout(function(){t.start(n)})});return}r.semaphore-=n||1;if(r.semaphore>0)return;if(r.semaphore<0){r.semaphore=0;t.pushFailure("Called start() while already started (QUnit.config.semaphore was 0 already)",null,g(2));return}if(l.setTimeout)e.setTimeout(function(){if(r.semaphore>0)return;r.timeout&&clearTimeout(r.timeout);r.blocking=!1;w(!0)},13);else{r.blocking=!1;w(!0)}},stop:function(n){r.semaphore+=n||1;r.blocking=!0;if(r.testTimeout&&l.setTimeout){clearTimeout(r.timeout);r.timeout=e.setTimeout(function(){t.ok(!1,"Test timed out");r.semaphore=1;t.start()},r.testTimeout)}}};n={ok:function(e,n){if(!r.current)throw new Error("ok() assertion outside test context, was "+g(2));e=!!e;var i,s={module:r.current.module,name:r.current.testName,result:e,message:n};n=y(n||(e?"okay":"failed"));n="<span class='test-message'>"+n+"</span>";if(!e){i=g(2);if(i){s.source=i;n+="<table><tr class='test-source'><th>Source: </th><td><pre>"+y(i)+"</pre></td></tr></table>"}}_("log",t,s);r.current.assertions.push({result:e,message:n})},equal:function(e,n,r){t.push(n==e,e,n,r)},notEqual:function(e,n,r){t.push(n!=e,e,n,r)},propEqual:function(e,n,r){e=h(e);n=h(n);t.push(t.equiv(e,n),e,n,r)},notPropEqual:function(e,n,r){e=h(e);n=h(n);t.push(!t.equiv(e,n),e,n,r)},deepEqual:function(e,n,r){t.push(t.equiv(e,n),e,n,r)},notDeepEqual:function(e,n,r){t.push(!t.equiv(e,n),e,n,r)},strictEqual:function(e,n,r){t.push(n===e,e,n,r)},notStrictEqual:function(e,n,r){t.push(n!==e,e,n,r)},"throws":function(e,n,i){var s,o=n,u=!1;if(typeof n=="string"){i=n;n=null}r.current.ignoreGlobalErrors=!0;try{e.call(r.current.testEnvironment)}catch(a){s=a}r.current.ignoreGlobalErrors=!1;if(s){if(!n){u=!0;o=null}else if(t.objectType(n)==="regexp")u=n.test(c(s));else if(s instanceof n)u=!0;else if(n.call({},s)===!0){o=null;u=!0}t.push(u,s,o,i)}else t.pushFailure(i,null,"No exception was thrown.")}};T(t,n);t.raises=n["throws"];t.equals=function(){t.push(!1,!1,!1,"QUnit.equals has been deprecated since 2009 (e88049a0), use QUnit.equal instead")};t.same=function(){t.push(!1,!1,!1,"QUnit.same has been deprecated since 2009 (e88049a0), use QUnit.deepEqual instead")};(function(){function e(){}e.prototype=t;t=new e;t.constructor=e})();r={queue:[],blocking:!0,hidepassed:!1,reorder:!0,altertitle:!0,requireExpects:!1,urlConfig:[{id:"noglobals",label:"Check for Globals",tooltip:"Enabling this will test if any test introduces new properties on the `window` object. Stored as query-strings."},{id:"notrycatch",label:"No try-catch",tooltip:"Enabling this will run tests outside of a try-catch block. Makes debugging exceptions in IE reasonable. Stored as query-strings."}],modules:{},begin:[],done:[],log:[],testStart:[],testDone:[],moduleStart:[],moduleDone:[]};if(typeof exports=="undefined"){T(e,t);e.QUnit=t}(function(){var n,i=e.location||{search:"",protocol:"file:"},s=i.search.slice(1).split("&"),o=s.length,u={},a;if(s[0])for(n=0;n<o;n++){a=s[n].split("=");a[0]=decodeURIComponent(a[0]);a[1]=a[1]?decodeURIComponent(a[1]):!0;u[a[0]]=a[1]}t.urlParams=u;r.filter=u.filter;r.module=u.module;r.testNumber=parseInt(u.testNumber,10)||null;t.isLocal=i.protocol==="file:"})();T(t,{assert:n,config:r,init:function(){T(r,{stats:{all:0,bad:0},moduleStats:{all:0,bad:0},started:+(new f),updateRate:1e3,blocking:!1,autostart:!0,autorun:!1,filter:"",queue:[],semaphore:1});var e,t,n,i=O("qunit");i&&(i.innerHTML="<h1 id='qunit-header'>"+y(document.title)+"</h1>"+"<h2 id='qunit-banner'></h2>"+"<div id='qunit-testrunner-toolbar'></div>"+"<h2 id='qunit-userAgent'></h2>"+"<ol id='qunit-tests'></ol>");e=O("qunit-tests");t=O("qunit-banner");n=O("qunit-testresult");e&&(e.innerHTML="");t&&(t.className="");n&&n.parentNode.removeChild(n);if(e){n=document.createElement("p");n.id="qunit-testresult";n.className="result";e.parentNode.insertBefore(n,e);n.innerHTML="Running...<br/>&nbsp;"}},reset:function(){var e=O("qunit-fixture");e&&(e.innerHTML=r.fixture)},triggerEvent:function(e,t,n){if(document.createEvent){n=document.createEvent("MouseEvents");n.initMouseEvent(t,!0,!0,e.ownerDocument.defaultView,0,0,0,0,0,!1,!1,!1,!1,0,null);e.dispatchEvent(n)}else e.fireEvent&&e.fireEvent("on"+t)},is:function(e,n){return t.objectType(n)===e},objectType:function(e){if(typeof e=="undefined")return"undefined";if(e===null)return"null";var t=u.call(e).match(/^\[object\s(.*)\]$/),n=t&&t[1]||"";switch(n){case"Number":if(isNaN(e))return"nan";return"number";case"String":case"Boolean":case"Array":case"Date":case"RegExp":case"Function":return n.toLowerCase()}return typeof e=="object"?"object":undefined},push:function(e,n,i,s){if(!r.current)throw new Error("assertion outside test context, was "+g());var o,u,a={module:r.current.module,name:r.current.testName,result:e,message:s,actual:n,expected:i};s=y(s)||(e?"okay":"failed");s="<span class='test-message'>"+s+"</span>";o=s;if(!e){i=y(t.jsDump.parse(i));n=y(t.jsDump.parse(n));o+="<table><tr class='test-expected'><th>Expected: </th><td><pre>"+i+"</pre></td></tr>";if(n!==i){o+="<tr class='test-actual'><th>Result: </th><td><pre>"+n+"</pre></td></tr>";o+="<tr class='test-diff'><th>Diff: </th><td><pre>"+t.diff(i,n)+"</pre></td></tr>"}u=g();if(u){a.source=u;o+="<tr class='test-source'><th>Source: </th><td><pre>"+y(u)+"</pre></td></tr>"}o+="</table>"}_("log",t,a);r.current.assertions.push({result:!!e,message:o})},pushFailure:function(e,n,i){if(!r.current)throw new Error("pushFailure() assertion outside test context, was "+g(2));var s,o={module:r.current.module,name:r.current.testName,result:!1,message:e};e=y(e)||"error";e="<span class='test-message'>"+e+"</span>";s=e;s+="<table>";i&&(s+="<tr class='test-actual'><th>Result: </th><td><pre>"+y(i)+"</pre></td></tr>");if(n){o.source=n;s+="<tr class='test-source'><th>Source: </th><td><pre>"+y(n)+"</pre></td></tr>"}s+="</table>";_("log",t,o);r.current.assertions.push({result:!1,message:s})},url:function(n){n=T(T({},t.urlParams),n);var r,i="?";for(r in n){if(!a.call(n,r))continue;i+=encodeURIComponent(r)+"="+encodeURIComponent(n[r])+"&"}return e.location.protocol+"//"+e.location.host+e.location.pathname+i.slice(0,-1)},extend:T,id:O,addEvent:N});T(t.constructor.prototype,{begin:M("begin"),done:M("done"),log:M("log"),testStart:M("testStart"),testDone:M("testDone"),moduleStart:M("moduleStart"),moduleDone:M("moduleDone")});if(typeof document=="undefined"||document.readyState==="complete")r.autorun=!0;t.load=function(){_("begin",t,{});var n,i,s,o,u,a,f,c,h,p,d,v,m,g=0,b="",w="",E=T({},r);t.init();T(r,E);r.blocking=!1;u=r.urlConfig.length;for(s=0;s<u;s++){p=r.urlConfig[s];typeof p=="string"&&(p={id:p,label:p,tooltip:"[no tooltip available]"});r[p.id]=t.urlParams[p.id];w+="<input id='qunit-urlconfig-"+y(p.id)+"' name='"+y(p.id)+"' type='checkbox'"+(r[p.id]?" checked='checked'":"")+" title='"+y(p.tooltip)+"'><label for='qunit-urlconfig-"+y(p.id)+"' title='"+y(p.tooltip)+"'>"+p.label+"</label>"}b+="<label for='qunit-modulefilter'>Module: </label><select id='qunit-modulefilter' name='modulefilter'><option value='' "+(r.module===undefined?"selected='selected'":"")+">< All Modules ></option>";for(s in r.modules)if(r.modules.hasOwnProperty(s)){g+=1;b+="<option value='"+y(encodeURIComponent(s))+"' "+(r.module===s?"selected='selected'":"")+">"+y(s)+"</option>"}b+="</select>";h=O("qunit-userAgent");h&&(h.innerHTML=navigator.userAgent);n=O("qunit-header");n&&(n.innerHTML="<a href='"+t.url({filter:undefined,module:undefined,testNumber:undefined})+"'>"+n.innerHTML+"</a> ");c=O("qunit-testrunner-toolbar");if(c){i=document.createElement("input");i.type="checkbox";i.id="qunit-filter-pass";N(i,"click",function(){var e,t=document.getElementById("qunit-tests");if(i.checked)t.className=t.className+" hidepass";else{e=" "+t.className.replace(/[\n\t\r]/g," ")+" ";t.className=e.replace(/ hidepass /," ")}l.sessionStorage&&(i.checked?sessionStorage.setItem("qunit-filter-passed-tests","true"):sessionStorage.removeItem("qunit-filter-passed-tests"))});if(r.hidepassed||l.sessionStorage&&sessionStorage.getItem("qunit-filter-passed-tests")){i.checked=!0;f=document.getElementById("qunit-tests");f.className=f.className+" hidepass"}c.appendChild(i);o=document.createElement("label");o.setAttribute("for","qunit-filter-pass");o.setAttribute("title","Only show tests and assertons that fail. Stored in sessionStorage.");o.innerHTML="Hide passed tests";c.appendChild(o);d=document.createElement("span");d.innerHTML=w;v=d.getElementsByTagName("input");C(v,"click",function(n){var r={},i=n.target||n.srcElement;r[i.name]=i.checked?!0:undefined;e.location=t.url(r)});c.appendChild(d);if(g>1){m=document.createElement("span");m.setAttribute("id","qunit-modulefilter-container");m.innerHTML=b;N(m.lastChild,"change",function(){var n=m.getElementsByTagName("select")[0],r=decodeURIComponent(n.options[n.selectedIndex].value);e.location=t.url({module:r===""?undefined:r})});c.appendChild(m)}}a=O("qunit-fixture");a&&(r.fixture=a.innerHTML);r.autostart&&t.start()};N(e,"load",t.load);i=e.onerror;e.onerror=function(e,n,r){var s=!1;i&&(s=i(e,n,r));if(s!==!0){if(t.config.current){if(t.config.current.ignoreGlobalErrors)return!0;t.pushFailure(e,n+":"+r)}else t.test("global failure",T(function(){t.pushFailure(e,n+":"+r)},{validTest:v}));return!1}return s};t.equiv=function(){function e(e,n,r){var i=t.objectType(e);if(i)return t.objectType(n[i])==="function"?n[i].apply(n,r):n[i]}var n,r=[],i=[],s=Object.getPrototypeOf||function(e){return e.__proto__},o=function(){function e(e,t){return e instanceof t.constructor||t instanceof e.constructor?t==e:t===e}return{string:e,"boolean":e,number:e,"null":e,"undefined":e,nan:function(e){return isNaN(e)},date:function(e,n){return t.objectType(e)==="date"&&n.valueOf()===e.valueOf()},regexp:function(e,n){return t.objectType(e)==="regexp"&&n.source===e.source&&n.global===e.global&&n.ignoreCase===e.ignoreCase&&n.multiline===e.multiline&&n.sticky===e.sticky},"function":function(){var e=r[r.length-1];return e!==Object&&typeof e!="undefined"},array:function(e,r){var s,o,u,a;if(t.objectType(e)!=="array")return!1;u=r.length;if(u!==e.length)return!1;i.push(r);for(s=0;s<u;s++){a=!1;for(o=0;o<i.length;o++)i[o]===r[s]&&(a=!0);if(!a&&!n(r[s],e[s])){i.pop();return!1}}i.pop();return!0},object:function(e,t){var o,u,a,f=!0,l=[],c=[];if(t.constructor===e.constructor||s(t)===null&&s(e)===Object.prototype||s(e)===null&&s(t)===Object.prototype){r.push(t.constructor);i.push(t);for(o in t){a=!1;for(u=0;u<i.length;u++)i[u]===t[o]&&(a=!0);l.push(o);if(!a&&!n(t[o],e[o])){f=!1;break}}r.pop();i.pop();for(o in e)c.push(o);return f&&n(l.sort(),c.sort())}return!1}}}();n=function(){var n=[].slice.apply(arguments);return n.length<2?!0:function(n,r){return n===r?!0:n===null||r===null||typeof n=="undefined"||typeof r=="undefined"||t.objectType(n)!==t.objectType(r)?!1:e(n,o,[r,n])}(n[0],n[1])&&arguments.callee.apply(this,n.splice(1,n.length-1))};return n}();t.jsDump=function(){function e(e){return'"'+e.toString().replace(/"/g,'\\"')+'"'}function n(e){return e+""}function r(e,t,n){var r=o.separator(),i=o.indent(),s=o.indent(1);t.join&&(t=t.join(","+r+s));return t?[e,s+t,i+n].join(r):e+n}function i(e,t){var n=e.length,i=new Array(n);this.up();while(n--)i[n]=this.parse(e[n],undefined,t);this.down();return r("[",i,"]")}var s=/^function (\w+)/,o={parse:function(e,t,n){n=n||[];var r,i,s=this.parsers[t||this.typeOf(e)];t=typeof s;r=D(e,n);if(r!==-1)return"recursion("+(r-n.length)+")";if(t==="function"){n.push(e);i=s.call(this,e,n);n.pop();return i}return t==="string"?s:this.parsers.error},typeOf:function(e){var n;e===null?n="null":typeof e=="undefined"?n="undefined":t.is("regexp",e)?n="regexp":t.is("date",e)?n="date":t.is("function",e)?n="function":typeof e.setInterval!==undefined&&typeof e.document!="undefined"&&typeof e.nodeType=="undefined"?n="window":e.nodeType===9?n="document":e.nodeType?n="node":u.call(e)==="[object Array]"||typeof e.length=="number"&&typeof e.item!="undefined"&&(e.length?e.item(0)===e[0]:e.item(0)===null&&typeof e[0]=="undefined")?n="array":e.constructor===Error.prototype.constructor?n="error":n=typeof e;return n},separator:function(){return this.multiline?this.HTML?"<br />":"\n":this.HTML?"&nbsp;":" "},indent:function(e){if(!this.multiline)return"";var t=this.indentChar;this.HTML&&(t=t.replace(/\t/g,"   ").replace(/ /g,"&nbsp;"));return(new Array(this._depth_+(e||0))).join(t)},up:function(e){this._depth_+=e||1},down:function(e){this._depth_-=e||1},setParser:function(e,t){this.parsers[e]=t},quote:e,literal:n,join:r,_depth_:1,parsers:{window:"[Window]",document:"[Document]",error:function(e){return'Error("'+e.message+'")'},unknown:"[Unknown]","null":"null","undefined":"undefined","function":function(e){var n="function",i="name"in e?e.name:(s.exec(e)||[])[1];i&&(n+=" "+i);n+="( ";n=[n,t.jsDump.parse(e,"functionArgs"),"){"].join("");return r(n,t.jsDump.parse(e,"functionCode"),"}")},array:i,nodelist:i,arguments:i,object:function(e,n){var i=[],s,o,u,a;t.jsDump.up();s=[];for(o in e)s.push(o);s.sort();for(a=0;a<s.length;a++){o=s[a];u=e[o];i.push(t.jsDump.parse(o,"key")+": "+t.jsDump.parse(u,undefined,n))}t.jsDump.down();return r("{",i,"}")},node:function(e){var n,r,i,s=t.jsDump.HTML?"&lt;":"<",o=t.jsDump.HTML?"&gt;":">",u=e.nodeName.toLowerCase(),a=s+u,f=e.attributes;if(f)for(r=0,n=f.length;r<n;r++){i=f[r].nodeValue;i&&i!=="inherit"&&(a+=" "+f[r].nodeName+"="+t.jsDump.parse(i,"attribute"))}a+=o;if(e.nodeType===3||e.nodeType===4)a+=e.nodeValue;return a+s+"/"+u+o},functionArgs:function(e){var t,n=e.length;if(!n)return"";t=new Array(n);while(n--)t[n]=String.fromCharCode(97+n);return" "+t.join(", ")+" "},key:e,functionCode:"[code]",attribute:e,string:e,date:e,regexp:n,number:n,"boolean":n},HTML:!1,indentChar:"  ",multiline:!0};return o}();t.diff=function(){function e(e,t){var n,r={},i={};for(n=0;n<t.length;n++){a.call(r,t[n])||(r[t[n]]={rows:[],o:null});r[t[n]].rows.push(n)}for(n=0;n<e.length;n++){a.call(i,e[n])||(i[e[n]]={rows:[],n:null});i[e[n]].rows.push(n)}for(n in r){if(!a.call(r,n))continue;if(r[n].rows.length===1&&a.call(i,n)&&i[n].rows.length===1){t[r[n].rows[0]]={text:t[r[n].rows[0]],row:i[n].rows[0]};e[i[n].rows[0]]={text:e[i[n].rows[0]],row:r[n].rows[0]}}}for(n=0;n<t.length-1;n++)if(t[n].text!=null&&t[n+1].text==null&&t[n].row+1<e.length&&e[t[n].row+1].text==null&&t[n+1]==e[t[n].row+1]){t[n+1]={text:t[n+1],row:t[n].row+1};e[t[n].row+1]={text:e[t[n].row+1],row:n+1}}for(n=t.length-1;n>0;n--)if(t[n].text!=null&&t[n-1].text==null&&t[n].row>0&&e[t[n].row-1].text==null&&t[n-1]==e[t[n].row-1]){t[n-1]={text:t[n-1],row:t[n].row-1};e[t[n].row-1]={text:e[t[n].row-1],row:n-1}}return{o:e,n:t}}return function(t,n){t=t.replace(/\s+$/,"");n=n.replace(/\s+$/,"");var r,i,s="",o=e(t===""?[]:t.split(/\s+/),n===""?[]:n.split(/\s+/)),u=t.match(/\s+/g),a=n.match(/\s+/g);u==null?u=[" "]:u.push(" ");a==null?a=[" "]:a.push(" ");if(o.n.length===0)for(r=0;r<o.o.length;r++)s+="<del>"+o.o[r]+u[r]+"</del>";else{if(o.n[0].text==null)for(n=0;n<o.o.length&&o.o[n].text==null;n++)s+="<del>"+o.o[n]+u[n]+"</del>";for(r=0;r<o.n.length;r++)if(o.n[r].text==null)s+="<ins>"+o.n[r]+a[r]+"</ins>";else{i="";for(n=o.n[r].row+1;n<o.o.length&&o.o[n].text==null;n++)i+="<del>"+o.o[n]+u[n]+"</del>";s+=" "+o.n[r].text+a[r]+i}}return s}}();typeof exports!="undefined"&&T(exports,t)})(function(){return this}.call());
LOG.inform("XMLDOC.DomReader loaded");XMLDOC.DomReader=function(e){this.dom=e;this.node=e;XMLDOC.DomReader.prototype.getNode=function(){return this.node};XMLDOC.DomReader.prototype.setNode=function(e){this.node=e};XMLDOC.DomReader.prototype.navigate=function(e){var t;if((t=e)!=null){this.node=t;return this.node}return null};XMLDOC.DomReader.prototype.root=function(){this.navigate(this.dom)};XMLDOC.DomReader.prototype.parent=function(){return this.navigate(this.node.parentNode())};XMLDOC.DomReader.prototype.firstChild=function(){return this.navigate(this.node.firstChild())};XMLDOC.DomReader.prototype.lastChild=function(){return this.navigate(this.node.lastChild())};XMLDOC.DomReader.prototype.nextSibling=function(){return this.navigate(this.node.nextSibling())};XMLDOC.DomReader.prototype.prevSibling=function(){return this.navigate(this.node.prevSibling())};XMLDOC.DomReader.prototype.getSymbols=function(e){XMLDOC.DomReader.symbols=[];XMLDOC.DomReader.currentFile=e;JSDOC.Symbol.srcFile=e||"";defined(JSDOC.PluginManager)&&JSDOC.PluginManager.run("onDomGetSymbols",this);return XMLDOC.DomReader.symbols};XMLDOC.DomReader.prototype.findNode=function(e){function n(e,t){var r=null;if(e){if(e.name==t)return e;e.firstChild()&&(r=n(e.firstChild(),t));!r&&e.nextSibling()&&(r=n(e.nextSibling(),t))}return r}var t=null;return n(this.getNode().firstChild(),e)};XMLDOC.DomReader.prototype.findPreviousNode=function(e){}};
JSDOC.PluginManager.registerPlugin("JSDOC.frameworkPrototype",{onPrototypeClassCreate:function(e){var t="";e.comment&&(t=e.comment);var n=t+"/** @name "+e.name+"\n@constructor\n@scope "+e.name+".prototype */";n=n.replace(/\*\/\/\*\*/g,"\n");e.addComment.data=n}});
JSDOC.PluginManager.registerPlugin("JSDOC.tagParamConfig",{onDocCommentTags:function(e){var t=null,n=e.tags;for(var r=0,i=n.length;r<i;r++)if(n[r].title=="param")n[r].name.indexOf(".")==-1&&(t=r);else if(n[r].title=="config"){n[r].title="param";t==null?n[r].name="arguments."+n[r].name:n[r].name.indexOf(n[t].name+".")!=0&&(n[r].name=n[t].name+"."+n[r].name);t!=null}else t=null}});
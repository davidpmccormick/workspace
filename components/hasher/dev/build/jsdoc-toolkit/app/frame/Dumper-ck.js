/**
 * @class
<pre>
This is a lightly modified version of Kevin Jones' JavaScript
library Data.Dump. To download the original visit:
    <a href="http://openjsan.org/doc/k/ke/kevinj/Data/Dump/">http://openjsan.org/doc/k/ke/kevinj/Data/Dump/</a>

AUTHORS

The Data.Dump JavaScript module is written by Kevin Jones 
(kevinj@cpan.org), based on Data::Dump by Gisle Aas (gisle@aas.no),
based on Data::Dumper by Gurusamy Sarathy (gsar@umich.edu).

COPYRIGHT

Copyright 2007 Kevin Jones. Copyright 1998-2000,2003-2004 Gisle Aas.
Copyright 1996-1998 Gurusamy Sarathy.

This program is free software; you can redistribute it and/or modify
it under the terms of the Perl Artistic License

See http://www.perl.com/perl/misc/Artistic.html
</pre>
 * @static
 */Dumper={dump:function(){return arguments.length>1?this._dump(arguments):arguments.length==1?this._dump(arguments[0]):"()"},_dump:function(e){if(typeof e=="undefined")return"undefined";var t;if(e.serialize)return e.serialize();var n=this._typeof(e);e.circularReference&&e.circularReference++;switch(n){case"circular":t="{ //circularReference\n}";break;case"object":var r=new Array;for(var i in e)i!="circularReference"&&e.hasOwnProperty(i)&&r.push(i+": "+this._dump(e[i]));t="{"+this._format_list(r)+"}";break;case"string":for(var i in Dumper.ESC)Dumper.ESC.hasOwnProperty(i)&&(e=e.replace(i,Dumper.ESC[i]));e.match(/^[\x00-\x7f]*$/)?t='"'+e.replace(/\"/g,'\\"').replace(/([\n\r]+)/g,"\\$1")+'"':t="unescape('"+escape(e)+"')";break;case"array":var s=new Array;for(var o=0;o<e.length;o++)s.push(this._dump(e[o]));t="["+this._format_list(s)+"]";break;case"date":var u=e.toUTCString().replace(/GMT/,"UTC");t='new Date("'+u+'")';break;case"element":t=this._dump_dom(e);break;default:t=e}t=String(t).replace(/\n/g,"\n    ");t=t.replace(/\n    (.*)$/,"\n$1");return t},_format_list:function(e){if(!e.length)return"";var t=e.toString().length>60?"\n":" ";return t+e.join(","+t)+t},_typeof:function(e){return e&&e.circularReference&&e.circularReference>1?"circular":Array.prototype.isPrototypeOf(e)?"array":Date.prototype.isPrototypeOf(e)?"date":typeof e.nodeType!="undefined"?"element":typeof e},_dump_dom:function(e){return'"'+Dumper.nodeTypes[e.nodeType]+'"'}};Dumper.ESC={"	":"\\t","\n":"\\n","\f":"\\f"};Dumper.nodeTypes={1:"ELEMENT_NODE",2:"ATTRIBUTE_NODE",3:"TEXT_NODE",4:"CDATA_SECTION_NODE",5:"ENTITY_REFERENCE_NODE",6:"ENTITY_NODE",7:"PROCESSING_INSTRUCTION_NODE",8:"COMMENT_NODE",9:"DOCUMENT_NODE",10:"DOCUMENT_TYPE_NODE",11:"DOCUMENT_FRAGMENT_NODE",12:"NOTATION_NODE"};
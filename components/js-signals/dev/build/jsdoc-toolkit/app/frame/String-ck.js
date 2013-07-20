/**
	@name String
	@class Additions to the core string object.
*//** @author Steven Levithan, released as public domain. */String.prototype.trim=function(){var e=this.replace(/^\s+/,"");for(var t=e.length-1;t>=0;t--)if(/\S/.test(e.charAt(t))){e=e.substring(0,t+1);break}return e};String.prototype.balance=function(e,t){var n=0;while(this.charAt(n)!=e){if(n==this.length)return[-1,-1];n++}var r=n+1,i=1;while(r<this.length){this.charAt(r)==e&&i++;this.charAt(r)==t&&i--;if(i==0)break;r++;if(r==this.length)return[-1,-1]}return[n,r]};
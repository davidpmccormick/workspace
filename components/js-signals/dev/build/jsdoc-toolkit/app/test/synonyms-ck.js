/**
	@class
	@inherits Bar#zop as #my_zop
*/function Foo(){this.zip=function(){};this.my_zop=(new Bar).zop}function Bar(){this.zop=function(){};this.my_zip=(new Foo).zip}var myObject={myFunc:getFunction()};
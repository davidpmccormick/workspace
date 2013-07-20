// testing circular borrows
/**
	@class
	@borrows Bar#zop as this.my_zop
*/function Foo(){this.zip=function(){};this.my_zop=(new Bar).zop}function Bar(){this.zop=function(){};this.my_zip=(new Foo).zip};
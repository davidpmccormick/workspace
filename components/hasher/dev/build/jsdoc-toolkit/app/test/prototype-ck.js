/** @constructor */function Article(){}Article.prototype.init=function(e){this.title=e;Article.counter=1};a=new Article;a.Init("my title");print(a.title);print(Article.counter);
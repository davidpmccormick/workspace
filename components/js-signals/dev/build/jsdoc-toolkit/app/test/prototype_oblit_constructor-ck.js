/** @constructor */function Article(){}Article.prototype={Title:function(e){this.title=e},init:function(e){this.pages=e}};f=new Article;f.init("one two three");t=new f.Title("my title");print(f.pages);print(t.title);
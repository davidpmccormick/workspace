/** 
 * @fileoverview This file is to be used for testing the JSDoc parser
 * It is not intended to be an example of good JavaScript OO-programming,
 * nor is it intended to fulfill any specific purpose apart from 
 * demonstrating the functionality of the 
 * <a href='http://sourceforge.net/projects/jsdoc'>JSDoc</a> parser
 *
 * @author Gabriel Reid gab_reid@users.sourceforge.net
 * @version 0.1 
 *//**
 * Construct a new Shape object.
 * @class This is the basic Shape class.  
 * It can be considered an abstract class, even though no such thing
 * really existing in JavaScript
 * @constructor
 * @throws MemoryException if there is no more memory 
 * @throws GeneralShapeException rarely (if ever)
 * @return {Shape|Coordinate} A new shape.
 */function Shape(){function e(){}this.getClassName=function(){return"Shape"}}function Hexagon(e){}function Add(e,t){return e+t}function Rectangle(e,t){if(e){this.width=e;t&&(this.height=t)}}function Square(e,t){if(e){this.width=e;t&&(this.height=t)}}function Circle(e){e&&(this.radius=e)}function Coordinate(e,t){if(e){this.x=e;t&&(this.y=t)}}function ShapeFactory(){}function Foo(){}function Bar(){}Shape.prototype.color=null;Shape.prototype.border=function(){return border};Shape.prototype.getCoords=function(){return this.coords};Shape.prototype.getColor=function(){return this.color};Shape.prototype.setCoords=function(e){this.coords=e};Shape.prototype.setColor=function(e){this.color=e};Shape.prototype.clone=function(){return new Shape};Rectangle.prototype=new Shape;Rectangle.prototype.width=0;Rectangle.prototype.height=0;Rectangle.prototype.getClassName=function(){return"Rectangle"};Rectangle.prototype.getWidth=function(){return this.width};Rectangle.prototype.getHeight=function(){return this.height};Rectangle.prototype.setWidth=function(e){this.width=e};Rectangle.prototype.setHeight=function(e){this.height=e};Rectangle.prototype.getArea=function(){return width*height};Square.prototype=new Rectangle;Square.prototype.setWidth=function(e){this.width=this.height=e};Square.prototype.setHeight=function(e){this.height=this.width=e};Circle.prototype=new Shape;Circle.prototype.radius=0;Circle.PI=3.14;Circle.prototype.getRadius=function(){return this.radius};Circle.prototype.setRadius=function(e){this.radius=e};Circle.createCircle=function(e){return new Circle(e)};Coordinate.prototype.x=0;Coordinate.prototype.y=0;Coordinate.prototype.getX=function(){return this.x};Coordinate.prototype.getY=function(){return this.y};Coordinate.prototype.setX=function(e){this.x=e};Coordinate.prototype.setY=function(e){this.y=e};ShapeFactory.prototype={createShape:function(){return new Shape}};MySingletonShapeFactory=function(){this.getShape=function(){return null}};Foo.Bar=function(){this.x=2};Foo.Bar.prototype=new Bar;Foo.Bar.prototype.y="3";
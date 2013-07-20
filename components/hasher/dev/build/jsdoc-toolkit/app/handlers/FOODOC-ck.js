/**
   This is the main container for the FOODOC handler.
   @namespace
*/FOODOC={};FOODOC.VERSION="1.0";FOODOC.handle=function(e,t){LOG.inform("Handling file '"+e+"'");return[new JSDOC.Symbol("foo",[],"VIRTUAL",new JSDOC.DocComment("/** This is a foo. */"))]};FOODOC.publish=function(e){LOG.inform("Publishing symbolgroup.")};
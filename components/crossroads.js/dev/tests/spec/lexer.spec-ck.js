//for node
var crossroads=crossroads||require("../../../dist/crossroads");describe("patternLexer",function(){describe("getParamIds()",function(){it("should return an Array with the ids",function(){var e=crossroads.patternLexer.getParamIds("/lorem/{ipsum}/{dolor}");expect(e[0]).toEqual("ipsum");expect(e[1]).toEqual("dolor")})});describe("compilePattern()",function(){it("should create RegExp from string which should match pattern",function(){var e="/lorem/{ipsum}/{dolor}",t=crossroads.patternLexer.compilePattern(e);expect(t.test(e)).toEqual(!0)});it("should work with special chars",function(){var e="/lo[rem](ipsum)/{ipsum}/{dolor}",t=crossroads.patternLexer.compilePattern(e);expect(t.test(e)).toEqual(!0)});it("should work with optional params",function(){var e="/lo[rem](ipsum)/{ipsum}/{dolor}:foo::bar:/:blah:/maecennas",t=crossroads.patternLexer.compilePattern(e);expect(t.test(e)).toEqual(!0)});it("should support rest params",function(){var e="/lo[rem](ipsum)/{ipsum*}/{dolor}:foo::bar*:/:blah:/maecennas",t=crossroads.patternLexer.compilePattern(e);expect(t.test(e)).toEqual(!0)})});describe("getParamValues()",function(){it("should return pattern params",function(){var e="/lorem/{ipsum}/{dolor}",t=crossroads.patternLexer.compilePattern(e),n=crossroads.patternLexer.getParamValues("/lorem/foo/bar",t);expect(n[0]).toEqual("foo");expect(n[1]).toEqual("bar")})})});
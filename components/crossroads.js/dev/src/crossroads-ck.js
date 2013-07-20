// Crossroads --------
//====================
/**
     * @constructor
     */function Crossroads(){this.bypassed=new signals.Signal;this.routed=new signals.Signal;this._routes=[];this._prevRoutes=[];this._piped=[];this.resetState()}Crossroads.prototype={greedy:!1,greedyEnabled:!0,ignoreCase:!0,ignoreState:!1,shouldTypecast:!1,normalizeFn:null,resetState:function(){this._prevRoutes.length=0;this._prevMatchedRequest=null;this._prevBypassedRequest=null},create:function(){return new Crossroads},addRoute:function(e,t,n){var r=new Route(e,t,n,this);this._sortedInsert(r);return r},removeRoute:function(e){arrayRemove(this._routes,e);e._destroy()},removeAllRoutes:function(){var e=this.getNumRoutes();while(e--)this._routes[e]._destroy();this._routes.length=0},parse:function(e,t){e=e||"";t=t||[];if(!this.ignoreState&&(e===this._prevMatchedRequest||e===this._prevBypassedRequest))return;var n=this._getMatchedRoutes(e),r=0,i=n.length,s;if(i){this._prevMatchedRequest=e;this._notifyPrevRoutes(n,e);this._prevRoutes=n;while(r<i){s=n[r];s.route.matched.dispatch.apply(s.route.matched,t.concat(s.params));s.isFirst=!r;this.routed.dispatch.apply(this.routed,t.concat([e,s]));r+=1}}else{this._prevBypassedRequest=e;this.bypassed.dispatch.apply(this.bypassed,t.concat([e]))}this._pipeParse(e,t)},_notifyPrevRoutes:function(e,t){var n=0,r;while(r=this._prevRoutes[n++])r.route.switched&&this._didSwitch(r.route,e)&&r.route.switched.dispatch(t)},_didSwitch:function(e,t){var n,r=0;while(n=t[r++])if(n.route===e)return!1;return!0},_pipeParse:function(e,t){var n=0,r;while(r=this._piped[n++])r.parse(e,t)},getNumRoutes:function(){return this._routes.length},_sortedInsert:function(e){var t=this._routes,n=t.length;do--n;while(t[n]&&e._priority<=t[n]._priority);t.splice(n+1,0,e)},_getMatchedRoutes:function(e){var t=[],n=this._routes,r=n.length,i;while(i=n[--r]){(!t.length||this.greedy||i.greedy)&&i.match(e)&&t.push({route:i,params:i._getParamsArray(e)});if(!this.greedyEnabled&&t.length)break}return t},pipe:function(e){this._piped.push(e)},unpipe:function(e){arrayRemove(this._piped,e)},toString:function(){return"[crossroads numRoutes:"+this.getNumRoutes()+"]"}};crossroads=new Crossroads;crossroads.VERSION="::VERSION_NUMBER::";crossroads.NORM_AS_ARRAY=function(e,t){return[t.vals_]};crossroads.NORM_AS_OBJECT=function(e,t){return[t]};
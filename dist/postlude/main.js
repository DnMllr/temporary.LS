(function(){
  var ref$, zip, compact, difference, map, last, this$ = this, split$ = ''.split;
  ref$ = require('prelude-ls'), zip = ref$.zip, compact = ref$.compact, difference = ref$.difference, map = ref$.map, last = ref$.last;
  this.postlude = function(code){
    var routes, presentRouteArray, previousRouteArray, routeChanges, templates, Session, registerRoute, findLinksToRoutes, findTemplates, renderFunc, rerenderFunc, route, initialize;
    routes = {};
    presentRouteArray = split$.call(location.pathname, '/');
    previousRouteArray = split$.call(location.pathname, '/');
    routeChanges = [];
    templates = {
      renderAll: function(){
        var key, value, results$ = [];
        for (key in this) {
          value = this[key];
          if (key !== 'renderAll') {
            results$.push(value._rerender());
          }
        }
        return results$;
      }
    };
    Session = (function(){
      Session.displayName = 'Session';
      var prototype = Session.prototype, constructor = Session;
      function Session(name){
        this.name = name;
      }
      prototype.properties = {};
      prototype.get = function(property){
        return this.properties[property];
      };
      prototype.set = function(property, value){
        this.properties[property] = value;
        templates.renderAll();
        return value;
      };
      return Session;
    }());
    registerRoute = function(name, action){
      return routes[name] = action;
    };
    findLinksToRoutes = function(target){
      var allLinks, i$, len$, link, results$ = [];
      target == null && (target = document);
      allLinks = target.getElementsByTagName('a');
      for (i$ = 0, len$ = allLinks.length; i$ < len$; ++i$) {
        link = allLinks[i$];
        results$.push(link.addEventListener('click', fn$, true));
      }
      return results$;
      function fn$(it){
        var hotseat, params, i$, len$, index, route;
        it.preventDefault();
        presentRouteArray = compact(split$.call(it.target.href, '/'));
        hotseat = 'index';
        params = [];
        for (i$ = 0, len$ = presentRouteArray.length; i$ < len$; ++i$) {
          index = i$;
          route = presentRouteArray[i$];
          if (routes[route] != null) {
            routes[hotseat].apply(this, params);
            params = [];
            hotseat = route;
          } else {
            params.push(route);
          }
        }
        routes[hotseat].apply(this, params);
        previousRouteArray = presentRouteArray;
        history.pushState({}, it.target.textContent, it.target.href);
        return false;
      }
    };
    findTemplates = function(){
      var allTemplates, res$, key, name;
      res$ = [];
      for (key in jade.templates) {
        res$.push(key);
      }
      allTemplates = res$;
      return import$(templates, (function(){
        var i$, ref$, len$, results$ = {};
        for (i$ = 0, len$ = (ref$ = allTemplates).length; i$ < len$; ++i$) {
          name = ref$[i$];
          results$[name] = {
            _identity: name,
            render: renderFunc,
            _pastTarget: null,
            _rerender: rerenderFunc
          };
        }
        return results$;
      }()));
    };
    renderFunc = function(target){
      var flag, obj, res$, key, value, e, missingObj;
      this._pastTarget = target;
      flag = true;
      while (flag) {
        res$ = {};
        for (key in this) {
          value = this[key];
if (key[0] !== '_' && key !== 'render') {
            res$[key] = value();
          }
        }
        obj = res$;
        try {
          jade.render(target, this._identity, obj);
          flag = false;
        } catch (e$) {
          e = e$;
          missingObj = e.message.slice(0, e.message.indexOf(' is not defined'));
          this[missingObj] = fn$;
        }
      }
      return findLinksToRoutes(target);
      function fn$(){
        return '';
      }
    };
    rerenderFunc = function(){
      if (this.pastTarget != null) {
        return this.render(this.pastTarget);
      }
    };
    findLinksToRoutes();
    findTemplates();
    route = function(){
      var i$, len$, index, argument, results$ = [];
      for (i$ = 0, len$ = arguments.length; i$ < len$; i$ += 2) {
        index = i$;
        argument = arguments[i$];
        results$.push(registerRoute(argument, arguments[index + 1]));
      }
      return results$;
    };
    initialize = function(it){
      return it();
    };
    code(new Session('primary'), templates, route, initialize);
    this$.routes = routes;
    return this$.templates = templates;
  };
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);

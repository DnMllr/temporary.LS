(function(){
  var ref$, zip, compact, difference, map, last, this$ = this, split$ = ''.split;
  ref$ = require('prelude-ls'), zip = ref$.zip, compact = ref$.compact, difference = ref$.difference, map = ref$.map, last = ref$.last;
  this.postlude = function(code){
    var routes, presentRouteArray, previousRouteArray, routeChanges, session, templates, registerRoute, findLinksToRoutes, findTemplates, renderFunc, route, initialize;
    routes = {};
    presentRouteArray = split$.call(location.pathname, '/');
    previousRouteArray = split$.call(location.pathname, '/');
    routeChanges = [];
    session = {};
    templates = {};
    registerRoute = function(name, action){
      return routes[name] = action;
    };
    findLinksToRoutes = function(){
      var allLinks, i$, len$, link, results$ = [];
      allLinks = document.getElementsByTagName('a');
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
      var allTemplates, res$, i$, len$, template, name, lresult$, ref$, index, character, remainder, closer, key, results$ = [];
      allTemplates = document.getElementsByTagName('template');
      res$ = {};
      for (i$ = 0, len$ = allTemplates.length; i$ < len$; ++i$) {
        template = allTemplates[i$];
        res$[template.getAttribute('name')] = {
          temp: template.innerHTML,
          render: renderFunc
        };
      }
      templates = res$;
      for (name in templates) {
        template = templates[name];
        lresult$ = [];
        for (i$ = 0, len$ = (ref$ = template.temp).length; i$ < len$; ++i$) {
          index = i$;
          character = ref$[i$];
          if (character === '{' && template.temp[index + 1] === '{') {
            remainder = template.temp.slice(index + 2);
            closer = remainder.indexOf('}');
            if (remainder[closer + 1] === '}') {
              key = remainder.slice(0, closer);
              template[key] = '';
              lresult$.push(template.rendered = template.temp.slice(0, index) + remainder.slice(closer + 2));
            }
          }
        }
        results$.push(lresult$);
      }
      return results$;
    };
    renderFunc = function(target, destructive){
      var i$, ref$, len$, index, character, remainder, closer, key;
      destructive == null && (destructive = true);
      for (i$ = 0, len$ = (ref$ = this.temp).length; i$ < len$; ++i$) {
        index = i$;
        character = ref$[i$];
        if (character === '{' && this.temp[index + 1] === '{') {
          remainder = this.temp.slice(index + 2);
          closer = remainder.indexOf('}');
          if (remainder[closer + 1] === '}') {
            key = remainder.slice(0, closer);
            this.rendered = this.temp.slice(0, index) + this[key] + remainder.slice(closer + 2);
          }
        }
      }
      if (destructive) {
        return target.innerHTML = this.rendered;
      } else {
        return target.innerHTML += this.rendered;
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
    code(session, templates, route, initialize);
    this$.routes = routes;
    return this$.templates = templates;
  };
}).call(this);

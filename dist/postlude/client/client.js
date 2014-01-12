(function(){
  var ref$, zip, compact, difference, map, last, tail, socket, this$ = this, split$ = ''.split, join$ = [].join, toString$ = {}.toString;
  ref$ = require('prelude-ls'), zip = ref$.zip, compact = ref$.compact, difference = ref$.difference, map = ref$.map, last = ref$.last, tail = ref$.tail;
  socket = io.connect('http://localhost');
  this.postlude = function(code){
    var presentRouteArray, previousRouteArray, allTemplates, res$, key, findLinksToRoutes, fingerprint, IO, Template, Session;
    presentRouteArray = split$.call(location.pathname, '/');
    previousRouteArray = '';
    res$ = [];
    for (key in templatesB) {
      res$.push(key);
    }
    allTemplates = res$;
    findLinksToRoutes = function(target){
      var allLinks, i$, len$, link, ref$, results$ = [];
      target == null && (target = document);
      allLinks = target.getElementsByTagName('a');
      for (i$ = 0, len$ = allLinks.length; i$ < len$; ++i$) {
        link = allLinks[i$];
        if (((ref$ = link.getAttribute('href')) != null ? ref$.slice(0, 4) : void 8) !== 'http') {
          results$.push(link.addEventListener('click', fn$, true));
        }
      }
      return results$;
      function fn$(it){
        it.preventDefault();
        this.navigateTo(it.target.getAttribute('href'));
        return false;
      }
    };
    fingerprint = function(target, template){
      var allElements, i$, len$, element, results$ = [];
      allElements = target.getElementsByTagName('*');
      for (i$ = 0, len$ = allElements.length; i$ < len$; ++i$) {
        element = allElements[i$];
        results$.push(element.dataset.templateName = template.name);
      }
      return results$;
    };
    IO = (function(){
      IO.displayName = 'IO';
      var prototype = IO.prototype, constructor = IO;
      function IO(session){
        var this$ = this instanceof ctor$ ? this : new ctor$;
        this$.session = session;
        this$.expose = bind$(this$, 'expose', prototype);
        this$.template = bind$(this$, 'template', prototype);
        this$.route = bind$(this$, 'route', prototype);
        this$.on = bind$(this$, 'on', prototype);
        this$.emit = bind$(this$, 'emit', prototype);
        this$.wire = bind$(this$, 'wire', prototype);
        this$.getset = bind$(this$, 'getset', prototype);
        this$.set = bind$(this$, 'set', prototype);
        this$.get = bind$(this$, 'get', prototype);
        this$.navigateTo = bind$(this$, 'navigateTo', prototype);
        this$;
        return this$;
      } function ctor$(){} ctor$.prototype = prototype;
      IO.wires = {};
      findLinksToRoutes();
      prototype.navigateTo = function(url){
        var params, callStack, calledStack, i$, index, route, len$, call;
        presentRouteArray = filter((function(it){
          return it === '';
        }), split$.call(url, '/'));
        params = [];
        callStack = [];
        calledStack = [];
        for (i$ = presentRouteArray.length - 1; i$ >= 0; --i$) {
          index = i$;
          route = presentRouteArray[i$];
          if (this.session.events["route " + route] != null) {
            if (!in$([route].concat(join$.call(params, '/')), previousRouteArray)) {
              calledStack.push([route].concat(join$.call(params, '/')));
              params.shift(this.session.events["route " + route]);
              callStack.push(params);
              params = [];
            }
          } else {
            params.shift(route);
          }
        }
        previousRouteArray = calledStack;
        for (i$ = 0, len$ = callStack.length; i$ < len$; ++i$) {
          call = callStack[i$];
          head(call).apply(this, tail(call));
        }
        return history.pushState({}, 'nothing', url);
      };
      prototype.get = function(property){
        return this.session.properties[property];
      };
      prototype.set = function(property, value){
        if (this.session.properties[property] == null) {
          this.session.properties[property] = value;
          this.emit('property created', {
            property: property,
            value: value
          });
          this.emit(property + " created", value);
        } else {
          this.session.properties[property] = value;
          this.emit('property changed', {
            property: property,
            value: value
          });
          this.emit(property + " changed", value);
        }
        return this;
      };
      prototype.getset = function(property, transformation){
        var thing, newthing;
        thing = this.get(property);
        newthing = transformation(thing);
        if (toString$.call(thing).slice(8, -1) === toString$.call(newthing).slice(8, -1)) {
          this.set(property, newthing);
        } else {
          this.set(property, thing);
        }
        return this;
      };
      prototype.wire = function(sessionProp, tempProp, tempName){
        var this$ = this;
        this.template(tempName).set(tempProp, function(){
          return this$.get(sessionProp);
        });
        if (this.wires[sessionProp] != null) {
          this.wires[sessionProp][tempName] = tempProp;
        }
        this.on(sessionProp + " changed", function(value){
          return this$.template(tempName).set(tempProp, function(){
            return value;
          })._rerender();
        });
        return this;
      };
      prototype.emit = function(event){
        var i$, ref$, len$, action;
        if (this.session.events[event] != null) {
          for (i$ = 0, len$ = (ref$ = this.session.events[event]).length; i$ < len$; ++i$) {
            action = ref$[i$];
            action.apply(this, tail(Array.prototype.slice.call(arguments)));
          }
        }
        return this;
      };
      prototype.on = function(){
        var i$, len$, index, argument;
        for (i$ = 0, len$ = arguments.length; i$ < len$; i$ += 2) {
          index = i$;
          argument = arguments[i$];
          if (this.session.events[argument] != null) {
            this.session.events[argument].push(arguments[index + 1]);
          } else {
            this.session.events[argument] = [arguments[index + 1]];
          }
        }
        return this;
      };
      prototype.route = function(){
        var hotseat, i$, len$, index, argument;
        hotseat = null;
        for (i$ = 0, len$ = arguments.length; i$ < len$; ++i$) {
          index = i$;
          argument = arguments[i$];
          if (typeof argument === 'string') {
            hotseat = argument;
          } else if (typeof argument === 'function') {
            if (Array.isArray(this.session.events["route " + argument])) {
              this.session.events["route " + hotseat].push(argument);
            } else {
              this.session.events["route " + hotseat] = [argument];
            }
          }
        }
        return this;
      };
      prototype.template = function(name){
        return this.session.templates[name]._io(this);
      };
      prototype.expose = function(namespace){
        namespace.get = this.get, namespace.set = this.set, namespace.emit = this.emit, namespace['on'] = this['on'], namespace.template = this.template, namespace.route = this.route, namespace.getset = this.getset, namespace.wire = this.wire;
        return this;
      };
      return IO;
    }());
    Template = (function(){
      Template.displayName = 'Template';
      var prototype = Template.prototype, constructor = Template;
      function Template(name){
        this.name = name;
        this.params = {};
        this.context = null;
        this._pastTarget = null;
        this._el = document.querySelector('body');
        this.onrender = null;
        this;
      }
      prototype._io = function(context){
        this.context = context;
        return this;
      };
      prototype.render = function(target, cb){
        var collectionizer, obj, res$, key, ref$, value;
        target == null && (target = 'body');
        if (this.onrender != null) {
          this.onrender();
        }
        this._el = document.querySelector(target);
        this._pastTarget = target;
        collectionizer = function(it){
          var i$, len$, i, item, results$ = [];
          if (toString$.call(it).slice(8, -1) === 'Array') {
            if (toString$.call(it[0]).slice(8, -1) === 'Object') {
              for (i$ = 0, len$ = it.length; i$ < len$; ++i$) {
                i = i$;
                item = it[i$];
                results$.push(item._id = i);
              }
              return results$;
            } else {
              for (i$ = 0, len$ = it.length; i$ < len$; ++i$) {
                i = i$;
                item = it[i$];
                results$.push(item = {
                  _id: i,
                  property: item
                });
              }
              return results$;
            }
          }
        };
        res$ = {};
        for (key in ref$ = this.params) {
          value = ref$[key];
          res$[key] = value();
        }
        obj = res$;
        importAll$(obj, this);
        importAll$(obj, this.context);
        if (cb != null) {
          blade.runtime.renderTo(this._el, this.name, obj, cb);
        } else {
          blade.runtime.renderTo(this._el, this.name, obj);
        }
        return this;
      };
      prototype._rerender = function(){
        if (this._pastTarget != null) {
          return this.render(this._pastTarget);
        }
      };
      prototype.set = function(property, value){
        this.params[property] = value;
        if (toString$.call(value).slice(8, -1) === 'Array' || toString$.call(value).slice(8, -1) === 'Object') {
          this._lists.push({
            property: property,
            value: value
          });
        }
        this._rerender();
        return this;
      };
      prototype.find = function(target){
        return this._el.querySelector(target);
      };
      prototype.findAll = function(target){
        return this._el.querySelectorAll(target);
      };
      return Template;
    }());
    Session = (function(){
      Session.displayName = 'Session';
      var prototype = Session.prototype, constructor = Session;
      function Session(name){
        var i$, ref$, len$, template;
        this.name = name;
        this.properties = {};
        this.events = {};
        this.templates = {};
        for (i$ = 0, len$ = (ref$ = allTemplates).length; i$ < len$; ++i$) {
          template = ref$[i$];
          this.templates[template] = new Template(template);
        }
        this;
      }
      return Session;
    }());
    return code(Session, IO);
  };
  function bind$(obj, key, target){
    return function(){ return (target || obj)[key].apply(obj, arguments) };
  }
  function in$(x, xs){
    var i = -1, l = xs.length >>> 0;
    while (++i < l) if (x === xs[i]) return true;
    return false;
  }
  function importAll$(obj, src){
    for (var key in src) obj[key] = src[key];
    return obj;
  }
}).call(this);

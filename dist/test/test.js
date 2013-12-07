(function(){
  postlude(function(session, templates, route, initialize){
    initialize(function(){
      return console.log('welcome to postlude.ls!');
    });
    route('index', function(){}, 'consolelog', function(it){
      return console.log("logged " + it);
    }, 'render', function(param){
      templates.name1.variable = function(){
        return param;
      };
      return templates.name1.render(document.getElementById('target'));
    }, 'session', function(){
      templates.name2.variable = function(){
        return session.get('hello');
      };
      templates.name2.render(document.getElementById('target'));
      session.set('hello', 'hello');
      return session.set('hello', 'goodbye');
    });
    return this.session = session;
  });
}).call(this);

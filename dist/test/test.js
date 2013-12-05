(function(){
  postlude(function(session, templates, route, initialize){
    initialize(function(){
      return console.log('welcome to postlude.ls!');
    });
    return route('index', function(){}, 'consolelog', function(it){
      return console.log("logged " + it);
    }, 'render', function(it){
      templates.somelink1.variable = it;
      return templates.somelink1.render(document.getElementById('target'));
    });
  });
}).call(this);

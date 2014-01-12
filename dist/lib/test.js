(function(){
  var reject;
  reject = require('prelude-ls').reject;
  postlude(function(Session, IO){
    var session, fixture;
    session = new Session('todos');
    new IO(session).expose(this);
    set('todos', fixture = [
      {
        name: 'wash the laundry',
        done: false
      }, {
        name: 'walk the dog',
        done: false
      }, {
        name: 'buy groceries',
        done: false
      }
    ]);
    template('index').render('#viewport');
    wire('todos', 'todos', 'todos');
    template('todos').set('count', function(){
      return get('todos').length;
    }).set('left', function(){
      console.log(reject(function(it){
        return it.done;
      }, get('todos')).length);
      return reject(function(it){
        return it.done;
      }, get('todos')).length;
    }).render('#target');
    return this.on('submitted', function(elem){
      return getset('todos', function(it){
        return it.push({
          name: elem.value,
          done: false
        });
      });
    }, 'remove', function(rtodo){
      return getset('todos', function(todos){
        var i$, len$, i, todo;
        for (i$ = 0, len$ = todos.length; i$ < len$; ++i$) {
          i = i$;
          todo = todos[i$];
          if (todo.remove) {
            todos.splice(i, 1);
            return;
          }
        }
      });
    });
  });
}).call(this);

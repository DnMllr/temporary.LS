{reject} = require \prelude-ls

Session, IO <- postlude

session = new Session \todos
new IO session .expose @

set \todos fixture =
  * name: 'wash the laundry'
    done: false
  * name: 'walk the dog'
    done: false
  * name: 'buy groceries'
    done: false

template \index .render \#viewport

wire \todos \todos \todos

template \todos 
.set \count ->  get \todos .length
.set \left -> 
  console.log (reject (.done), get \todos).length
  (reject (.done), get \todos).length
.render \#target

@on \submitted (elem) -> getset \todos -> it.push {name: elem.value, done: false}
, \remove (rtodo) ->
  getset \todos (todos) ->
    for todo, i in todos
      if todo.remove
        todos.splice i, 1
        return
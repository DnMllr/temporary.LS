session, templates, route, initialize <- postlude
initialize ->
  console.log 'welcome to postlude.ls!'

route \index ->
, \consolelog ->
  console.log "logged #{it}"
, \render (param) ->
  templates.name.variable = -> param
  templates.name.render document.getElementById \target
, \session ->
  templates.name2.variable = -> session.get \hello
  templates.name2.render document.getElementById \target
  session.set \hello \hello
  session.set \hello \goodbye

@session = session
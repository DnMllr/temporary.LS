session, templates, route, initialize <- postlude
initialize ->
  console.log 'welcome to postlude.ls!'

route \index ->
, \consolelog ->
  console.log "logged #{it}"
, \render (param) ->
  templates.name1.variable = -> param
  templates.name1.render \#target
, \session ->
  templates.name2.variable = -> session.get \hello
  templates.name2.render \#target
  session.set \hello \hello
  session.set \hello \goodbye

@session = session
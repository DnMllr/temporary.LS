session, templates, route, initialize <- postlude
initialize ->
  console.log 'welcome to postlude.ls!'

route \index ->
, \consolelog ->
  console.log "logged #{it}"
, \render ->
  templates.somelink1.variable = it
  templates.somelink1.render document.getElementById \target
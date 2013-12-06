{zip, compact, difference, map, last} = require \prelude-ls

@postlude = (code) ~>

  routes = {}
  present-route-array = location.pathname / '/'
  previous-route-array = location.pathname / '/'
  route-changes = []
  templates = {
    render-all: ->
      for key, value of @
        value._rerender! unless key is \renderAll
  }

  class Session
    (@name) ->
    properties: {}
    get: (property) ->
      @properties[property]
    set: (property, value) ->
      @properties[property] = value
      templates.render-all!
      value


  register-route = (name, action) ->
    routes[name] := action

  find-links-to-routes = (target = document)->
    all-links = target.getElementsByTagName \a
    for link in all-links
      link.addEventListener \click ->
        it.preventDefault!
        present-route-array := compact it.target.href / '/'
        hotseat = \index
        params = []
        # TODO make it call only the changes in the url (iterate backwards!!!)
        for route, index in present-route-array
          if routes[route]?
            routes[hotseat].apply @, params
            params = []
            hotseat = route
          else
            params.push route
        routes[hotseat].apply @, params
        previous-route-array := present-route-array
        history.pushState {}, it.target.textContent, it.target.href
        false
      , true



  find-templates = ->
    all-templates = [key for key of jade.templates]
    templates <<< {[name, {_identity: name, render: render-func, _past-target: null, _rerender: rerender-func}] for name in all-templates}

  
  render-func = (target) ->
    @_past-target = target
    flag = true
    while flag
      obj = {[key, value!] for key, value of @ when key[0] isnt \_ and key isnt \render}
      try
        jade.render target, @_identity, obj
        flag = false
      catch e
        missing-obj = e.message.slice 0, e.message.indexOf ' is not defined'
        @[missing-obj] = -> ''
    find-links-to-routes target

  rerender-func = ->
    @render @pastTarget if @pastTarget?

  find-links-to-routes!
  find-templates!


  ######### ROUTE FUNCTION #########

  route = ->
    for argument, index in & by 2
      register-route argument, &[index + 1]

  ######### INITIALIZE FUNCTION #########

  initialize = ->
    it!

  ######### RUN INPUTTED CODE ########

  code (new Session \primary ), templates, route, initialize

  ######### DEVELOPEMENT ONLY ######### TODO remove this code

  @routes = routes
  @templates = templates
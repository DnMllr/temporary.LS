{zip, compact, difference, map, last} = require \prelude-ls

@postlude = (code) ~>

  routes = {}
  present-route-array = location.pathname / '/'
  previous-route-array = location.pathname / '/'
  route-changes = []
  templates = {
    render-all: ->
      for key, value of @
        value.rerender! unless key is \renderAll
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
    # action.callback.apply @, action.params if name in present-route-array


  # We are assuming that the url commands have already been registered at this step.
  # The event listener should only figure out in what way the url has changed and so what commands need to be run/rerun
  find-links-to-routes = ->
    # find all of the links
    all-links = document.getElementsByTagName \a
    # iterate over them
    for link in all-links
      # add an event listener to each link
      link.addEventListener \click ->
        it.preventDefault!
        # redefine the present-route-array
        present-route-array := compact it.target.href / '/'
        # create a hotseat to call
        hotseat = \index
        # and parameters to call it with
        params = []
        # TODO make it call only the changes in the url (iterate backwards!!!)
        # iterate over the route array
        for route, index in present-route-array
          # if the present route has an associated function
          if routes[route]?
            # call the hotseat
            routes[hotseat].apply @, params
            # clear parameters
            params = []
            # put the new route in the hotseat
            hotseat = route
          # otherwise assume it's a parameter
          else
            # push it into the parameters
            params.push route
        # apply the final hotseat
        routes[hotseat].apply @, params
        # set the previous route to the present route
        previous-route-array := present-route-array
        # push history state
        history.pushState {}, it.target.textContent, it.target.href
        # return false
        false
      , true



  # TODO use handlebars.js, don't try and roll your own
  find-templates = ->
    all-templates = [key for key of jade.templates]
    console.log all-templates
    templates <<< {[name, {_identity: name, render: render-func, _past-target: null, _rerender: rerender-func}] for name in all-templates}



    # all-templates = document.getElementsByTagName \template
    # templates <<< {[(template.getAttribute \name ), {temp: template.innerHTML, render: render-func, pastTarget: null, rerender: rerender-func}] for template in all-templates}
    # for name, template of templates
    #   continue if name is \renderAll
    #   for character, index in template.temp
    #     if character is '{' and template.temp[index+1] is '{'
    #       remainder = template.temp.slice index + 2
    #       closer = remainder.indexOf '}'
    #       if remainder[closer+1] is '}'
    #         key = remainder.slice 0 closer
    #         template[key] = -> ''
    #         template.rendered = (template.temp.slice 0 index) + remainder.slice closer + 2

  
  render-func = (target) ->
    @_past-target = target
    jade.render target, @_identity, {[key, value!] for key, value of @ when key[0] isnt \_ and key isnt \render}

    # for character, index in @temp
    #   if character is '{' and @temp[index+1] is '{'
    #     remainder = @temp.slice index + 2
    #     closer = remainder.indexOf '}'
    #     if remainder[closer+1] is '}'
    #       key = remainder.slice 0 closer
    #       # TODO this is going to cause a problem with more than one handlebars
    #       console.log typeof @[key]
    #       console.log @
    #       @rendered = (@temp.slice 0 index) + @[key]! + remainder.slice closer + 2
    # if destructive
    #   target.innerHTML = @rendered
    # else
    #   target.innerHTML += @rendered

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
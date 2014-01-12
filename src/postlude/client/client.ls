{zip, compact, difference, map, last, tail} = require \prelude-ls
socket = io.connect \http://localhost

@postlude = (code) ~>

  present-route-array = location.pathname / '/'
  previous-route-array = ''

  # all-templates = [key for key of jade.templates]
  all-templates = [key for key of templatesB]

  find-links-to-routes = (target = document) ->
    all-links = target.getElementsByTagName \a
    for link in all-links
      unless ((link.getAttribute \href )?slice 0 4) is \http
        link.addEventListener \click ->
          it.preventDefault!
          @navigate-to it.target.getAttribute \href
          false
        , true

  fingerprint = (target, template) ->
    all-elements = target.getElementsByTagName \*
    for element in all-elements
      element.dataset.template-name = template.name

  # TODO reevaluate the pattern of these functions. can they be curriable, chainable, how many arguments should they accept?
  class IO
    (@session) ~> @
    @wires = {}

    find-links-to-routes!

    navigate-to: (url) ~>
      present-route-array := filter (is ''), url / '/'
      params = []
      call-stack = []
      called-stack = []
      for route, index in present-route-array by -1
        if @session.events["route #route"]?
          unless [route] ++ params * '/' in previous-route-array
            called-stack.push [route] ++ params * '/'
            params.shift @session.events["route #route"]
            call-stack.push params
            params = []
        else
          params.shift route 
      previous-route-array := called-stack
      for call in call-stack
        head call .apply @, tail call
      history.pushState {}, \nothing, url

    get: (property) ~> @session.properties[property]

    set: (property, value) ~>
      if !@session.properties[property]?
        @session.properties[property] = value
        @emit 'property created' {property, value}
        @emit "#property created" value
      else
        @session.properties[property] = value
        @emit 'property changed' {property, value}
        @emit "#property changed" value
      @

    getset: (property, transformation) ~>
      thing = @get property
      newthing = transformation thing
      if typeof! thing is typeof! newthing
        @set property, newthing
      else
        @set property, thing
      @

    wire: (sessionProp, tempProp, tempName) ~>
      @template tempName .set tempProp, ~> @get sessionProp
      if @wires[sessionProp]?
        @wires[sessionProp][tempName] = tempProp
      @on "#sessionProp changed" (value) ~>
        @template tempName .set tempProp, (~> value) ._rerender!
      @

    emit: (event) ~>
      if @session.events[event]?
        for action in @session.events[event]
          action.apply @, tail Array.prototype.slice.call &
      # socket.emit event, tail Array.prototype.slice.call &
      @

    on: ~>
      for argument, index in & by 2
        if @session.events[argument]? then @session.events[argument].push &[index + 1] else @session.events[argument] = [&[index + 1]]
      # socket.emit '_ add event' JSONfn.stringify {event, callback}
      @

    route: ~>
      hotseat = null
      for argument, index in &
        if typeof argument is \string
          hotseat = argument
        else if typeof argument is \function
          if Array.isArray @session.events["route #argument"]
            @session.events["route #hotseat"].push argument
          else
            @session.events["route #hotseat"] = [ argument ]
      @

    template: (name) ~> @session.templates[name]._io @

    expose: (namespace) ~> namespace{get, set, emit, 'on', template, route, getset, wire} = @; @

  class Template
    (@name) ->
      @params = {}
      # @params = new blade.Model({})
      @context = null
      @_past-target = null
      @_el = document.querySelector \body
      @onrender = null
      @

    _io: (context) ->
      @context = context
      @

    render: (target = 'body', cb) ->
      @onrender! if @onrender?
      @_el = document.querySelector target
      @_past-target = target
      collectionizer = ->
        if typeof! it is \Array
          if typeof! it[0] is \Object
            for item, i in it
              item._id = i
          else
            for item, i in it
              item = {_id: i, property: item}
        
      obj = {[key, value!] for key, value of @params}
      obj <<<< @
      obj <<<< @context
      # # 
      # #  JADE:
      # # 
      # flag = true
      # # jade[@name] {[key, value!] for key, value of @params}
      # while flag
      #   try
      #     jade.render @_el, @name, obj
      #     # jade[@name] obj
      #     flag = false
      #   catch e
      #     missing-obj = e.message.slice 0, e.message.indexOf ' is not defined'
      #     @params[missing-obj] = -> ''
      # find-links-to-routes @_el
      # fingerprint @_el, @
      # 
      #  BLADE: 
      # 
      if cb?
        blade.runtime.renderTo @_el, @name, obj, cb
      else
        blade.runtime.renderTo @_el, @name, obj
      @

    _rerender: -> @render @_pastTarget if @_pastTarget?

    set: (property, value) ->
      @params[property] = value
      @_lists.push {property, value} if typeof! value is \Array or typeof! value is \Object
      @_rerender!
      # @params.set property, value
      @

    find: (target) -> @_el.querySelector target

    findAll: (target) -> @_el.querySelectorAll target


  class Session
    (@name) ->
      @properties = {}
      @events = {}
      @templates = {}
      for template in all-templates
        @templates[template] = new Template template
      @

  code Session, IO
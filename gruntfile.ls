{each} = require \prelude-ls

module.exports = (grunt) ->

  each (-> grunt.load-npm-tasks it), <[ grunt-livescript grunt-contrib-clean grunt-client-blade grunt-contrib-watch grunt-contrib-copy grunt-concurrent grunt-contrib-jade grunt-shell grunt-contrib-stylus ]>

  grunt.init-config do

    clean: <[ ./dist/** ]>

    livescript:

      src:
        expand: true
        cwd: \src/
        src: <[ **/*.ls ]>
        dest: \dist/
        ext: \.js

      grunt:
        expand: true
        src: <[ gruntfile.ls ]>
        dest: \./
        ext: \.js

    copy:

      target:
        expand: true
        cwd: \src/
        src: <[ ** !**/*.ls !**/*.jade !**/*.styl ]>
        dest: \dist/
        filter: \isFile

    # stylus:
    #   compile:
    #     options: {}
    #     files:
    #       \/dist/stylesheet/stylesheet.css : \/src/stylesheet/stylesheet.styl

    # shell:
    #   jade:
    #     options: {
    #       failOnError: true
    #     }
    #     command: [ 'clientjade ./src/templates/ > ./dist/lib/templates.js' ] * '&&'

    # JADE

    # jade:
    #   compile:
    #     options:
    #       client: true
    #       processName: -> ((it / '/')[* - 1] / '.')[0]
    #       namespace: \jade
    #     files:
    #       'dist/lib/templates.js' : 'src/templates/*.jade'


    # BLADE

    clientBlade:

      target:
        src: ['src/**/*.blade']
        dest: 'dist/lib/templates.js'

    watch:

      files: <[ src/**/* gruntfile.ls ]>
      tasks: <[ default ]>

  grunt.register-task \default, <[ clean copy livescript clientBlade watch ]>
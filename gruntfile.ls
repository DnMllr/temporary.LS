{each} = require \prelude-ls

module.exports = (grunt) ->

  each (-> grunt.load-npm-tasks it), <[ grunt-livescript grunt-contrib-clean grunt-contrib-watch grunt-contrib-copy grunt-concurrent grunt-shell ]>

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
        src: <[ ** !**/*.ls !**/*.jade ]>
        dest: \dist/
        filter: \isFile

    shell:
      jade:
        options: {}
        command: [ 'mkdir dist/templates' 'clientjade ./src/templates/ > ./dist/templates/template.js' ] * '&&'

    watch:

      files: <[ src/**/* gruntfile.ls ]>
      tasks: <[ default ]>

  grunt.register-task \default, <[ clean copy livescript shell watch ]>
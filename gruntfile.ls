module.exports = (grunt) ->
  
  grunt.load-npm-tasks \grunt-livescript
  grunt.load-npm-tasks \grunt-contrib-clean
  grunt.load-npm-tasks \grunt-contrib-watch
  grunt.load-npm-tasks \grunt-contrib-copy
  grunt.load-npm-tasks \grunt-concurrent

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
        src: <[ ** !**/*.ls ]>
        dest: \dist/
        filter: \isFile

    watch:

      files: <[ src/**/* gruntfile.ls ]>
      tasks: <[ default ]>

  grunt.register-task \default, <[ clean copy livescript watch ]>
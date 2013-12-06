(function(){
  var each;
  each = require('prelude-ls').each;
  module.exports = function(grunt){
    each(function(it){
      return grunt.loadNpmTasks(it);
    }, ['grunt-livescript', 'grunt-contrib-clean', 'grunt-contrib-watch', 'grunt-contrib-copy', 'grunt-concurrent', 'grunt-shell']);
    grunt.initConfig({
      clean: ['./dist/**'],
      livescript: {
        src: {
          expand: true,
          cwd: 'src/',
          src: ['**/*.ls'],
          dest: 'dist/',
          ext: '.js'
        },
        grunt: {
          expand: true,
          src: ['gruntfile.ls'],
          dest: './',
          ext: '.js'
        }
      },
      copy: {
        target: {
          expand: true,
          cwd: 'src/',
          src: ['**', '!**/*.ls', '!**/*.jade'],
          dest: 'dist/',
          filter: 'isFile'
        }
      },
      shell: {
        jade: {
          options: {},
          command: ['mkdir dist/templates', 'clientjade ./src/templates/ > ./dist/templates/template.js'].join('&&')
        }
      },
      watch: {
        files: ['src/**/*', 'gruntfile.ls'],
        tasks: ['default']
      }
    });
    return grunt.registerTask('default', ['clean', 'copy', 'livescript', 'shell', 'watch']);
  };
}).call(this);

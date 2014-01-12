(function(){
  var each;
  each = require('prelude-ls').each;
  module.exports = function(grunt){
    each(function(it){
      return grunt.loadNpmTasks(it);
    }, ['grunt-livescript', 'grunt-contrib-clean', 'grunt-client-blade', 'grunt-contrib-watch', 'grunt-contrib-copy', 'grunt-concurrent', 'grunt-contrib-jade', 'grunt-shell', 'grunt-contrib-stylus']);
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
          src: ['**', '!**/*.ls', '!**/*.jade', '!**/*.styl'],
          dest: 'dist/',
          filter: 'isFile'
        }
      },
      clientBlade: {
        target: {
          src: ['src/**/*.blade'],
          dest: 'dist/lib/templates.js'
        }
      },
      watch: {
        files: ['src/**/*', 'gruntfile.ls'],
        tasks: ['default']
      }
    });
    return grunt.registerTask('default', ['clean', 'copy', 'livescript', 'clientBlade', 'watch']);
  };
}).call(this);

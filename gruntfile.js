(function(){
  module.exports = function(grunt){
    grunt.loadNpmTasks('grunt-livescript');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-concurrent');
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
          src: ['**', '!**/*.ls'],
          dest: 'dist/',
          filter: 'isFile'
        }
      },
      watch: {
        files: ['src/**/*', 'gruntfile.ls'],
        tasks: ['default']
      }
    });
    return grunt.registerTask('default', ['clean', 'copy', 'livescript', 'watch']);
  };
}).call(this);

module.exports = function(grunt) {

  grunt.initConfig({

    html2js: {
      options: {
        // custom options, see below
        module: 'gesturesApp.templates',
        singleModule: true,
        base: 'app'
      },
      main: {
        src: ['app/partials/*.html'],
        dest: 'dist/templates.js'
      },
    },
    watch: {
       files: ['app/partials/**/*', 'app/js/**/*', 'app/css/**/*', 'app/index.html'],
      tasks: ['build']
    },
    useminPrepare: {
      html: 'dist/index.html',
      options: {
        dest: 'dist',
        flow: {
          steps: {
              js: ['concat'],
              css: ['concat']
          },
          post: {}
        }
      }
    },
    usemin: {
      html: 'dist/index.html'
    },
    copy: {
      index: {
        src: 'app/index.html',
        dest: 'dist/index.html'
      },
      images: {
        expand: true,
        cwd: 'app/img/',
        src: ['**'],
        dest: 'dist/img/'
      },
      fonts: {
        expand: true,
        cwd: 'app/bower_components/bootstrap/fonts/',
        src: ['**'],
        dest: 'dist/fonts/'
      }
    },
    uglify: {
      options: {
        mangle:false
      }
    }
  });

    
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', [
    'html2js',
    'copy:index',
    'copy:images',
    'copy:fonts',
    'useminPrepare',
    'concat',
   // 'uglify',
   // 'cssmin',
    'usemin'
  ]);

};
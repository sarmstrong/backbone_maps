module.exports = function(grunt) {


  var bannerContent = '/*! <%= pkg.name %> v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> \n' +
                    ' *  License: <%= pkg.license %> */\n';

  var name = '<%= pkg.name %>-v<%= pkg.version%>';

  grunt.initConfig({

    pkg : grunt.file.readJSON('package.json'),

    jasmine : {

      src: "src/**/*.js" , 

      options : {

        specs : "spec/**/*.js"  , 

        vendor : [

          "examples/vendor/jquery/jquery.min.js", 
          "examples/vendor/underscore/underscore-min.js",        
          "examples/vendor/backbone/backbone-min.js", 
          "bin/GoogleMock.js"

        ] , 

        template: require('grunt-template-jasmine-istanbul'),

        templateOptions: {

          coverage: 'bin/coverage/coverage.json',

          report: [
            {
              type: 'html',
              options: {
                dir: 'bin/coverage/html'
              }
            },
            {
              type: 'cobertura',
              options: {
                dir: 'bin/coverage/cobertura'
              }
            },
            {
              type: 'text-summary'
            }
          ]
        }

      }


    }, 

    jshint : {

      all : ['src/**/*.js', 'spec/**/*.js' , 'examples/app/**/*.js']

    } , 

    concat : {

      options : {

          banner : bannerContent
      
      } , 

      target : {

        src : ['src/**/*.js'], 

        dest : 'lib/' + name + '.js'


      }

    } , 

    uglify : {

      options : {

          banner: bannerContent,

          sourceMapRoot: '../',

          sourceMap: 'lib/'+name+'.min.js.map',

          sourceMapUrl: name+'.min.js.map'


      } , 

      target : {

          src : ['src/**/*.js'],

          dest : 'lib/' + name + '.min.js'

      }


    } , 

    watch : {

      files : ['src/**/*.js', 'spec/**/*.js'] , 

      tasks : ['jshint' , 'jasmine']

    }


  })

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.loadNpmTasks('grunt-contrib-concat'); 

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint' , 'concat' , 'uglify'  , 'jasmine']);

  grunt.registerTask('test'  , ['jshint' , 'jasmine']); 

  grunt.registerTask('dev' , ['test' , 'watch']);


};
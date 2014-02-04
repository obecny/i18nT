module.exports = function (grunt) {
    var banner;
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    banner ='/*\n' +
        '<%= pkg.name %>\n' +
        'author: <%= pkg.author %>\n' +
        '<%= pkg.description %>\n' +
        'generated on:\n' +
        '<%= grunt.template.today("yyyy-mm-dd HH:mm") %> version: <%= pkg.version %> \n' +
        '*/\n\n';

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        clean: {
            lib: {
                src: 'lib'
            }
        },
        concat: {
            options: {
                banner: banner,
                separator: '\n'
            },
            dist: {
                src: ['src/i18nT_module.js','src/i18nT_provider.js','src/i18nT_filter.js','src/i18nT_directive.js', ],
                dest: 'lib/i18nT.js'
            }
        },
        uglify: {
            options: {
                banner: banner
            },
            files: {
                src: 'lib/i18nT.js',
                dest: 'lib/',
                expand: true,
                flatten: true,
                ext: '.min.js'
            }
        }
    });

//    grunt.loadNpmTasks('grunt-contrib-watch');
//    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['clean', 'concat', 'uglify']);

//    grunt.registerTask('default', ['clean', 'concat', 'uglify' ]);
};
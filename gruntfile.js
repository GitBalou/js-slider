module.exports = function(grunt) {

    // Chargement de toutes les tâches contenues dans le package.json
    require('grunt-contrib-watch')(grunt);
    require('grunt-contrib-connect')(grunt);

    grunt.config.init({
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                        port: 8080,
                        base: 'www',
                        livereload: true,
                        open : true
                }
            }
        },

        watch: {
            taskName: {
                options: {
                    livereload: true
                },
                files: [
                    "www/**"
                ]
            }
        }
    });

    grunt.registerTask('serve', ['connect', 'watch']);
};




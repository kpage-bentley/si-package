'use strict';

module.exports = function (grunt) {

    // load all grunt tasks
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-ts');

    grunt.initConfig({

        // Used to watch for when TypeScript and Less files are modified
        watch: {
            ts: {
                // if any .ts files changes in directory "src/" run the "ts"-task.
                files: ["src/*.ts"],
                tasks: ["ts"],
                options: {
                    spawn: false
                }
            }
        },

        // Used to compile TypeScript files into JavaScript
        ts: {
            options: {
                sourceMap: false,
            },
            default: {
                src: ["src/*.ts"],
                outDir: "./dist"
            }
        },

        // Used to host the site locally
        connect: {
            server: {
                options: {
                    port: 8000
                }
            }
        },

        // Used to launch index.html
        open: {
            default: {
                path: 'http://localhost:8000/index.html'
            }
        }
    });

    // the default task (running "grunt" in console)
    grunt.registerTask('default', ['ts', 'connect', 'open', 'watch']);
};

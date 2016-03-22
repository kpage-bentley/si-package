'use strict';

module.exports = function (grunt) {

    // load all grunt tasks
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-ts');

    grunt.initConfig({

        // Used to watch for when TypeScript and Less files are modified
        watch: {
            less: {
                // if any .less file changes in directory "assets/css/" run the "less"-task.
                files: "src/styles/*.less",
                tasks: ["less"]
            },
            ts: {
                // if any .ts files change, run the "ts"-task.
                files: ["src/scripts/*.ts", "demo/**/*.ts"],
                tasks: ["ts"],
                options: {
                    spawn: false
                }
            },
        },

        // Used to compile Less files into CSS
        less: {
            default: {
                files: {
                    // compilation.css  :   source.less
                    "dist/main.css"     :  "src/styles/main.less"
                }
            }
        },

        // Used to compile TypeScript files into JavaScript
        ts: {
            options: {
                sourceMap: false,
            },
            default: {
                src: ["src/scripts/*.ts"],
                out: "./dist/main.js"
            },
            demo: {
                src: ["demo/**/*.ts"]
            }
        },

        // Used to host the site locally
        connect: {
            server: {
                options: {
                    port: 7500
                }
            }
        },

        // Used to launch index.html
        open: {
            default: {
                path: 'http://localhost:7500/index.html'
            }
        }
    });

    // the default task (running "grunt" in console)
    grunt.registerTask('default', ['ts', 'less', 'connect', 'open', 'watch']);
};

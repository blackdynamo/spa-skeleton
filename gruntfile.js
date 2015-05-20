"use strict";

var _ = require("underscore"),
    config = require("config");

module.exports = function (grunt) {
    var pkg = grunt.file.readJSON("package.json");
    var dependencies = _.without(_.keys(pkg.dependencies), "font-awesome");

    require("time-grunt")(grunt);
    require("load-grunt-tasks")(grunt);

    grunt.registerTask("default", ["build", "concurrent"]);
    grunt.registerTask("build", ["clean", "jshint", "browserify", "less", "stylus", "copy", "concat"]);
    grunt.registerTask("release", ["build", "uglify", "cssmin"]);
    grunt.registerTask("package", ["release", "compress:package"]);

    grunt.initConfig({
        dist: {
            dir: "dist",
            js: {
                app: "js/app.js",
                vendor: "js/vendor.js"
            },
            css: {
                app: "css/app.css",
                vendor: "css/vendor.css"
            }
        },

        pkg: pkg,
        version: "<%= pkg.name %>-<%= pkg.version %>",
        banner: "/**\n * <%= version %>\n */\n",

        clean: ["<%= dist.dir %>/*"],

        browserify: {
            vendor: {
                src: [],
                dest: "<%= dist.dir %>/<%= dist.js.vendor %>",
                options: {
                    transform: [require("grunt-react").browserify],
                    require: dependencies
                }
            },

            app: {
                src: "src/app/initialize.js",
                dest: "<%= dist.dir %>/<%= dist.js.app %>",
                options: {
                    transform: [
                        ["envify", config],
                        require("grunt-react").browserify
                    ],

                    external: dependencies
                }
            }
        },

        concat: {
            index: {
                src: ["src/index.html"],
                dest: "<%= dist.dir %>/index.html",
                options: {process: true}
            }
        },

        less: {
            vendor: {
                files: {
                    "<%= dist.dir %>/<%= dist.css.vendor %>": "src/styles/vendor.less"
                }
            }
        },

        stylus: {
            compile: {
                files: {
                    "<%= dist.dir %>/<%= dist.css.app %>": "src/styles/app.styl"
                }
            }
        },

        copy: {
            images: {
                files: [
                    {dest: "<%= dist.dir %>/img/", cwd: "src/images/", src: "**", expand: true}
                ]
            },
            fonts: {
                files: [
                    {dest: "<%= dist.dir %>/fonts/", cwd: "node_modules/font-awesome/fonts/", src: "**", expand: true}
                ]
            }
        },

        jshint: {
            files: ["gruntfile.js", "src/app/**/*.js", "src/app/**/*.jsx"],
            options: {
                jshintrc: true
            }
        },

        uglify: {
            options: {
                sourceMap: true
            },

            app: {
                options: {banner: "<%= banner %>"},
                files: {"<%= dist.dir %>/<%= dist.js.app %>": ["<%= dist.dir %>/<%= dist.js.app %>"]}
            },

            vendor: {
                files: {"<%= dist.dir %>/<%= dist.js.vendor %>": ["<%= dist.dir %>/<%= dist.js.vendor %>"]}
            }
        },

        cssmin: {
            options: {
                sourceMap: true
            },

            app: {
                files: {"<%= dist.dir %>/<%= dist.css.app %>": ["<%= dist.dir %>/<%= dist.css.app %>"]}
            },

            vendor: {
                files: {"<%= dist.dir %>/<%= dist.css.vendor %>": ["<%= dist.dir %>/<%= dist.css.vendor %>"]}
            }
        },

        compress: {
            package: {
                options: {
                    mode: "tgz",
                    archive: "<%= pkg.name %>.tar.gz"
                },
                files: [
                    {expand: true, cwd: "dist/", src: ["**"], dest: "."}
                ]
            }
        },

        watch: {
            app: {
                files: ["src/app/**/*.js", "src/app/**/*.jsx"],
                tasks: ["browserify:app", "jshint"]
            },

            images: {
                files: ["src/images/**/*"],
                tasks: ["copy:images"]
            },

            index: {
                files: ["src/index.html"],
                tasks: ["concat"]
            },

            less: {
                files: ["src/styles/vendor.less"],
                tasks: ["less:vendor"]
            },

            stylus: {
                files: ["src/styles/**/*.styl"],
                tasks: ["stylus"]
            }
        },

        connect: {
            server: {
                options: {
                    keepalive: true,
                    port: 3030,
                    base: "dist",
                    hostname: "localhost",
                    debug: true,
                    open: {appName: process.env.BROWSER}
                }
            }
        },

        concurrent: {
            tasks: ["connect", "watch"],
            options: {
                logConcurrentOutput: true
            }
        }

    });
};


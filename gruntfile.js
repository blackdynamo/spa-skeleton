"use strict";

var _ = require("lodash"),
    url = require("url"),
    proxy = require("proxy-middleware"),
    config = require("config"),
    serveStatic = require("serve-static");

module.exports = function (grunt) {
    var pkg = grunt.file.readJSON("package.json");
    var version = grunt.option("packageVersion") || pkg.version;
    var dependencies = _.without(_.keys(pkg.dependencies), "font-awesome");

    require("time-grunt")(grunt);
    require("load-grunt-tasks")(grunt);

    grunt.registerTask("default", ["build", "concurrent"]);
    grunt.registerTask("build", ["clean", "jshint", "browserify", "exorcise", "less", "stylus", "copy:fonts", "concat"]);
    grunt.registerTask("release", ["build", "uglify", "cssmin"]);
    grunt.registerTask("package", ["copy:deploy"]);

    grunt.initConfig({
        dist: "dist",
        build: {
            dir: "build",
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
        version: version,
        banner: "/**\n * <%= version %>\n */\n",

        clean: ["<%= build.dir %>/*", "<%= dist %>/*"],

        browserify: {
            vendor: {
                src: [],
                dest: "<%= build.dir %>/<%= build.js.vendor %>",
                options: {require: dependencies}
            },

            app: {
                src: "src/app/initialize.js",
                dest: "<%= build.dir %>/<%= build.js.app %>",
                options: {
                    transform: [["envify", config], ["babelify", {"presets": ["es2015", "react"]}]],

                    browserifyOptions: {
                        debug: true,
                        fullPaths: false
                    },

                    external: dependencies,
                    watch: true
                }
            }
        },

        exorcise: {
            bundle: {
                options: {},
                files: {
                    "<%= build.dir %>/<%= build.js.app %>.map": ["<%= build.dir %>/<%= build.js.app %>"]
                }
            }
        },

        concat: {
            index: {
                src: ["src/index.html"],
                dest: "<%= build.dir %>/index.html",
                options: {process: true}
            }
        },

        less: {
            vendor: {
                files: {
                    "<%= build.dir %>/<%= build.css.vendor %>": "src/styles/vendor.less"
                }
            }
        },

        stylus: {
            compile: {
                files: {
                    "<%= build.dir %>/<%= build.css.app %>": "src/styles/app.styl"
                }
            }
        },

        copy: {
            data: {
                files: [
                    {dest: "<%= build.dir %>/data/", cwd: "src/data/", src: "**", expand: true}
                ]
            },

            images: {
                files: [
                    {dest: "<%= build.dir %>/img/", cwd: "src/images/", src: "**", expand: true}
                ]
            },

            fonts: {
                files: [
                    {dest: "<%= build.dir %>/fonts/", cwd: "node_modules/font-awesome/fonts/", src: "**", expand: true},
                    {dest: "<%= build.dir %>/fonts/", cwd: "node_modules/react-widgets/dist/fonts/", src: "**", expand: true}
                ]
            },

            pdfs: {
                files: [
                    {dest: "<%= build.dir %>/pdf/", cwd: "src/pdfs/", src: "**", expand: true}
                ]
            },

            deploy: {
                files: [
                    {dest: "<%= dist %>/<%= build.dir %>", cwd: "build", src: "**/*", expand: true},
                    {dest: "<%= dist %>", cwd: "deployment", src: "**/*", expand: true}
                ]
            }
        },

        jshint: {
            files: ["src/app/**/*.js", "src/app/**/*.jsx"],
            options: {
                jshintrc: true,
                reporter: require("jshint-stylish")
            }
        },

        uglify: {
            app: {
                options: {
                    banner: "<%= banner %>",
                    sourceMap: true,
                    sourceMapIn: "<%= build.dir %>/<%= build.js.app %>.map"
                },
                files: {"<%= build.dir %>/<%= build.js.app %>": ["<%= build.dir %>/<%= build.js.app %>"]}
            },

            vendor: {
                files: {"<%= build.dir %>/<%= build.js.vendor %>": ["<%= build.dir %>/<%= build.js.vendor %>"]}
            }
        },

        cssmin: {
            options: {
                sourceMap: true
            },

            app: {
                files: {"<%= build.dir %>/<%= build.css.app %>": ["<%= build.dir %>/<%= build.css.app %>"]}
            },

            vendor: {
                files: {"<%= build.dir %>/<%= build.css.vendor %>": ["<%= build.dir %>/<%= build.css.vendor %>"]}
            }
        },

        watch: {
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
                    base: "<%= build.dir %>",
                    hostname: "localhost",
                    debug: true,
                    middleware: function (connect, options) {
                        return _.map(config.proxies, function (config) {
                            var options = url.parse(config.url);
                            options.route = config.route;
                            return proxy(options);
                        }).concat([serveStatic(options.base[0])]);
                    }
                }
            }
        },

        concurrent: {
            tasks: ["watch", "connect"],
            options: {
                logConcurrentOutput: true
            }
        }
    });
};
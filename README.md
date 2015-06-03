# Simple Grunt SPA Skeleton

A [Grunt](http://gruntjs.com/) app skeleton that has everything you need to get up and running with a SPA. It uses a connect server, file watcher, and wire's up Backbone using Marionette to orchestrate your application. It brings in React as your template and view engine. A few tests have been included to show examples of using Mocha, Chai, Sinon, and React TestUtils together. 

Files & Directories that are watched and ignored are configured in the [gruntfile.js](https://github.com/blackdynamo/spa-skeleton/blob/master/gruntfile.js)

## App Features

- [Backbone](http://backbonejs.org)
- [Bootstrap](http://getbootstrap.com)
- [Font Awesome](http://fortawesome.github.io/Font-Awesome)
- [jQuery](https://jquery.com)
- [Marionette](http://marionettejs.com)
- [React](https://facebook.github.io/react)
- [Underscore](http://underscorejs.org)

## Build Features

- [Connect](https://github.com/senchalabs/connect)
- [Grunt CSSMin](https://github.com/gruntjs/grunt-contrib-cssmin)
- [JSHint](https://github.com/jshint/jshint) a la [JSXHint](https://github.com/STRML/JSXHint)
- [Less](http://lesscss.org)
- [Stylus](http://learnboost.github.com/stylus)
- [Uglify](https://github.com/mishoo/UglifyJS2)

## Testing

- [Chai](http://chaijs.com)
- [Mocha](http://mochajs.org)
- [proxyquire](https://github.com/thlorenz/proxyquire)
- [Sinon](http://sinonjs.org)
- [Sinon-Chai](http://chaijs.com/plugins/sinon-chai)

## Getting started

```bash
$ git clone git@github.com:blackdynamo/spa-skeleton.git <appname>
$ cd <appname>
$ npm run build
$ npm start
```

## Testing

The `npm test` command will run all the tests defined in the test folder that end with the name "-test.js".
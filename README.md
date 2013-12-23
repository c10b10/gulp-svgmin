# [gulp](https://github.com/wearefractal/gulp)-svgmin

[![Build Status](https://travis-ci.org/ben-eb/gulp-svgmin.png?branch=master)](https://travis-ci.org/ben-eb/gulp-svgmin) [![NPM version](https://badge.fury.io/js/gulp-svgmin.png)](http://badge.fury.io/js/gulp-svgmin) [![Dependency Status](https://gemnasium.com/ben-eb/gulp-svgmin.png)](https://gemnasium.com/ben-eb/gulp-svgmin)

> Minify SVG with [SVGO](https://github.com/svg/svgo).

*This plugin is a small wrapper around the excellent SVGO module; if you have any difficulties with your SVG output it is best to use the [SVGO tracker](https://github.com/svg/svgo/issues).

Install via [npm](https://npmjs.org/package/gulp-svgmin):

```
npm install gulp-svgmin --save-dev
```

## Example

```
var gulp = require('gulp');
var svgmin = require('gulp-svgmin');

gulp.task('default', function() {
    gulp.src('logo.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('./out'));
});
```

## Plugins

Optionally, you can disable any [SVGO plugins](https://github.com/svg/svgo/tree/master/plugins) to customise the output. Simply pass an object to `svgmin` with the list of plugins that you would like to disable:

```
gulp.task('default', function() {
    gulp.src('logo.svg')
        .pipe(svgmin({
            removeDoctype: false
        }))
        .pipe(gulp.dest('./out'));
});
```
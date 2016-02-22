var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    cssnext = require('postcss-cssnext'),
    precss = require('precss'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    nano = require('gulp-cssnano'),
    browserSync = require('browser-sync'),
    runSequence = require('run-sequence');;

gulp.task('css', function() {
    var processors = [
        cssnext,
        precss
    ];
    var configNano = {
      autoprefixer: { browsers: 'last 2 versions' },
      discardComments: { removeAll: true },
      safe: true
    };
    return gulp.src('./src/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest'))
        .pipe(plumber())
        .pipe(nano(configNano))
        .pipe(gulp.dest('./app/css'))
        .pipe( browserSync.stream() )
        .pipe(notify({ message: 'Your CSS is ready ;)' }));
});

// Static server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './app/'
        }
    });
});

// Watch
gulp.task('watch', function() {
    // Watch .css files
    gulp.watch('src/**/*.css', ['css']);

});

// Default
gulp.task('default', function() {
  runSequence(['css', 'browser-sync', 'watch']);
});

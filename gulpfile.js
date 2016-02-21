var gulp = require('gulp'),
    fs = require("fs"),
    postcss = require('gulp-postcss'),
    cssnext = require('postcss-cssnext'),
    precss = require('precss'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    nano = require('gulp-cssnano'),
    browserSync = require('browser-sync'),
    css = fs.readFileSync("src/style.css", "utf8"),
    reload = browserSync.reload;

gulp.task('css', function() {
    var processors = [
        cssnext,
        precss
    ];
    return gulp.src('./src/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest'))
        .pipe(plumber())
        .pipe(nano({ discardComments: { removeAll: true } }))
        .pipe(gulp.dest('./css/'))
        .pipe(notify({ message: 'Your CSS is ready ;)' }))
});

// Static server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

// Watch
gulp.task('watch', function() {
    // Watch .css files
    gulp.watch('src/**/*.css', ['css', browserSync.reload]);

});

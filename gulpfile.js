var gulp = require('gulp'),
    fs = require("fs"),
    postcss = require('gulp-postcss'),
    atimport = require('postcss-import'),
    autoprefixer = require('autoprefixer'),
    cssnext = require('postcss-cssnext'),
    notify = require('gulp-notify'),
    nestedcss = require('postcss-nested'),
    plumber = require('gulp-plumber'),
    nano = require('gulp-cssnano'),
    browserSync = require('browser-sync'),
    css = fs.readFileSync("src/style.css", "utf8"),
    reload = browserSync.reload;

gulp.task('css', function() {
    var processors = [
        atimport({ from: ['src/style.css'] }),
        autoprefixer({ browsers: ['last 2 version'] }),
        cssnext,
        nestedcss
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

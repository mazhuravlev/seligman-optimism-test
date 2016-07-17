var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var filelog = require('gulp-filelog');
var count = require('gulp-count');

var paths = {
    styles: [
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
    ],
    scripts: [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jsrender/jsrender.min.js'
    ]
};

gulp.task('clean', function () {
    return del(['build']);
});

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(count('## js-files selected'))
        .pipe(filelog('scripts'))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build'));
});

gulp.task('styles', function() {
    return gulp.src(paths.styles)
        .pipe(count('## css-files selected'))
        .pipe(filelog('styles'))
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest('build'));
});

gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
});

gulp.task('default', ['styles', 'scripts']);
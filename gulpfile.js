var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');

//File path
var SCRIPT_PATH = 'public/script/**/*.js';

//style
gulp.task('style', function(){
    console.log('starting style task');
});

//javascript
gulp.task('script', function(){
    console.log('gulp script file start')
});

//images
gulp.task('script', function(){
    console.log('gulp images file start');

    return gulp.src(SCRIPT_PATH)
        .pipe(uglify())
        .pipe(gulp.dest('public/dist'))
        .pipe(livereload());
});

gulp.task('default', function(){
    console.log("gulp default start here");
});

gulp.task('watch', function(){
    console.log('start watch ');
    require('./server.js');
    livereload.listen();
    gulp.watch('SCRIPT_PATH', ['scripts']);
})
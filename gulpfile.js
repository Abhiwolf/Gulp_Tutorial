var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var less = require('gulp-less');
var LessAutoPrefix = require('less-plugin-autoprefix');
var lessAutoPrefix = new LessAutoPrefix();

var babel = require('gulp-babel');

//File path
var DIST_PATH = 'public/dist';
var SCRIPT_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';

//style for simple css
// gulp.task('styles', function() {
//     console.log('starting style task');
//     return gulp.src(['public/css/reset.css', CSS_PATH])
//         .pipe(plumber(function(err) {
//             console.log('Styles Task error');
//             console.log(err);
//             this.emit('end');
//         }))
//         .pipe(sourcemaps.init())
//         .pipe(autoprefixer())
//         .pipe(concat('styles.css'))
//         .pipe(cleanCSS())
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest(DIST_PATH))
//         .pipe(livereload());
// });

//styles for scss 
// gulp.task('styles', function() {
//     console.log('starting style task');
//     return gulp.src('public/scss/styles.scss')
//         .pipe(plumber(function(err) {
//             console.log('Styles Task error');
//             console.log(err);
//             this.emit('end');
//         }))
//         .pipe(sourcemaps.init())
//         .pipe(autoprefixer())
//         .pipe(sass({
//             outputStyle: 'compressed'
//         }))
//         .pipe(concat('styles.css'))
//         .pipe(cleanCSS())
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest(DIST_PATH))
//         .pipe(livereload());
// });

//style for Less
gulp.task('styles', function() {
    console.log('starting style task');
    return gulp.src('public/less/styles.less')
        .pipe(plumber(function(err) {
            console.log('Styles Task error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [lessAutoPrefix]
        }))

    .pipe(concat('styles.css'))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_PATH))
        .pipe(livereload());
});


//images
// gulp.task('script', function() {
//     console.log('gulp image file start')
// });

//javascript
gulp.task('scripts', function() {
    console.log('gulp Script file start');

    return gulp.src(SCRIPT_PATH)
        .pipe(plumber(function(err) {
            console.log('Scripts Task error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_PATH))
        .pipe(livereload());
});

gulp.task('default', function() {
    console.log("gulp default start here");
});

gulp.task('watch', function() {
    console.log('start watch ');
    require('./server.js');
    livereload.listen();
    gulp.watch(SCRIPT_PATH, ['scripts']);
    // gulp.watch(CSS_PATH, ['styles']);
    //gulp.watch('public/scss/**/*.scss', ['styles']);
    gulp.watch('public/less/**/*.less', ['styles']);
})
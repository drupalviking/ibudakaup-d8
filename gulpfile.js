var gulp = require('gulp');
var livereload = require('gulp-livereload')
var uglify = require('gulp-uglifyjs');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('imagemin', function () {
    return gulp.src('./web/themes/custom/ibudakaup/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./web/themes/custom/ibudakaup/images'));
});

gulp.task('sass', function () {
    gulp.src('./web/themes/custom/ibudakaup/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./web/themes/custom/ibudakaup/css'));
});

gulp.task('uglify', function() {
    gulp.src('./web/themes/custom/ibudakaup/lib/*.js')
        .pipe(uglify('main.js'))
        .pipe(gulp.dest('./web/themes/custom/ibudakaup/js'))
});

gulp.task('watch', function(){
    livereload.listen(38873);
    gulp.watch('./web/themes/custom/ibudakaup/scss/**/*.scss', ['sass']);
    gulp.watch('./web/themes/custom/ibudakaup/lib/*.js', ['uglify']);
    gulp.watch(['./web/themes/custom/ibudakaup/css/style.css', './web/themes/custom/ibudakaup/**/*.twig', './web/themes/custom/ibudakaup/js/*.js'], function (files){
        livereload.changed(files)
    });
});
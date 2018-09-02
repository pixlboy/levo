const gulp = require('gulp');
const sass = require('gulp-sass');
const flatten = require('gulp-flatten');
const autoprefixer = require('gulp-autoprefixer');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const webserver = require('gulp-webserver');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const karma = require('gulp-karma');
const Server = require('karma').Server;

gulp.task('sass', function () {
  return gulp.src('./app/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(flatten())
    .pipe(gulp.dest('./dist/css'));
});


gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function(exitCode) {
        console.log('Karma has exited with exitCode ' + exitCode);
    }).start();
});

gulp.task('watch', function () {
    gulp.watch('./app/**/*.scss', ['sass']);
    gulp.watch('./app/**/*.handlebars', ['hbs']);
    gulp.watch('./app/**/*.js', ['js']);
});

gulp.task('default', ['lint', 'sass', 'hbs', 'js', 'fonts'], function() {
    // Add tests here
});

gulp.task('fonts', function() {
    return gulp.src([
        './app/global/fonts/*.*'
    ])
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('js', function() {
    return gulp.src([
        "./app/global/js/Utils.js",
        "./app/nav/js/navTop.js",
        "./app/nav/js/navBottom.js"
    ])
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('lint', function() {
  return gulp.src(['./app/**/*.js', 'gulpfile.js'])
    .pipe(jshint({

    }))
    .pipe(jshint.reporter(stylish));
});

gulp.task('hbs', function () {
    var templateData = {
        navItemsTop: [
            "Home","Explore","Plan","Get in touch","Sponsorship","Events"
        ],
        navItemsBottom: [
            "Home","Explore","Plan","A Long Title That Pushes To 2 Lines","Sponsorship","Events"
        ]
    },
    options = {
        batch : ['./app/nav/hbs/']
    };

    return gulp.src('app/Global/hbs/NavExample.handlebars')
        .pipe(handlebars(templateData, options))
        .pipe(rename('nav-example.html'))
        .pipe(gulp.dest('dist'));
});

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      directoryListing: {
          enable: true,
          path: "dist"
      },
      open: true,
      port: 4000
    }));
});

var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var jshint = require("gulp-jshint");
var stylish = require('jshint-stylish');
var watch = require('gulp-watch');

gulp.task("default", function () {
  return gulp.src("src/**/*.js")
  	.pipe(watch("src/**/*.js"))
  	//.pipe(jshint())
	//.pipe(jshint.reporter(stylish))
    .pipe(sourcemaps.init())
    //.pipe(concat("all.js"))
    .pipe(babel({experimental:true}))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});
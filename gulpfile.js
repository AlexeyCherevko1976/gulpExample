"use strict"
var gulp=require('gulp'),
	concatCSS=require('gulp-concat-css'),
	rename=require('gulp-rename'),
	notify=require('gulp-notify'),
	prefix=require('gulp-autoprefixer'),
	minifyCSS=require('gulp-minify-css'),
	livereload=require('gulp-livereload'),
	connect=require('gulp-connect'),
	less=require('gulp-less'),
	notify=require('gulp-notify');
	var uncss = require('gulp-uncss');
 

const { watch } = require('gulp');

const{series}=require('gulp');

var puthSource="../389/less/*.css",
	puthLess="../389/less/main.less",
	puthCompile="../389/";
gulp.task('default', function(){

})

// server connect
function connection(cb){
	connect.server({
		root:"app",
		livereload:true
	})
	cb();
}

//less
function lessWork(cb) {
	gulp.src(puthLess)
		.pipe(less('style.css'))
		.pipe(minifyCSS())
		.pipe(prefix('last 15 versions'))
		.pipe(rename('style.css'))
		.pipe(gulp.dest(puthCompile))
		//.pipe(connect.reload());
  // body omitted
  cb();
}

//css
function build(cb) {
	gulp.src(puthSource)
		.pipe(concatCSS('style.css'))
		.pipe(minifyCSS())
		.pipe(prefix('last 15 versions'))
		//.pipe(rename('bundle.min.css'))
		.pipe(gulp.dest(puthCompile))
		//.pipe(notify('Done'));
		.pipe(connect.reload());
  // body omitted
  cb();
}

gulp.task('unCss', function () {
    return gulp.src(puthCompile+'style.css')
        .pipe(uncss({
            html: [puthCompile+'index.html']
        }))
        .pipe(gulp.dest(puthCompile));
});

function html(cb){
	gulp.src(puthCompile+'index.html')
		.pipe(connect.reload());/// 6.04
	cb();
}


watch([puthCompile+'less/*.less'], function(cb) {
  lessWork();
  cb();
});

exports.watch = watch;
exports.connection = connection;
exports.build = build;
exports.html = html;
exports.lessWork=lessWork;
//exports.default = series(build, html);
exports.default = series(lessWork);


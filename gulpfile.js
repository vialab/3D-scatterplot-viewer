var gulp = require("gulp");
var browserify = require("browserify");
var browserSync = require('browser-sync').create();
var source = require("vinyl-source-stream");
var tsify = require("tsify");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var buffer = require("vinyl-buffer");

var sources = {
  pages: ["src/*.html"],
  css: ["src/css/*.css"]
};

gulp.task("copy-html", function()
{
	return gulp
		.src(sources.pages)
		.pipe(gulp.dest("build"))
		.pipe(browserSync.stream())
		;
});

gulp.task("copy-css", function()
{
	return gulp
		.src(sources.css)
		.pipe(gulp.dest("build/css"))
		.pipe(browserSync.stream())
		;
});

gulp.task("build-js", function()
{
	return browserify({
			basedir: ".",
			debug: true,
			entries: ["src/js/main.ts"],
			cache: {},
			packageCache: {}
		})
		.plugin(tsify)
		.bundle()
		.pipe(source("bundle.js"))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		// .pipe(uglify())
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest("build"))
		;
});

gulp.task(
	"default",
	gulp.parallel(["copy-html", "copy-css", "build-js"])
);

gulp.task("watch", gulp.series("default", function()
	{
		browserSync.init({
			server: "./build"
		});

		gulp.watch("src/css/*.css", gulp.series('copy-css'));
		gulp.watch("src/*.html", gulp.series("copy-html"));
		gulp.watch("src/js/**/*.ts").on("change", gulp.series(gulp.series("build-js"), browserSync.reload));
	})
);
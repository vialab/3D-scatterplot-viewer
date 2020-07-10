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
  css: ["src/css/*.css"],
  images: ["src/images/**/*.*"]
};

gulp.task("copy-html", function CopyHtml()
{
	return gulp
		.src(sources.pages)
		.pipe(gulp.dest("build"))
		.pipe(browserSync.stream())
		;
});

gulp.task("copy-css", function CopyCss()
{
	return gulp
		.src(sources.css)
		.pipe(gulp.dest("build/css"))
		.pipe(browserSync.stream())
		;
});

gulp.task(
	"build-js",
	BuildJsToDist
);

gulp.task("copy-images", function CopyImages()
{
	return gulp
	.src(sources.images)
	.pipe(gulp.dest("build/images"))
	.pipe(browserSync.stream())
	;
});

gulp.task(
	"default",
	gulp.parallel(["copy-html", "copy-css", "copy-images", "build-js"])
);

gulp.task("sync-html", function SyncHtml()
{
	return gulp
		.src(sources.pages)
		.pipe(browserSync.stream());
});

gulp.task("sync-css", function SyncCss()
{
	return gulp
		.src(sources.css)
		.pipe(browserSync.stream());
});

gulp.task("watch", gulp.series(
	gulp.parallel(
		"sync-html",
		"sync-css",
		BuildJsToDebug
	),
	function Watch()
	{
		browserSync.init({
			server: "./src"
		});

		gulp.watch("src/css/*.css", gulp.series("sync-css"));
		gulp.watch("src/*.html", gulp.series("sync-html"));
		gulp.watch("src/images/**/*.*", browserSync.reload);
		gulp.watch("src/js/**/*.ts").on("change",
			gulp.series(
				BuildJsToDebug,
				browserSync.reload
			)
		);
	})
);

function BuildJs(destination)
{
	return browserify({
		basedir: ".",
		debug: true,
		entries: ["src/js/Main.ts"],
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
	.pipe(gulp.dest(destination))
	;
}

function BuildJsToDist()
{
	return BuildJs("build");
}

function BuildJsToDebug()
{
	return BuildJs("./src")
}
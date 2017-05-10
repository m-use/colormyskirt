// Include gulp
var gulp = require('gulp');

// Include Plugins
var autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    build = require('gulp-build');
    cleancss = require('gulp-clean-css'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');

// Compile Sass task
gulp.task('sass', function() {
  return gulp
  	.src('src/sass/*.scss')
  	.pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
    	browsers: ['last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
    }))
    .pipe(cleancss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css/'));
});

// Browsersync task
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
});

// Build task
gulp.task('build', function() {
  gulp.src('src/*.html')
      .pipe(gulp.dest('dist'))
});

// Uglify JS task
gulp.task('uglify', function() {
	gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

// Watch task
gulp.task('watch', function() {
    gulp
    	// Watch source sass folder
    	// and run `sass` task when something changes
    	.watch('src/sass/*.scss', ['sass'])
    	// When there is a change,
    	// log a message in the console
    	.on('change', function(event) {
    		console.log(gutil.colors.green('File' + event.path + ' was ' + event.type + ', running tasks...'));
    	});
    gulp
	    // Watch html files in source folder
	    // and run `build` task when something changes
	    .watch('src/*.html', ['build'])
	    // When there is a change,
	    // log a message in the console
	    .on('change', function(event) {
	    	console.log(gutil.colors.green('File' + event.path + ' was ' + event.type + ', running tasks...'));
	    });
      gulp
  	    // Watch html files in source folder
  	    // and run `build` task when something changes
  	    .watch('src/js/*.js', ['uglify'])
  	    // When there is a change,
  	    // log a message in the console
  	    .on('change', function(event) {
  	    	console.log(gutil.colors.green('File' + event.path + ' was ' + event.type + ', running tasks...'));
  	    });
	  gulp
	  	.watch("dist/*")
	  	.on('change', browserSync.reload);
  	gulp
  		.watch("dist/**/*")
  		.on('change', browserSync.reload);
});

// Default task
gulp.task('default', ['sass', 'build', 'uglify', 'watch', 'browser-sync']);
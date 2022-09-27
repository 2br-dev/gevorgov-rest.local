const gulp 			= require('gulp');
const nodeSass		= require('node-sass');
const gulpSass		= require('gulp-sass');
const sass			= gulpSass(nodeSass);
const include		= require('gulp-file-include');
const stream		= require('vinyl-source-stream');
const babelify		= require('babelify');
const browserify	= require('browserify');
const buffer		= require('gulp-buffer');

const sync			= require('browser-sync').init(
	{
		server: {
			baseDir: './release/'
		}
	}
)

gulp.task('scss', () => {
	return gulp.src('./src/scss/**/*.scss')
		.pipe(sass(
			{
				outputStyle: 'compressed'
			}
		))
		.pipe(gulp.dest('./release/css'))
		.pipe(sync.stream())
})

gulp.task('html', () => {
	return gulp.src('./src/html/*.html')
		.pipe(include())
		.pipe(gulp.dest('./release/'))
		.pipe(sync.stream())
})

gulp.task('js', () => {
	return browserify({entries: './src/js/master.js'})
		.transform(
			babelify, {
				presets: ['@babel/preset-env'],
				comments: false,
				global: true,
				compact: false
			}
		)
		.bundle()
		.pipe(stream('master.js'))
		.pipe(buffer())
		.pipe(gulp.dest('./release/js/'))
		.pipe(sync.stream())
})

gulp.task('watch', () => {
	gulp.watch('./src/html/**/*.html', gulp.series('html'));
	gulp.watch('./src/scss/**/*.scss', gulp.series('scss'));
	gulp.watch('./src/js/**/*.js', gulp.series('js'))
})
module.exports = (gulp, plugins, config) => {
  gulp.task('clean-css', () => {
    return gulp.src("./dist/css/")
      .pipe(plugins.clean());
  });

  gulp.task('compile-scss', () => {
      const stream = gulp.src('./app/styles/styles.scss')
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(plugins.cleanCss())
        .pipe(plugins.rename('styles.min.css'))
        .pipe(gulp.dest('./dist/css/'));
      return stream;
  });

  gulp.task('styles', ['clean-css', 'compile-scss']);
};

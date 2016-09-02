module.exports = (gulp, plugins, config) => {
  const jsFiles = 'app/scripts/**/*.js';
  const jsDest  = 'dist/js';

  gulp.task('bundle-scripts', () => {
    return gulp.src(jsFiles)
      .pipe(plugins.babel({
        presets: ['es2015']
      }))
      .pipe(plugins.concat('app.js'))
      .pipe(plugins.rename('app.min.js'))
      .pipe(plugins.uglify())
      .pipe(gulp.dest(jsDest));
  });
};

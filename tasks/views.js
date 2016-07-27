module.exports = (gulp, plugins, config) => {


    // Removing the articles side of things, I don't think it is really needed at this point.
    // The purpose of this tool is to develop a straight forward landing page/micro site.
    gulp.task('build-views', () => {
      const stream = gulp.src('./app/views/pages/*.html')
        .pipe(plugins.nunjucksRender({
          path: ['./app/views/'] // Path to all template files...
        }))

        .pipe(plugins.if(config.prettyUrl, plugins.rename(function(path) {
            if (path.basename != 'index') {
              const newFolderName = path.basename;
              path.dirname += '/' + newFolderName;
              path.basename = 'index';

              console.log('Page urls prettified!');
            }
          })
        ))

        .pipe(gulp.dest('./dist/'))
    });


    gulp.task('views', ['build-views']);
};

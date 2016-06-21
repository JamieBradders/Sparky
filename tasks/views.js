module.exports = (gulp, plugins, config) => {

    // Compile views and articles
    gulp.task('views', () => {
        const stream = gulp.src('./app/views/pages/*.pug')
            .pipe(plugins.pug())
            .pipe(gulp.dest('./dist/'))

            if (config.articles === true) {
              gulp.start('articles');
            }

        return stream;
    });

    // Clean the articles directory before compiling articles to .html
    gulp.task('clean-articles', () => {
      const stream = gulp.src('./dist/articles/')
        .pipe(plugins.clean());

      return stream;
    });

    // compile .md to .html -> articles options must be true in sparky.json
    // @NOTE => Until gulp-layout supports .pug file types then we will
    //          continue to build article templates in .jade format.
    gulp.task('articles', ['clean-articles'], () => {
        const stream = gulp.src('./app/articles/**/*.md')
            .pipe(plugins.frontMatter())
            .pipe(plugins.markdown())
<<<<<<< HEAD
            .pipe(plugins.layout({ "layout" : "./app/views/layouts/articles/post.jade" }, (file) => { return file.frontMatter; }))
=======
            .pipe(plugins.layout({ "layout" : "./app/views/layouts/articles/post.jade" },
                                (file) => { return file.frontMatter; }))
            .pipe(gulp.dest('./dist/articles/'));
>>>>>>> 4d9a09db0b24fe4c31f93bf96aa93b3e94996d2e

            .pipe(plugins.rename(function(path) {
                const newFolderName = path.basename;
                path.dirname += '/' + newFolderName;
                path.basename = 'index';
            }))

            .pipe(gulp.dest('./dist/articles/'));
        return stream;
    });
};

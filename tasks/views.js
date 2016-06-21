module.exports = (gulp, plugins, config) => {

    // Compile views and articles
    gulp.task('build-views', () => {
        const stream = gulp.src('./app/views/pages/*.pug')
            .pipe(plugins.pug())

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
            .pipe(plugins.layout({ "layout" : "./app/views/layouts/articles/post.jade" }, (file) => { return file.frontMatter; }))

            /* Get the compiled markdown file and pass to /{article-name}/index.html
             * For example /app/articles/example-article.md == /dist/articles/example-article/index.html
             * This means you can send traffic to domain.co.uk/articles/example-article
             */
            .pipe(plugins.if(config.prettyUrl, plugins.rename(function(path) {
                const newFolderName = path.basename;
                path.dirname += '/' + newFolderName;
                path.basename = 'index';

                console.log('Article urls prettified!');
              })
            ))

            .pipe(gulp.dest('./dist/articles/'));
        return stream;
    });

    gulp.task('views', ['build-views']);

};

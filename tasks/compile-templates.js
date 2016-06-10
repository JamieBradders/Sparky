module.exports = (gulp, plugins, config) => {

    // code...
    gulp.task('views', function () {
        const stream = gulp.src('./app/views/pages/*.pug')
            .pipe(plugins.pug())
            .pipe(gulp.dest('./dist/'))

        return stream;
    });

    // compile .md to .html
    // @NOTE => Until gulp-layout supports .pug file types then we will continue to build article templates in .jade format.
    gulp.task('articles', function() {
        const stream = gulp.src('./app/articles/**/*.md')
            .pipe(plugins.frontMatter())
            .pipe(plugins.markdown())
            .pipe(plugins.layout({ "layout" : "./app/views/layouts/articles/post.jade" }, (file) => { return file.frontMatter; }))
            .pipe(gulp.dest('./dist/articles/'));

        return stream;
    });
};

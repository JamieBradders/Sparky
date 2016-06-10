module.exports = (gulp, plugins, config) => {

    // code...
    gulp.task('views', function () {
        const stream = gulp.src('./app/views/pages/*.jade')
            .pipe(plugins.jade())
            .pipe(gulp.dest('./dist/'))

        return stream;
    });

    // compile .md to .html
    gulp.task('articles', function() {
        const stream = gulp.src('./app/articles/**/*.md')
            .pipe(plugins.frontMatter())
            .pipe(plugins.markdown())
            .pipe(plugins.layout({ "layout" : "./app/views/layouts/post.jade" }, (file) => { return file.frontMatter; }))
            .pipe(gulp.dest('./dist/articles/'));

        return stream;
    });
};

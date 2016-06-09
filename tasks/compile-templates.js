module.exports = (gulp, plugins, config) => {

    // code...
    gulp.task('build-nunjucks-templates', function () {
        const stream = gulp.src(config.source.views)
            .pipe(plugins.nunjucksRender({
                path: ['./app/views/'] // String or Array
            }))
            .pipe(gulp.dest(config.dest.views));

        return stream;
    });

    gulp.task('views', ['build-nunjucks-templates'])

};

module.exports = (gulp, plugins, config) => {

    gulp.task('webserver', function() {
        const stream = gulp.src('./dist')
            .pipe(plugins.webserver({
                livereload: true,
                open: true,
                port: 5000
            }));

        return stream;
    });

}

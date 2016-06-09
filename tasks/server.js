module.exports = (gulp, plugins, config) => {

    gulp.task('webserver', function() {
        const stream = gulp.src('./dist')
            .pipe(plugins.webserver({
                livereload: true,
                directoryListing: false,
                open: true
            }));

        return stream;
    });

}

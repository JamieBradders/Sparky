module.exports = (gulp, plugins, config) => {
    /* First we need to copy the config.js file */
    gulp.task('update-jspm-config', () => {
        const stream = gulp.src('./config.js')
            .pipe(gulp.dest('./dist/'));

        return stream;
    });

    gulp.task('build-sfx', () => {
        const stream = gulp.src('./app/scripts/main.js')
            .pipe(plugins.jspm({
                selfExecutingBundle: true,
                minify: true,
                skipSourceMaps: true
            }))
            .pipe(plugins.rename('app.min.js'))
            .pipe(gulp.dest('./dist/js'));

        return stream;
    });

    gulp.task('bundle-scripts', ['update-jspm-config', 'build-sfx']);
};

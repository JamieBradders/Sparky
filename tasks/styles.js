module.exports = (gulp, plugins, config) => {

    /**
     * Clean the public css file first
     */
    gulp.task('clean-css', () => {
        return gulp.src(config.theme.scss.dest)
            .pipe(plugins.clean());
    });

    /**
     * When we have the vendor files from Pure, we want to
     * compile our scss into regular css.
     * We @import the relevant pure files from vendor in our scss
     * code.
     */
    gulp.task('compile-scss', () => {
        const stream = gulp.src(config.theme.scss.source)
            .pipe(plugins.sass().on('error', plugins.sass.logError))
            .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(plugins.cleanCss())
            .pipe(plugins.rename('styles.min.css'))
            .pipe(gulp.dest(config.theme.scss.dest));
        return stream;
    });

    gulp.task('styles', ['clean-css', 'compile-scss']);
};

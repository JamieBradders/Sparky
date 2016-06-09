module.exports = (gulp, plugins) => {

    /**
     * Transpile ES2015 code for cross browser compatibility
     * @NOTE => There is a possibility that we might need to add sourcemaps
                to make debugging a little easier, refer to the example at
                https://www.npmjs.com/package/gulp-babel and change the
                tasks accordingly. If not necessarry then remove this comment.
    */
    gulp.task('build-scripts', ['clean-js'], () => {
        const stream = gulp.src('./src/scripts/**/*')
            .pipe(plugins.babel({ presets : ['es2015'] }))
            .pipe(plugins.uglify())
            .pipe(plugins.rename({ suffix : '.min' }))
            .pipe(gulp.dest('./public/js/'));
    });

    gulp.task('clean-js', () => {
        const stream = gulp.src('./public/js')
            .pipe(plugins.clean());

        return stream;
    });

    gulp.task('scripts', ['build-scripts']);
};

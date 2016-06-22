module.exports = (gulp, plugins) => {

    gulp.task('compress-images', () => {
        return gulp.src('./app/images/**/*')
            .pipe(plugins.newer('./dist/images'))
            .pipe(plugins.imagemin({ optimizationLevel : 5, progressive : true, interlaced : true }))
            .pipe(gulp.dest('./dist/images'));
    });

    /* Assign 'compress-images' task to 'images' task. */
    gulp.task('images', ['compress-images']);

};

module.exports = (gulp, plugins) => {

    gulp.task('compress-images', () => {
        return gulp.src('./src/images/**/*')
            .pipe(plugins.newer('./public/images'))
            .pipe(plugins.imagemin({ optimizationLevel : 5, progressive : true, interlaced : true }))
            .pipe(gulp.dest('./public/images'));
    });

    /* Assign 'compress-images' task to 'images' task. */
    gulp.task('images', ['compress-images']);

};

const gulp     = require('gulp');
const plugins  = require('gulp-load-plugins')();
const tasks    = require('fs').readdirSync('./tasks/');
const config   = require('./sparky');
const path     = require('path');

/**
 * To see a list of plugins and their var name simply uncomment below
 */
 // console.log(plugins);

/**
 * Run each task in the Task array : Each file in build-tasks/
 */
tasks.forEach((task) => {
    require('./tasks/' + task)(gulp, plugins, config, path)
});

/**
 * Watcher Tasks
 */
gulp.task('watch', () => {
    gulp.watch('app/styles/**/*',   ['styles']);
    gulp.watch('app/scripts/**/*',  ['scripts']);
    gulp.watch('app/images/**/*',   ['images']);
    gulp.watch('app/views/**/*',    ['views']);
    gulp.watch('app/articles/**/*', ['articles']);
});

/**
 * Default Task
 * @TODO -> Seperate pure-css task, call it vendor perhaps?
 * @TODO -> this will become the production task
 */
gulp.task('default', ['vendor'], () => {
    gulp.start('styles', 'scripts', 'images', 'views', 'webserver', 'watch');
});

/**
 * Production Task
 * This is the task that we run on the server to build assets.
 * @TODO -> Optimization tasks will probably fall within this e.g. minifying etc.
 */
gulp.task('production', () => {
    gulp.start('vendor', 'styles', 'scripts', 'images', 'views');
});

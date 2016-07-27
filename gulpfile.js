const gulp     = require('gulp');
const plugins  = require('gulp-load-plugins')();
const tasks    = require('fs').readdirSync('./tasks/');
const config   = require('./sparky');
const path     = require('path');

/**
 * To see a list of plugins and their var name simply run gulp get-plugins
 */
 gulp.task('get-plugins', () => {
   console.log(plugins);
 })

/**
 * Run each task in the Task array : Each file in build-tasks/
 */
tasks.forEach((task) => {
    require('./tasks/' + task)(gulp, plugins, config, path)
});

/**
 * Watcher Tasks
 */
const jsFiles = ["./app/scripts/**/*.js", "!./app/scripts/jspm_packages/**/*"];

gulp.task('watch', () => {
    gulp.watch('./app/styles/**/*',   ['styles']);
    gulp.watch('./app/images/**/*',   ['images']);
    gulp.watch('./app/views/**/*',    ['views']);
    gulp.watch('./app/articles/**/*', ['articles']);
    gulp.watch(jsFiles, ['build-sfx']);
    gulp.watch('./config.js', ['update-jspm-config']);

});

/**
 * Default Task
 * @TODO -> Seperate pure-css task, call it vendor perhaps?
 * @TODO -> this will become the production task
 */
gulp.task('default', () => {
    gulp.start('styles', 'bundle-scripts', 'images', 'build-views');
});

/**
 * Production Task
 * Run this task before deploying the contents of dist/
 */
gulp.task('production', () => {
    gulp.start('styles', 'bundle-scripts', 'images', 'build-views');
});

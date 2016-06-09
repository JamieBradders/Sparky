"use strict";

module.exports = (gulp, plugins, config) => {

    let bootstrap_src  = config.vendor.bootstrap.styles.src;
    let bootstrap_dest = config.vendor.bootstrap.styles.dest;
    // let jquery_src  = //
    // let jquery_dest = //

    gulp.task("get-local-vendor-files", ["clean-local-vendor-files"], () => {
        const stream = gulp.src(bootstrap_src)
            .pipe(gulp.dest(bootstrap_dest));

        return stream;
    });

    gulp.task("clean-local-vendor-files", () => {
        const stream = gulp.src(bootstrap_dest)
            .pipe(plugins.clean());

        return stream;
    })

    gulp.task('vendor', ['get-local-vendor-files']);

};

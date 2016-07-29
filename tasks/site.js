"use strict";

// Site level gulp tasks.
module.exports = (gulp, plugins, config) => {

  const is_sitemap_enabled = config.sitemap;

  /**
   * Generate a sitemap.xml file for SEO.
   * @NOTE -> Site url must be updated in the sparky.json config file.
   *          By default the value is '/'
  **/
  gulp.task('generate-sitemap', () => {
    if (is_sitemap_enabled) {
      gulp.src('./app/views/pages/**/*.html', { read: false })
        .pipe(plugins.sitemap({
          siteUrl: config.siteUrl
        }))
        .pipe(gulp.dest('./dist/'));
    } else {
      console.log('⛔️ >> No sitemap generated\n⛔️ >> Please set the sitemap flag to true in sparky.json if you require a sitemap.xml')
    }
  });
}

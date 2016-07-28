module.exports = (gulp, plugins, config) => {
  const gulpnunjucks = require('gulp-nunjucks');
  const markdown = require('nunjucks-markdown');
  const marked = require('marked');
  const nunjucks = require('nunjucks');

  // Removing the articles side of things, I don't think it is really needed at this point.
  // The purpose of this tool is to develop a straight forward landing page/micro site.
  gulp.task('build-views', () => {
    const env = new nunjucks.Environment(new nunjucks.FileSystemLoader('./app/views/'));

    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false
    });

    markdown.register(env, marked);

    const stream = gulp.src(['./app/views/pages/*.html'])
      // Render template with nunjucks and marked
      .pipe(gulpnunjucks.compile("", {env: env}))
      .pipe(plugins.if(config.prettyUrl, plugins.rename(function(path) {
          if (path.basename != 'index') {
            const newFolderName = path.basename;
            path.dirname += '/' + newFolderName;
            path.basename = 'index';
            console.log('Page urls prettified!');
          }
        })
      ))
      .pipe(gulp.dest('./dist/'))
    return stream;
  });
  
  gulp.task('views', ['build-views']);
};

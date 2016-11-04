const inq = require('inquirer')
const fs  = require('fs')

module.exports = (gulp, plugins) => {

  // Maybe this can be replaced with Gulp Prompt where src is /app/views/articles/
  gulp.task('article-create', function() {
    var questions =
      [
        {
          type: 'input',
          name: 'article_name',
          message: 'What is the name of your Article?',
          validate: function(str) {
            return str !== ''
          },
          filter: function(str) {
            return `${str.replace(/\s/g, "-").toLowerCase()}.md`
          }
        }
      ];

    inq.prompt(questions).then(function (answers) {
      const name = answers.article_name;

      fs.open(`./app/views/articles/${name}`, 'wx', (err, fd) => {
        if (err) {
          if (err.code === "EEXIST") {
            console.error(`${name} already exists`);
            return;
          }
        }
        // fs.writeFile(`../app/views/articles/log.txt`, 'Some log\n', function(err) {
        //   if (err) return console.log(err);
        // });
      })
    })
  })
}

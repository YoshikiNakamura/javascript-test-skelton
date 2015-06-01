gulp   = require 'gulp'
coffee = require 'gulp-coffee'
mocha = require 'gulp-mocha'
browserify = require 'gulp-browserify'


path = {
  scripts: [
    'lib/js/**/*.js'
  ]
}

gulp.task 'compile-js', () ->
  gulp.src path.scripts
  .pipe gulp.dest('dest/js')

gulp.task 'test', () ->
  gulp.src path.scripts
    .pipe mocha({reporter:'nyan'})


gulp.task 'watch', () ->
  gulp.watch path.scripts, ['compile-js', 'test']


gulp.task 'default', ['watch', 'compile-js', 'test'];


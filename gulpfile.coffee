gulp   = require 'gulp'
coffee = require 'gulp-coffee'
mocha = require 'gulp-mocha'
browserify = require 'gulp-browserify'


path = {
  scripts: ['lib/coffee/**/*.coffee']
}

gulp.task 'compile-coffee', () ->
  gulp.src path.scripts
  .pipe coffee()
  .pipe gulp.dest('dest/js')

gulp.task 'test', () ->
  gulp.src path.scripts
    .pipe mocha({reporter:'nyan'})


gulp.task 'watch', () ->
  gulp.watch path.scripts, ['compile-coffee', 'test']


gulp.task('default', ['watch', 'compile-coffee', 'test']);
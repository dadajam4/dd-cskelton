'use strict';
let undefined;



const Config = require('../../Config');
const gulp   = require('gulp');
const path   = require('path');



// *** task : watch
gulp.task('watch', function() {
  gulp.watch([
    path.join(Config.SASS_ROOT, '**'),
    path.join(Config.CONFIG_DIR, '**', '*'),
    path.join(Config.GULP_TASKS_DIR, 'css.js'),
    '!' + path.join(Config.SASS_ROOT, '_headers', '*'),
  ], ['css']);
  // gulp.watch(path.join(Config.ECT_ROOT, '**', '*.ect'), ['ect']);
});

'use strict';



const Config     = require('./Config');
const gulp       = require('gulp');
const requireDir = require('require-dir');



requireDir(Config.GULP_TASKS_DIR, {recurse: true});



// *** task : build
gulp.task('build', ['css', 'ect']);

// *** task : develop
gulp.task('develop', ['css', 'js_with_watch', 'watch', 'server']);

// *** task : default
gulp.task('default', ['develop']);

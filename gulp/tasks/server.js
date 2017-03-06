'use strict';
let undefined;



const Config   = require('../../Config');
const gulp     = require('gulp');
const path     = require('path');
const nodemon  = require('gulp-nodemon');
const Notifier = require(path.join(Config.LIB_DIR, 'Notifier'));
const Log      = require(path.join(Config.LIB_DIR, 'Log'));
const Utility  = require(path.join(Config.LIB_DIR, 'Utility'));

const SCRIPT_PATH = path.join(Config.SERVER_ROOT, 'server.js');



// *** task : server
gulp.task('server', function(callback) {

  let called = false;

  return nodemon({
    script: SCRIPT_PATH,
    watch: [
      Config.SERVER_ROOT,
      Config.ECT_ROOT,
      Config.LIB_DIR,
      Config.CONFIG_DIR,
    ],
  })
  .on('start', function() {

    // サーバー起動時
    new Notifier('success', {
      subtitle: 'nodemon',
      message : 'サーバを起動しました',
    });

    if (!called) {
      called = true;
      callback();
    }
  })
  .on('restart', function() {

    // サーバー再起動時
    new Notifier('success', {
      subtitle: 'nodemon',
      message : 'サーバを再起動しました',
    });
  });
});

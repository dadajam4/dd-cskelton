'use strict';
let undefined;



const Config   = require('../../Config');
const gulp     = require('gulp');
const path     = require('path');
const webpack  = require('webpack');
const gutil    = require('gulp-util');
const Notifier = require(path.join(Config.LIB_DIR, 'Notifier'));
const Log      = require(path.join(Config.LIB_DIR, 'Log'));



const WEBPACK_CONFIG_PATH = path.join(Config.CONFIG_DIR, 'webpack.config.js');



// *** task : js
gulp.task('js', function(callback) {
  let webpackConfig = require(WEBPACK_CONFIG_PATH);
  webpackConfig.cache     = false;
  webpackConfig.watch     = false;
  webpackConfig.keepalive = false;
  doWebPack(webpackConfig);
});

// *** task : js_with_watch
gulp.task('js_with_watch', function(callback) {
  let webpackConfig = require(WEBPACK_CONFIG_PATH);
  webpackConfig.cache     = true;
  webpackConfig.watch     = true;
  webpackConfig.keepalive = true;
  doWebPack(webpackConfig);
});

function doWebPack(webpackConfig) {
  webpack(webpackConfig, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);

    let jsonStats = stats.toJson();

    if (jsonStats.errors.length > 0) {
      jsonStats.errors.forEach(function(error, i) {
        console.log('[' + i + '] >>>>> ' + '\u001b[31m' + error + '\u001b[0m');
      });
      new Notifier('danger', {
        subtitle: 'js',
        message : 'コンパイルに失敗しました。',
      });
      return;
    }
    if (jsonStats.warnings.length > 0) {
      jsonStats.warnings.forEach(function(error, i) {
        console.log('[' + i + '] >>>>> ' + '\u001b[33m' + error + '\u001b[0m');
      });
    }

    console.log('');
    console.log('\u001b[32m' + 'webpackのビルドが完了しました。-------------------------' + '\u001b[0m');
    jsonStats.assets.forEach(function(asset, i) {
      if (asset.emitted) {
        console.log('\u001b[32m' + '[' + i + '] ' + asset.name + ' > ' + Math.round(asset.size / 1000) + ' kB\u001b[0m');
      }
    });
    console.log('\u001b[32m' + '--------------------------------------------------' + '\u001b[0m');
    new Notifier('success', {
      subtitle: 'js',
      message : 'コンパイルが完了しました。',
    });
  });
}
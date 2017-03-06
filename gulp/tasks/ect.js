// 'use strict';
// let undefined;



// const Config     = require('../../Config');
// const gulp       = require('gulp');
// const path       = require('path');
// const plumber    = require("gulp-plumber");
// const ect        = require(path.join(Config.LIB_DIR, 'gulp-ect-custom'));
// const Notifier   = require(path.join(Config.LIB_DIR, 'Notifier'));
// const Log        = require(path.join(Config.LIB_DIR, 'Log'));
// const siteConfig = require(path.join(Config.GULP_DIR, 'site.config'));



// // *** task : ect
// gulp.task('ect', function() {
//   gulp.src([
//     path.join(Config.ECT_ROOT, '**', '*.ect'),
//     '!' + path.join(Config.ECT_ROOT, '**', '_*.ect'),
//   ])
//   .pipe(plumber({
//     handleError: function(err) {
//       console.log(err);
//       new Notifier('danger', {
//         subtitle: 'ect',
//         message : 'コンパイルに失敗しました。',
//       });
//       Log.print('[ect] コンパイルに失敗しました。', 'danger');
//       this.emit('end');
//     }
//   }))
//   .pipe(ect({
//     data: function(fileName, cb) {
//       let pageMap        = fileName.replace(/^src\/ect\//, '').replace(/index$/, '').replace(/\/$/, '').split('/'),
//           parentCategory = pageMap[0] || null,
//           childCategory  = pageMap[1] || null;

//       cb({
//         tpl           : Config.TMPL_KEY,
//         cssName       : Config.CSS_NAME,
//         inc           : path.join(Config.ECT_ROOT, '_inculde'),
//         siteConfig    : siteConfig,
//         parentCategory: parentCategory,
//         childCategory : childCategory,
//       });
//     },
//   }))
//   .pipe(gulp.dest(Config.HTML_ROOT))
//   .on('end', function() {
//     new Notifier('success', {
//       subtitle: 'ect',
//       message : 'コンパイルが完了しました。',
//     });
//     Log.print('[ect] コンパイルが完了しました。', 'success');
//   });
// });

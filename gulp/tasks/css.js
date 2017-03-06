'use strict';



const Config       = require('../../Config');
const gulp         = require('gulp');
const fs           = require('fs');
const path         = require('path');
const plumber      = require("gulp-plumber");
const sass         = require('gulp-sass');
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker     = require('css-mqpacker');
const cssnano      = require('cssnano');
const sourcemaps   = require('gulp-sourcemaps');
const rename       = require('gulp-rename');
const size         = require('gulp-size');
const Utility      = require(path.join(Config.LIB_DIR, 'Utility'));
const DDSassColors = require(path.join(Config.LIB_DIR, 'DDSassColors'));
const Notifier     = require(path.join(Config.LIB_DIR, 'Notifier'));
const Log          = require(path.join(Config.LIB_DIR, 'Log'));



const cssConfigPath   = path.join(Config.CONFIG_DIR, 'css.config.js');
const colorTokensPath = path.join(Config.CONFIG_DIR, 'color.tokens.js');
const headerSrcDir    = path.join(Config.SASS_ROOT, '_headers');
const headerSrcPath   = path.join(headerSrcDir, '_headers.scss');
const headerReadme    = fs.readFileSync(path.join(headerSrcDir, '_readme.txt')).toString();



// *** task : css
gulp.task('css', function() {
  const s = size({
    pretty: true,
    showFiles: true,
    showTotal: false,
  });

  const cssConfig = require(cssConfigPath);
  delete(require.cache[cssConfigPath]);

  const colorTokens = require(colorTokensPath);
  delete(require.cache[colorTokensPath]);

  const colors             = new DDSassColors(colorTokens);
  const typoThemeKeys      = colors.getSeparatedKeys('typo');
  const partsThemeKeys     = colors.getSeparatedKeys('parts');
  const containerThemeKeys = colors.getSeparatedKeys('container');

  let headerSrc = `
    ${headerReadme}
    $tpl: ${cssConfig.suffix};
    $typo-theme-keys: ${typoThemeKeys};
    $parts-theme-keys: ${partsThemeKeys};
    $container-theme-keys: ${containerThemeKeys};
  `.replace(/(^|\n)\s+/g, '$1');

  headerSrc += '\n' + Utility.hash2sassmap('mq-widths', cssConfig.mediaQueryDefine)
            +  '\n\n' + colors.sassText;

  fs.writeFileSync(headerSrcPath, headerSrc, 'utf-8');

  gulp.src(path.join(Config.SASS_ROOT, `index.scss`))
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({
      includePaths: [
        Config.SASS_ROOT,
        path.join(Config.ROOT, 'node_modules', 'flag-icon-css', 'sass'),
        path.join(Config.ROOT, 'node_modules', 'font-awesome', 'scss'),
        path.join(Config.ROOT, 'node_modules', 'compass-mixins', 'lib'),
      ],
      // outFile: 'hoge.css'
    }).on('error', function(err) {
      new Notifier('danger', {
        subtitle: 'css',
        message : 'コンパイルに失敗しました。',
      });
      Log.print('[css] コンパイルに失敗しました。', 'danger');
      sass.logError.bind(this)(err);
    }))
    .pipe(postcss([
      autoprefixer({
        browsers: cssConfig.compatibility,
      }),
      mqpacker,
      cssnano,
    ], {

      // here in postcss options...
    }))
    .pipe(rename(`${cssConfig.filename}.css`))
    .pipe(sourcemaps.write('.'))
    .pipe(s)
    .pipe(gulp.dest(Config.DEST_CSS))
    .on('end', function() {
      new Notifier('success', {
        subtitle: 'css',
        message : 'コンパイルが完了しました。',
      });
      Log.print('[css] コンパイルが完了しました。', 'success');
    });
});

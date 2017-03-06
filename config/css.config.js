'use strict';



const cssConfig = {};



// css suffix
// @example
//   "dd-"
//   .dd-hoge__fuga
cssConfig.suffix = 'dd-';

// Out Filename
cssConfig.filename = cssConfig.suffix.replace(/[\-|_]$/, '') || 'dd';

// Media Query Define
cssConfig.mediaQueryDefine = {
  xs: 544,
  sm: 768,
  // md: 992,
  md: 920,
  lg: 1200,
};

// Browser Compatibility
cssConfig.compatibility = [
  'last 2 versions',
  'ie >= 10',
  'Android >= 4.4',
  'ios >= 8',
];



module.exports = cssConfig;
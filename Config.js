'use strict';
let undefined;



const path      = require('path');
const myPackage = require('./package');



module.exports = class Config {

  // paths
  static get PACKAGE_NAME() { return myPackage.name };
  static get PACKAGE_TITLE() { return 'DD CSkelton'; };
  static get ROOT() { return path.resolve(process.cwd()) };
  static get CONFIG_DIR() { return path.join(Config.ROOT, 'config') };
  static get LIB_DIR() { return path.join(Config.ROOT, 'lib') };
  static get GULP_DIR() { return path.join(Config.ROOT, 'gulp') };
  static get GULP_TASKS_DIR() { return path.join(Config.GULP_DIR, 'tasks') };
  static get SRC_ROOT() { return path.join(Config.ROOT, 'src') };
  static get SASS_ROOT() { return path.join(Config.SRC_ROOT, 'sass') };
  static get ECT_ROOT() { return path.join(Config.SRC_ROOT, 'ect') };
  static get JS_ROOT() { return path.join(Config.SRC_ROOT, 'js') };
  static get DEST_ROOT() { return path.join(Config.ROOT, 'dest') };
  static get ASSETS_ROOT() { return path.join(Config.ROOT, 'assets') };
  static get DEST_CSS() { return path.join(Config.DEST_ROOT, 'css') };
  static get DEST_JS() { return path.join(Config.ASSETS_ROOT, 'js') };
  static get DEST_JS_NAME() { return 'demo' };
  static get HTML_ROOT() { return path.join(Config.ROOT, 'html') };
  static get SERVER_ROOT() { return path.join(Config.ROOT, 'server') };
  static get SERVER_PORT() { return 3000 };



  // Dump All Getter
  static dump() {
    let keys   = Object.getOwnPropertyNames(this),
        ignore = ['prototype', 'length', 'name'];

    keys.forEach((key) => {
      if (ignore.indexOf(key) === -1 && typeof this[key] !== 'function') {
        console.log(key + ' -> ' + this[key]);
      }
    });
  }
}
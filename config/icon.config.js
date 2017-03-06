'use strict';



const fs      = require('fs');
const path    = require('path');
const Config  = require('../Config');
const Utility = require(path.join(Config.LIB_DIR, 'Utility'));



const FA_PATH      = path.join(Config.ROOT, 'node_modules', 'font-awesome');
const FA_SCSS_PATH = path.join(FA_PATH, 'scss', '_icons.scss');
const FA_SCSS      = fs.readFileSync(FA_SCSS_PATH, 'utf-8');



let list = [];
FA_SCSS.match(/\.#\{\$fa\-css\-prefix\}\-(.*?):before \{/g).forEach((match) => {
  let name = match.match(/\.#\{\$fa\-css\-prefix\}\-(.*?):before \{/)[1];
  list.push(name);
});



class IconConfig {

  get list() { return list }



  constructor() {
  }



  at(index) {
    let my = this;

    return my.list[index];
  }



  each(cb) {
    let my = this;

    for (let i = 0, l = my.list.length; i < l; i++) {
      let name = my.list[i];
      if (cb(name) === false) {
        break;
      }
    }
  }
}



module.exports = new IconConfig();
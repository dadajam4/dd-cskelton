'use strict';



const fs      = require('fs');
const path    = require('path');
const Config  = require('../Config');
const Utility = require(path.join(Config.LIB_DIR, 'Utility'));



const FI_PATH      = path.join(Config.ROOT, 'node_modules', 'flag-icon-css');
const FI_SASS_PATH = path.join(FI_PATH, 'sass');
const FI_SASS_LIST = ['_flag-icon-list', '_flag-icon-more'].map(fileName => { return path.join(FI_SASS_PATH, fileName + '.scss') });

let list = [];
FI_SASS_LIST.forEach(filePath => {
  let FI_SASS = fs.readFileSync(filePath, 'utf-8');

  let allRows = FI_SASS.match(/flag\-icon\((.*?)\)/g);
  if (allRows) {
    allRows.forEach(row => {
      list.push(row.match(/\((.*?)\)/)[1]);
    });
  }
});



class FlagConfig {

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



module.exports = new FlagConfig();
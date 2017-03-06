'use strict';
let undefined;



const FRAT_STR   = '\u001b[0m',
      TYPE_TABLE = {
        default: FRAT_STR,
        success: '\u001b[32m',
        info   : '\u001b[36m',
        warning: '\u001b[33m',
        danger : '\u001b[31m',
      };



module.exports = class Log {



  static print(message, type) {
    type = type || 'default';

    let color = TYPE_TABLE[type];
    console.log(color + message + FRAT_STR);
  }
}

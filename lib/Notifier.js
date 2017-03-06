'use strict';
let undefined;



const Config       = require('../Config');
const NodeNotifier = require('node-notifier');
const path         = require('path');

const SOUND_TABLE = {
  success: 'Funk',
  danger : 'Basso',
};



module.exports = class Notifier {
  constructor(type, opt) {
    this.title    = opt.title    || Config.PACKAGE_TITLE;
    this.subtitle = opt.subtitle || false;
    this.message  = opt.message  || false;
    this.icon     = path.join(__dirname, 'res', type + '.png');
    this.sound    = SOUND_TABLE[type] ? SOUND_TABLE[type] : false;
    this.instance = NodeNotifier.notify(this);
  }
}

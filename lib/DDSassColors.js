'use strict';



// const chroma = require('chroma-js');
const tinycolor = require("tinycolor2");



const SASS_TEXT_SUF = 'color-';
const DEFAULT_KEY = '_default';
const CSS_CHARS = [
  'inherit',
  'transparent',
];



class DDSassColors {



  /**
   * get keys
   */
  get keys() {
    let my = this;

    let defines = my.define,
        keys    = [],
        tmp     = [];

    function work(define) {

      for (let key in define) {
        if (typeof define[key] === 'object') {
          tmp.push(key);
          work(define[key]);
        } else {
          let $key = tmp.join('-') + (key === DEFAULT_KEY ? '' : '-' + key);
          $key = $key.replace(/^-/, '');
          keys.push($key);
        }
      }
      tmp.pop();
    }

    work(defines);

    return keys;
  }



  /**
   * get colors
   */
  get colors() {
    let my = this;

    let colors = [];

    my.keys.forEach(key => {
      let color = {key: key, value: my.at(key)};
      colors.push(color);
    });

    return colors;
  }



  /**
   * get sass text
   */
  get sassText() {
    let my = this;

    let texts = [];
    let colors = my.colors;

    colors.forEach(color => {
      texts.push('$' + SASS_TEXT_SUF + color.key + ': ' + color.value + ' !default;');
    });

    texts.push('$colors: (');
    colors.forEach(color => {
      texts.push('  ' + color.key + ': ' + '$' + SASS_TEXT_SUF + color.key + ',');
    });
    texts.push(');');

    return texts.join('\n');
  }



  /**
   * constructor
   */
  constructor(define) {
    let my = this;

    my.define = define;
  }



  /**
   * get keys
   */
  getKeys(target, opt = {}) {
    let my = this;

    let define = my.define[target],
        ignore = opt.ignore || [];

    ignore = typeof ignore === 'string' ? [ignore] : ignore;

    let keys = [];
    for (let key in define) {
      if (ignore.indexOf(key) === -1) {
        keys.push(key);
      }
    }
    return keys;
  }



  /**
   * get separated key list
   */
  getSeparatedKeys(target, opt = {}) {
    let my = this;

    opt.separator = opt.separator || ', ';
    return my.getKeys(target, opt).join(opt.separator);
  }



  /**
   * at
   */
  at(key) {
    let my = this;

    let defines = my.findColorDefines(key);

    let result = my.getFormulaResult(defines.value, defines.$this, key);

    return result;
  }



  /**
   * lighten
   */
  lighten($color, $ammount) {
    $color = typeof $color === 'object' ? $color[DEFAULT_KEY] : $color;
    let color = tinycolor($color);
    return color.lighten(parseInt($ammount, 10)).toString();
  }



  /**
   * darken
   */
  darken($color, $ammount) {
    $color = typeof $color === 'object' ? $color[DEFAULT_KEY] : $color;
    let color = tinycolor($color);
    return color.darken(parseInt($ammount, 10)).toString();
  }



  /**
   * saturate
   */
  saturate($color, $ammount) {
    $color = typeof $color === 'object' ? $color[DEFAULT_KEY] : $color;
    let color = tinycolor($color);
    return color.saturate(parseInt($ammount, 10)).toString();
  }



  /**
   * desaturate
   */
  desaturate($color, $ammount) {
    $color = typeof $color === 'object' ? $color[DEFAULT_KEY] : $color;
    let color = tinycolor($color);
    return color.desaturate(parseInt($ammount, 10)).toString();
  }



  /**
   * mix
   */
  mix($color1, $color2, $ammount) {
    $color1 = typeof $color1 === 'object' ? $color1[DEFAULT_KEY] : $color1;
    $color2 = typeof $color2 === 'object' ? $color2[DEFAULT_KEY] : $color2;

    let color1 = tinycolor($color1),
        color2 = tinycolor($color2);

    return tinycolor.mix($color1, $color2, parseInt($ammount, 10)).toString();
  }



  /**
   * autoBrightness
   */
  autoBrightness($color, $ammount, $judgeAmmount, $judgeColor) {
    $judgeAmmount = $judgeAmmount || '50%';

    $color = typeof $color === 'object' ? $color[DEFAULT_KEY] : $color;
    let color        = tinycolor($color);
    let judgeAmmount = parseInt($judgeAmmount, 10) / 100;
    let judgeColor   = $judgeColor ? tinycolor($judgeColor) : color;

    let per     = judgeColor.getBrightness() / 255,
        isLight = per >= judgeAmmount;

    if (isLight) {
      return this.darken($color, $ammount);
    } else {
      return this.lighten($color, $ammount);
    }
    // console.log(per);
  }



  /**
   * find color defines
   */
  findColorDefines(key) {
    let my = this;

    let parent,
        $this,
        value = my.define,
        tmp   = key.split('-');

    while (tmp.length) {
      parent = $this;
      $this  = value;
      value  = value[tmp[0]];

      if (value === undefined) {
        break;
      }

      tmp.shift();
    }

    if  (typeof value === 'object') {
      $this = value;
      value = $this[DEFAULT_KEY];
    } else if (typeof value !== 'string') {
      throw new Error(key + ' は定義されていません。');
      return;
    }

    return {
      key  : key,
      $this: $this,
      value: value,
    };
  }



  /**
   * replace formula variable
   */
  replaceFormulaVariable(formula, $this, key) {
    let my = this;

    let work = formula;
    let tmp = key.split('-');
    tmp.pop();
    let parentKey = tmp.join('-');

    // let parentKey = key.split('-').pop().join('-');

    // $this.xxx
    try {
      let matchs = work.match(/(\$this\.[a-zA-Z0-9_]+)+?/g);
      matchs.forEach(match => {
        let targetKey   = parentKey + match.replace(/^\$this\./, '-'),
            targetValue = my.at(targetKey);

        work = work.replace(match, targetValue);
      });
    } catch(e) {}

    // $this
    try {
      let matchs = work.match(/\$this(?!\.)/g);
      matchs.forEach(match => {
        work = work.replace(match, my.getFormulaResult($this[DEFAULT_KEY], $this, key));
      });
    } catch(e) {}

    // $variables
    try {
      let matchs = work.match(/(\$[0-9a-zA-Z\-_]+)/g);
      matchs.forEach(match => {
        if (match === '$this') {
          return;
        }

        let key = match.replace(/^\$/, '');
        work = work.replace(match, my.at(key));
      });
    } catch(e) {}

    // CSS CHARS
    CSS_CHARS.forEach(char => {
      if (work.match(new RegExp(char, 'g'))) {
        work = work.replace(new RegExp('(' + char + ')', 'g'), "'$1'");
      }
    });

    // HEX
    work = work.replace(/(#[0-9a-zA-Z]+)/g, "'$1'");

    // RGB(A)
    work = work.replace(/(rgb.*?\))/gi, "'$1'");

    // %
    work = work.replace(/([0-9]+%)/g, "'$1'");

    return work;
  }



  /**
   * get formula result
   */
  getFormulaResult(formula, $this, key) {
    let my = this;

    let setupedFormula = my.replaceFormulaVariable(formula, $this, key);

    // Set Scope Methods
    const lighten        = my.lighten.bind(this);
    const darken         = my.darken.bind(this);
    const saturate       = my.saturate.bind(this);
    const desaturate     = my.desaturate.bind(this);
    const mix            = my.mix.bind(this);
    const autoBrightness = my.autoBrightness.bind(this);

    return eval(setupedFormula);
  }
}

module.exports = DDSassColors;
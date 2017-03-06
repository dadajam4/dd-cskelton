'use strict';



const Config   = require('../../../Config');
const jsrender = require('jsrender');
const cheerio  = require('cheerio');
const path     = require('path');



const cssConfig = require(path.join(Config.CONFIG_DIR, 'css.config.js'));

const DEFAULT_TMPL_ATTRIBUTES = [
  'tag',
  'theme',
  'type',
];

const DEFAULT_W3C_ATTRIBUTES = [
  'id',
  'class',
  'disabled',
];

const DEFAULT_VALUES = {
  tplType: 'base',
};



class AbstractTagParser {
  static get $() { return cheerio }



  /**
   * @static
   * attributes Define Merger
   */
  static attributesDefineMerger(a = [], b = []) {
    let merged = a.concat(b);
    merged = merged.filter(function (x, i, self) { return self.indexOf(x) === i });
    return merged;
  }



  /**
   * @static
   * defaults Define Merger
   */
  static defaultsDefineMerger(a = {}, b = {}) {
    let merged = Object.assign({}, a, b);
    return merged;
  }



  /**
   * constructor
   */
  constructor($el, templateStr, opt = {}) {
    let my = this;

    my.tplKey            = cssConfig.suffix;
    my.cssConfig         = cssConfig;
    my.globalConfig      = Config;
    my.$el               = $el;
    my.tmpl              = jsrender.templates(templateStr);
    my.data              = {tplKey: my.tplKey, content: $el.html()};
    my.tmplAttributes    = AbstractTagParser.attributesDefineMerger(DEFAULT_TMPL_ATTRIBUTES   , opt.tmplAttributes   );
    my.defaultAttributes = AbstractTagParser.attributesDefineMerger(DEFAULT_W3C_ATTRIBUTES, opt.defaultAttributes);
    my.defaults          = AbstractTagParser.defaultsDefineMerger(DEFAULT_VALUES, opt.defaults);

    // Get Tmpl Attributes
    my.tmplAttributes.forEach(name => {
      let key = 'tpl' + name.charAt(0).toUpperCase() + name.slice(1);
      my.data[key] = my.$el.attr(`tpl-${name}`);
    });

    // Get Default Attributes
    my.defaultAttributes.forEach(name => {
      let key = name;

      my.data[key] = my.$el.attr(name);
    });

    // Set Defaults
    for (let key in my.data) {
      my.data[key] = my.data[key] || my.defaults[key];
    }

    my.data.tagName = my.data.tplTag;
  }



  /**
   * get html
   */
  get $html() {
    let my = this;

    let html  = my.tmpl.render(my.data),
        $html = cheerio(html);

    // Add Setted Classes
    if (my.data.class) {
      let classList = my.data.class.trim().replace(/[ ]+/g, ' ').split(' ').map(name => {
        return my.tplKey + name;
      });
      $html.addClass(classList.join(' '));
    }

    // Add Theme Classes
    if (my.data.tplTheme) {
      let themeClassName = my.tplKey + 'theme' + (my.data.tplTheme === 'base' ? '' : `--${my.data.tplTheme}`);
      $html.addClass(themeClassName);
    }

    // Extend Setted Attributes
    let attrs = my.$el.attr();
    for (let key in attrs) {
      if (!key.match(/^tpl\-|class/)) {
        $html.attr(key, attrs[key]);
      }
    }

    return $html;
  }



  /**
   * refetch content
   */
  refetchContent() {
    this.data.content = this.$el.html();
  }
}



module.exports = AbstractTagParser;
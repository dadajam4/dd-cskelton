'use strict';



const Config               = require('../../Config');
const path                 = require('path');
const cheerio              = require('cheerio');
const Utility              = require(path.join(Config.LIB_DIR, 'Utility'));
const AbstractW3cTagParser = require('./parsers/AbstractW3cTagParser');



const TAG_PARSERS_DIR = path.join(Config.LIB_DIR, 'parser', 'parsers');
const TARGET_SUF      = 'tpl-';

let TAG_PARSERS = {};
let tagList = Utility.fileList(TAG_PARSERS_DIR).filter(filename => {
  return (filename.match(/^abstract/i) ? false : true);
}).map(filename => {
  return Utility.hyphenCase(filename.replace(/Parser\.js$/, ''));
});

tagList.forEach(name => {
  let filename = Utility.pascalCase(name) + 'Parser',
      filepath = path.join(Config.LIB_DIR, 'parser', 'parsers', filename);
  TAG_PARSERS[name] = require(filepath);
});



class TemplateParser {

  static get PARSERS() { return TAG_PARSERS }



  /**
   * constructor
   */
  constructor() {
    let my = this;
  }



  /**
   * parse
   */
  parse(html) {
    let my = this;

    let $ = cheerio.load(html);

    let done = false;
    while(!done) {
      let $tags = $('*').filter(function(i, el) {
        return this.tagName.match(/^tpl-/i);
      });

      if ($tags.length) {
        $tags.each(function() {
          let $el    = $(this),
              name   = this.tagName.replace(/^tpl-/i, ''),
              Parser = TemplateParser.PARSERS[name] || AbstractW3cTagParser;

          $el.after(new Parser($el).$html);
          $el.remove();
        });
      } else {
        done = true;
      }
    }

    return $.html();
  }
}



module.exports = TemplateParser;
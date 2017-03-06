'use strict';



const Config         = require('../Config');
const path           = require('path');
const ect            = require('ect');
const beautify       = require('js-beautify').html_beautify;
const Utility        = require(path.join(Config.LIB_DIR, 'Utility'));
const TemplateParser = require(path.join(Config.LIB_DIR, 'parser', 'TemplateParser'));
const DDSassColors   = require(path.join(Config.LIB_DIR, 'DDSassColors'));
const siteConfig     = require(path.join(Config.CONFIG_DIR, 'site.config'));
const iconConfig     = require(path.join(Config.CONFIG_DIR, 'icon.config'));
const flagConfig     = require(path.join(Config.CONFIG_DIR, 'flag.config'));
const colorTokens    = require(path.join(Config.CONFIG_DIR, 'color.tokens.js'));
const cssConfig      = require(path.join(Config.CONFIG_DIR, 'css.config.js'));



const colors         = new DDSassColors(colorTokens);
const templateParser = new TemplateParser();

const ectRenderer = ect({
  root : Config.ECT_ROOT,
  ext  : '.ect',
  cache: false,
});

module.exports = function path2html(requestPath) {
  const ectPath     = path2ectPath(requestPath),
        categoryMap = path2categoryMap(requestPath),
        titleMap    = [Config.PACKAGE_TITLE],
        breads      = [];

  ['parent', 'child'].forEach(key => {
    if (categoryMap[key]) {
      let label = Utility.pascalCase(Utility.firstUpper(categoryMap[key])).replace(/([A-Z])/g, ' $1').trim(),
          url   = null;

      if (key === 'child') {
        url += `/${categoryMap.parent}/$key/`;
      }

      titleMap.unshift(label);
      breads.push({label: label, url: url});
    }
  });

  let ectData = {
    config        : Config,
    u             : Utility,
    tpl           : cssConfig.suffix,
    cssName       : cssConfig.filename,
    inc           : path.join(Config.ECT_ROOT, '_inculde'),
    siteConfig    : siteConfig,
    parentCategory: categoryMap.parent,
    childCategory : categoryMap.child,
    TemplateParser: TemplateParser,
    colors        : colors,
    icons         : iconConfig,
    flags         : flagConfig,
    title         : titleMap.join(' | '),
    pageTitle     : titleMap[0],
    breads        : breads,
  };

  if (!Utility.isExistFile(ectPath)) {
    // next();
    return false;
  }

  let doc = ectRenderer.render(ectPath, ectData);
  doc = templateParser.parse(doc);
  doc = beautify(doc, {
      "brace_style": "collapse",
      "indent_char": " ",
      "indent_inner_html": false,
      "indent_scripts": "keep",
      "indent_size": 2,
      "max_preserve_newlines": 0,
      "preserve_newlines": true,
      "wrap_line_length": 0,
      "unformatted": [
        // "a",
        // "span",
        // "abbr",
        // "acronym",
        // "address",
        // "b",
        // "br",
        // "bdo",
        // "big",
        // "cite",
        // "code",
        // "del",
        // "dfn",
        // "em",
        // "font",
        // "i",
        // "ins",
        // "kbd",
        // "pre",
        // "q",
        // "s",
        // "samp",
        // "small",
        // "span",
        // "strike",
        // "strong",
        // "sub",
        // "sup",
        // "tt",
        // "u",
        // "var"
      ]
  });
  return doc;
}


function path2categoryMap(requestPath) {
  let tmp = requestPath.replace(/^\//, '').replace(/\/$/, '').split('/');
  return {
    parent: tmp[0] || null,
    child : tmp[1] || null,
  }
}

function path2ectPath(requestPath) {
  let filename = requestPath.match(/([a-zA-Z0-9\-]*?)\.html/);
  let ectPath;
  if (filename) {
    ectPath = path.join(Config.ECT_ROOT, requestPath.replace(`${filename[1]}.html`, `${filename[1]}.ect`));
  } else {
    ectPath = path.join(Config.ECT_ROOT, requestPath, 'index.ect');
  }
  return ectPath;
}

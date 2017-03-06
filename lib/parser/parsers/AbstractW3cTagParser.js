'use strict';



const AbstractTagParser = require('./AbstractTagParser');



const W3C_TAGS = [
  'a',
  'abbr',
  'address',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  'bdi',
  'bdo',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'cite',
  'code',
  'col',
  'colgroup',
  'command',
  'datalist',
  'dd',
  'del',
  'details',
  'dfn',
  'div',
  'dl',
  'dt',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hgroup',
  'hr',
  'html',
  'i',
  'iframe',
  'img',
  'input',
  'ins',
  'kbd',
  'keygen',
  'label',
  'legend',
  'li',
  'link',
  'map',
  'mark',
  'menu',
  'meta',
  'meter',
  'nav',
  'noscript',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'param',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'script',
  'section',
  'select',
  'small',
  'source',
  'span',
  'strong',
  'style',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'track',
  'u',
  'ul',
  'var',
  'video',
  'wbr',
];



const MY_TEMPLATE = `
<{{:tagName}}{{if replaceFrom}} class="{{:tplKey}}{{:replaceFrom}}"{{/if}}>
  {{:content}}
</{{:tagName}}>
`;



class AbstractW3cTagParser extends AbstractTagParser {

  constructor($el, tagName) {
    super($el, MY_TEMPLATE, {
    });

    let my = this;

    my.data.tagName = my.data.tagName || $el.get(0).tagName.replace(/^tpl-/, '');
    if (W3C_TAGS.indexOf(my.data.tagName) === -1) {
      my.data.replaceFrom = my.data.tagName;
      my.data.tagName = 'div';
    }
  }
}



module.exports = AbstractW3cTagParser;
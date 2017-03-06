'use strict';



const AbstractTagParser = require('./AbstractTagParser');



const MY_TEMPLATE = `
<{{:tagName}} class="{{:tplKey}}fa {{:tplKey}}fa-{{:tplIcon}}">{{:content}}</{{:tagName}}>
`;



class PlainIconParser extends AbstractTagParser {




  /**
   * constructor
   */
  constructor($el) {

    super($el, MY_TEMPLATE, {
      tmplAttributes   : ['icon'],
      // defaultAttributes: ['href', 'nohref', 'value', 'type'],
    });

    let my = this;

    my.data.tagName = my.data.tagName || 'span';
  }
}



module.exports = PlainIconParser;
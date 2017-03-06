'use strict';



const AbstractTagParser = require('./AbstractTagParser');



const MY_TEMPLATE = `
<{{:tagName}} class="{{:tplKey}}card__header {{:tplKey}}grid {{:tplKey}}grid--align-spread">
  {{:content}}
</{{:tagName}}>
`;



class CardHeaderParser extends AbstractTagParser {



  /**
   * constructor
   */
  constructor($el) {

    super($el, MY_TEMPLATE, {
      // tmplAttributes   : ['responsive'],
      // defaultAttributes: ['href', 'src', 'alt'],
      // defaults         : {
      //   type: 'button',
      // },
    });

    let my = this;

    my.data.tagName = my.data.tagName || 'div';
  }
}



module.exports = CardHeaderParser;
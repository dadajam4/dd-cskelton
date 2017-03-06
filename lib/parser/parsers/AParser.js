'use strict';



const AbstractTagParser = require('./AbstractTagParser');



const MY_TEMPLATE = `
<{{:tagName}} href="{{:href}}">
  {{:content}}
</{{:tagName}}>
`;



class AParser extends AbstractTagParser {



  /**
   * constructor
   */
  constructor($el) {

    super($el, MY_TEMPLATE, {
      // tmplAttributes   : ['narrow'],
      defaultAttributes: ['href'],
      defaults         : {
        href: 'javascript:void(0);',
      },
    });

    let my = this;

    my.data.tagName = my.data.tagName || 'a';
  }
}



module.exports = AParser;
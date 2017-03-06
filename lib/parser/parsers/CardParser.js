'use strict';



const AbstractTagParser = require('./AbstractTagParser');



const MY_TEMPLATE = `
<{{:tagName}} class="{{:tplKey}}card{{if isNarrow}} {{:tplKey}}card--narrow{{/if}}">
  {{:content}}
</{{:tagName}}>
`;



class CardParser extends AbstractTagParser {



  /**
   * constructor
   */
  constructor($el) {

    super($el, MY_TEMPLATE, {
      tmplAttributes   : ['narrow'],
      // defaultAttributes: ['href', 'src', 'alt'],
      // defaults         : {
      //   type: 'button',
      // },
    });

    let my = this;

    my.data.tagName  = my.data.tagName || 'article';
    my.data.isNarrow = my.data.tplNarrow === 'true';
  }
}



module.exports = CardParser;
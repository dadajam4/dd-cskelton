'use strict';



const AbstractTagParser = require('./AbstractTagParser');



const MY_TEMPLATE = `
<{{:tagName}} class="{{:tplKey}}card__body">
  {{if hasInner}}
  <div class="{{:tplKey}}card__body--inner">
  {{/if}}
  {{:content}}
  {{if hasInner}}
  </div>
  {{/if}}
</{{:tagName}}>
`;



class CardBodyParser extends AbstractTagParser {



  /**
   * constructor
   */
  constructor($el) {

    super($el, MY_TEMPLATE, {
      tmplAttributes   : ['inner'],
      // defaultAttributes: ['href', 'src', 'alt'],
      // defaults         : {
      //   type: 'button',
      // },
    });

    let my = this;

    my.data.tagName  = my.data.tagName || 'div';
    my.data.hasInner = my.data.tplInner === 'true';
  }
}



module.exports = CardBodyParser;
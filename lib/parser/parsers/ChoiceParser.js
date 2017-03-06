'use strict';



const AbstractTagParser = require('./AbstractTagParser');



const MY_TEMPLATE = `
<{{:tagName}} class="{{:tplKey}}choice">
  <input type="{{:type}}" name="{{:name}}" value="{{:value}}">
  <span class="{{:tplKey}}choice__faux"></span>
  {{:content}}
</{{:tagName}}>
`;



class ChoiceParser extends AbstractTagParser {



  /**
   * constructor
   */
  constructor($el) {
    super($el, MY_TEMPLATE, {
      // tmplAttributes   : ['outline', 'size'],
      defaultAttributes: ['type', 'name', 'value'],
      // defaults         : {
      //   type: 'button',
      // },
    });

    let my = this;

    my.data.tagName = my.data.tagName || 'label';
    my.$el.removeAttr('type');
    my.$el.removeAttr('name');
  }
}



module.exports = ChoiceParser;
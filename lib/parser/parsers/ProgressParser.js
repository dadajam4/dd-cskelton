'use strict';



const AbstractTagParser = require('./AbstractTagParser');



const MY_TEMPLATE = `
<{{:tagName}}
  class="{{:tplKey}}progress{{if tplType !== 'base'}} {{:tplKey}}progress--{{:tplType}}{{/if}}"
  data-value="{{:value}}"
  data-max="{{:max}}"
  data-percent="{{:percent}}"
></{{:tagName}}>
`;

class ProgressParser extends AbstractTagParser {

  constructor($el) {

    super($el, MY_TEMPLATE, {
      // tmplAttributes   : ['outline', 'size'],
      defaultAttributes: ['value', 'max'],
      defaults         : {
        value: 0,
        max  : 100,
      },
    });

    let my = this;

    my.data.tagName = my.data.tagName || 'div';
    my.data.percent = my.data.value / my.data.max * 100;

    my.refetchContent();
  }
}



module.exports = ProgressParser;
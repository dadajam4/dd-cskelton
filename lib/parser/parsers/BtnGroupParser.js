'use strict';



const AbstractTagParser = require('./AbstractTagParser');



const MY_TEMPLATE = `
<{{:tagName}}
  class="{{:tplKey}}btn-group{{if tplType !== 'base'}} {{:tplKey}}btn-group--{{:tplType}}{{/if}}{{if tplOutline}} {{:tplKey}}btn-group--outline{{/if}}{{if tplSize}} {{:tplKey}}btn-group--{{:tplSize}}{{/if}}{{if disabled}} is-disabled{{/if}}"
>
  {{:content}}
</{{:tagName}}>
`;

class BtnGroupParser extends AbstractTagParser {

  constructor($el) {

    super($el, MY_TEMPLATE, {
      tmplAttributes   : ['outline', 'size'],
    });

    let my = this;

    my.data.tagName = my.data.tagName || 'div';
  }
}



module.exports = BtnGroupParser;
'use strict';



const AbstractTagParser = require('./AbstractTagParser');



const MY_TEMPLATE = `
<{{:tagName}}
  class="{{:tplKey}}btn{{if tplType !== 'base'}} {{:tplKey}}btn--{{:tplType}}{{/if}}{{if tplOutline}} {{:tplKey}}btn--outline{{/if}}{{if tplSize}} {{:tplKey}}btn--{{:tplSize}}{{/if}}{{if tplIcon}} {{:tplKey}}btn--icon{{/if}}"
  {{if isAnchor && href}}href="{{:href}}"{{/if}}
  {{if isAnchor && nohref}}nohref="{{:nohref}}"{{/if}}
  {{if isButton && type}}type="{{:type}}"{{/if}}
  {{if isButton && value}}type="{{:value}}"{{/if}}
  {{if disabled}}disabled{{/if}}
>
  {{:content}}
</{{:tagName}}>
`;

class BtnParser extends AbstractTagParser {

  constructor($el) {

    super($el, MY_TEMPLATE, {
      tmplAttributes   : ['outline', 'size', 'icon'],
      defaultAttributes: ['href', 'nohref', 'value', 'type'],
      defaults         : {
        type: 'button',
      },
    });

    let my = this;

    if (!my.data.tagName) {
      my.data.tagName  = my.data.href || my.data.nohref ? 'a' : 'button';
    }

    my.data.isButton = my.data.tagName === 'button';
    my.data.isAnchor = my.data.tagName === 'a';
  }
}



module.exports = BtnParser;
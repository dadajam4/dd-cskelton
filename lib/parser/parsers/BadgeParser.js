'use strict';



const AbstractTagParser = require('./AbstractTagParser');



const MY_TEMPLATE = `
<{{:tagName}}
  class="{{:tplKey}}badge{{if tplType !== 'base'}} {{:tplKey}}badge--{{:tplType}}{{/if}}{{if tplCircle}} {{:tplKey}}icon--circle{{/if}}{{if tplOutline}} {{:tplKey}}badge--outline{{/if}}{{if tplSize}} {{:tplKey}}badge--{{:tplSize}}{{/if}}"
  {{if isAnchor && href}}href="{{:href}}"{{/if}}
  {{if isAnchor && nohref}}nohref="{{:nohref}}"{{/if}}
  {{if isButton && type}}type="{{:type}}"{{/if}}
  {{if isButton && value}}type="{{:value}}"{{/if}}
  {{if disabled}}disabled{{/if}}
>
  {{:content}}
</{{:tagName}}>
`;

class BadgeParser extends AbstractTagParser {

  constructor($el) {

    super($el, MY_TEMPLATE, {
      tmplAttributes   : ['outline', 'size'],
      defaultAttributes: ['href', 'nohref', 'value', 'type'],
    });

    let my = this;

    if (!my.data.tagName) {
      my.data.tagName = 'span';
      my.data.tagName = my.data.href || my.data.nohref ? 'a' : my.data.tagName;
      my.data.tagName = my.data.type ? 'button' : my.data.tagName;
    }

    my.data.isButton    = my.data.tagName === 'button';
    my.data.isAnchor    = my.data.tagName === 'a';
    my.data.isClickable = my.data.isButton || my.data.isAnchor;
  }
}



module.exports = BadgeParser;
'use strict';



const AbstractTagParser = require('./AbstractTagParser');



const MY_TEMPLATE = `
<{{:tagName}}
  class="{{:tplKey}}icon{{if tplType !== 'base'}} {{:tplKey}}icon--{{:tplType}}{{/if}}{{if tplCircle}} {{:tplKey}}icon--circle{{/if}}{{if tplOutline}} {{:tplKey}}icon--outline{{/if}}{{if tplSize}} {{:tplKey}}icon--{{:tplSize}}{{/if}}"
  {{if isAnchor && href}}href="{{:href}}"{{/if}}
  {{if isAnchor && nohref}}nohref="{{:nohref}}"{{/if}}
  {{if isButton && type}}type="{{:type}}"{{/if}}
  {{if isButton && value}}type="{{:value}}"{{/if}}
  {{if disabled}}disabled{{/if}}
>
  <tpl-plain-icon tpl-icon="{{:tplIcon}}"></tpl-plain-icon>
</{{:tagName}}>
`;

const MY_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'];



class IconParser extends AbstractTagParser {

  static get TEMPLATE() { return MY_TEMPLATE }
  static get SIZES() { return MY_SIZES }



  /**
   * constructor
   */
  constructor($el) {

    super($el, MY_TEMPLATE, {
      tmplAttributes   : ['outline', 'size', 'icon', 'circle'],
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



module.exports = IconParser;
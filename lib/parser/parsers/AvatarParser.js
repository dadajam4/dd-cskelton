'use strict';



const AbstractTagParser = require('./AbstractTagParser');



const MY_TEMPLATE = `
<{{:tagName}}
  class="{{:tplKey}}avatar{{if tplSize}} {{:tplKey}}avatar--{{:tplSize}}{{/if}}{{if isEmpty}} {{:tplKey}}avatar--empty{{/if}}{{if tplCircle}} {{:tplKey}}avatar--circle{{/if}}"
>
  <img src="{{:src}}" alt="{{:alt}}">
</{{:tagName}}>
`;

const MY_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'];



class AvatarParser extends AbstractTagParser {

  static get SIZES() { return MY_SIZES }



  /**
   * constructor
   */
  constructor($el) {

    super($el, MY_TEMPLATE, {
      tmplAttributes   : ['size', 'empty', 'circle'],
      defaultAttributes: ['href', 'src', 'alt'],
      // defaults         : {
      //   type: 'button',
      // },
    });

    let my = this;

    my.data.isAnchor = my.data.href ? true : false;
    my.data.tagName  = my.data.tagName || my.data.isAnchor ? 'a' : 'span';
    my.data.isEmpty  = my.data.tplEmpty;
  }
}



module.exports = AvatarParser;
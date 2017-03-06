'use strict';



const AbstractTagParser = require('./AbstractTagParser');



const MY_TEMPLATE = `
<{{:tagName}} class="{{:tplKey}}media{{if isResponsive}} {{:tplKey}}media--responsive{{/if}}">
  {{:content}}
</{{:tagName}}>
`;



class MediaParser extends AbstractTagParser {



  /**
   * constructor
   */
  constructor($el) {

    super($el, MY_TEMPLATE, {
      tmplAttributes   : ['responsive'],
      // defaultAttributes: ['href', 'src', 'alt'],
      // defaults         : {
      //   type: 'button',
      // },
    });

    let my = this;

    my.data.tagName      = my.data.tagName || 'div';
    my.data.isResponsive = my.data.tplResponsive;
  }
}



module.exports = MediaParser;
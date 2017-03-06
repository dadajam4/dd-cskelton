'use strict';



const AbstractTagParser = require('./AbstractTagParser');



const MY_TEMPLATE = `
<{{:tagName}} class="{{:tplKey}}h-section">
  <span class="{{:tplKey}}inner">
    {{:content}}
  </span>
</{{:tagName}}>
`;

class SectionHeaderParser extends AbstractTagParser {

  constructor($el) {

    super($el, MY_TEMPLATE, {
    });

    let my = this;

    my.data.tagName = my.data.tagName || 'h2';
  }
}



module.exports = SectionHeaderParser;
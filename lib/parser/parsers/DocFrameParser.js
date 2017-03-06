'use strict';



const AbstractTagParser = require('./AbstractTagParser');



let incrementForId = 0;

const DOC_HEIGHTS = {
  sm: 150,
  md: 300,
  lg: 532,
};


const MY_TEMPLATE = `
<{{:tagName}} class="{{:tplKey}}doc-frame">

  {{if responsive}}
  <tpl-form-element class="m-b--md" tpl-type="radio" tpl-name="{{:choiceName}}" tpl-alternate="primary" tpl-size="sm" tpl-outline="true">
    <data-label>!null</data-label>
    {{for responsive}}
      <data-item value="{{:key}}"{{if current}} checked="true"{{/if}}>{{:key}}: {{:size}}px</data-item>
    {{/for}}
  </tpl-form-element>
  {{/if}}

  <div class="{{:tplKey}}doc-frame__container">
    <iframe src="{{:tplSrc}}" frameborder="0"{{if docsize}} width="{{:docsize}}" style="width: {{:docsize}}px;"{{else}} style="width: 100%;"{{/if}} height="{{:height}}"></iframe>
  </div>
</{{:tagName}}>
`;



const MY_TYPES = ['horizontal', 'stacked'];



class DocFrameParser extends AbstractTagParser {



  /**
   * constructor
   */
  constructor($el) {
    super($el, MY_TEMPLATE, {
      tmplAttributes   : ['responsive', 'docsize', 'docheight', 'src'],
      // defaultAttributes: ['src'],
    });

    let my = this;

    my.data.tagName       = my.data.tagName || 'div';
    my.data.choiceName    = 'doc-frame-choice-' + (++incrementForId);
    try {
      my.data.tplDocheight = eval(my.data.tplDocheight) || 'md';
    } catch(e) {}
    my.data.height = DOC_HEIGHTS[my.data.tplDocheight] || DOC_HEIGHTS.md;

    let mqDefine = [];
    for (let key in my.cssConfig.mediaQueryDefine) {
      mqDefine.push({key: key, size: my.cssConfig.mediaQueryDefine[key]});
    }

    try {
      my.data.tplResponsive = eval(my.data.tplResponsive);
    } catch(e) {
      my.data.tplResponsive = my.data.tplResponsive;
    }
    my.data.responsive = my.data.tplResponsive === undefined ? true : my.data.tplResponsive;

    if (my.data.responsive) {
      if (typeof my.data.responsive !== 'string') {
        my.data.responsive = mqDefine;
      } else {
        my.data.responsive = [];
        let keys = my.data.tplResponsive.replace(/\s/g, '').split(',');
        keys.forEach(key => {
          my.data.responsive.push({key: key, size: my.cssConfig.mediaQueryDefine[key]});
        });
      }

      let finded = false;
      my.data.responsive.forEach(define => {
        if (my.data.tplDocsize === define.key) {
          define.current = true;
          finded = true;
          my.data.docsize = define.size;
        }
      });

      if (!finded) {
        my.data.responsive[my.data.responsive.length - 1].current = true;
        my.data.docsize = my.data.responsive[my.data.responsive.length - 1].size;
      }
    } else {

    }
  }
}



module.exports = DocFrameParser;
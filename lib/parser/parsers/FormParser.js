'use strict';



const AbstractTagParser = require('./AbstractTagParser');



const MY_TEMPLATE = `
<{{:tagName}} class="{{:tplKey}}form{{:typePos}}">
  {{if label}}
  <{{:labelTagName}} class="{{:tplKey}}form-element__label {{:tplKey}}text-title--caps">{{:label}}</{{:labelTagName}}>
  {{/if}}
  {{if isCompound}}
  <div class="{{:tplKey}}form-element__group">
    {{for rows}}
    <div class="{{:~root.tplKey}}form-element__row">
      {{:#data}}
    </div>
    {{/for}}
  {{/if}}
  {{:content}}
  {{if isCompound}}
  </div>
  {{/if}}
</{{:tagName}}>
`;

const MY_TYPES = ['horizontal', 'stacked'];



class FormParser extends AbstractTagParser {

  static get TYPES() { return MY_TYPES }



  /**
   * constructor
   */
  constructor($el) {

    super($el, MY_TEMPLATE, {
      tmplAttributes   : ['outline', 'size'],
      defaultAttributes: ['href', 'nohref', 'value', 'type'],
    });

    let my = this;
    const $ = AbstractTagParser.$;

    my.data.isCompound   = my.data.tplType === 'compound';

    if (!my.data.tagName) {
      my.data.tagName = my.data.isCompound  ? 'fieldset' : 'div';
    }

    my.data.labelTagName = my.data.tagName === 'fieldset' ? 'legend' : 'div';
    my.data.typePos      = my.data.tplType === 'base' ? '' : '--' + my.data.tplType;
    my.data.rows         = [];

    let $label = my.$el.children('data-label');
    my.data.label = $label.get(0) ? $label.html() : null;
    $label.remove();

    let $rows = my.$el.children('data-row');

    $rows.each(function() {
      let $row = $(this);
      my.data.rows.push($row.html());
      $row.remove();
    });

    my.refetchContent();
  }
}



module.exports = FormParser;
'use strict';



export default class Select {
  constructor() {}

  init() {
    let my = this;

    demo.$d.on('change', '[name="demo-select-all"]', function() {
      var $children  = $(this).closest('table').find('[name="demo-select"]'),
          allChecked = $children.length === $children.filter(function() { return $(this).prop('checked') }).length;

      $children.prop('checked', !allChecked).trigger('change');
    });

    demo.$d.on('change', '[name="demo-select"]', function() {
      if ($(this).prop('checked')) {
        $(this).closest('tr').addClass(`${demo.tplKey}is-selected`);
      } else {
        $(this).closest('tr').removeClass(`${demo.tplKey}is-selected`);
      }
    });
  }
}
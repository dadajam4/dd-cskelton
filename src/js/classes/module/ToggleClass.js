'use strict';



export default class ToggleClass {
  constructor() {}

  init() {
    let my = this;

    // demoToggleClass
    demo.$d.on('change', '.demo-toggle-class', function() {
      demoToggleClass($(this));
    });

    demoToggleClass($('.demo-toggle-class'));
    function demoToggleClass($els) {
      $els.each(function() {
        var $el       = $(this),
            $target   = $($el.data('target')),
            className = $el.val(),
            checked   = $el.prop('checked');

        if (checked) {
          $target.addClass(className);
        } else {
          $target.removeClass(className);
        }
      });
    }
  }
}
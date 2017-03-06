'use strict';



export default class ChangeClass {
  constructor() {}

  init() {
    let my = this;

    // demoChangeClass
    demo.$d.on('change', '.demo-change-class', function() {
      var $els = $('[name="' + $(this).prop('name') + '"]');
      demoChangeClass($els);
    });

    demoChangeClass($('.demo-change-class'));
    function demoChangeClass($els) {
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
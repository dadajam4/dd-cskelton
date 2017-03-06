'use strict';



export default class Tab {
  constructor() {}

  init() {
    let my = this;

    demo.$d.on('click', `.${demo.tplKey}demo-tab__link`, function() {
      let $trigger = $(this);

      my.set($(this));
    });

    let $tabs = $(`.${demo.tplKey}demo-tab`);
    $tabs.each(function() {
      let $context  = $(this),
          $triggers = $context.find(`.${demo.tplKey}demo-tab__link`),
          $active   = null;

      $triggers.each(function() {
        let $trigger = $(this);

        if ($trigger.parent().hasClass(`${demo.tplKey}is-active`)) {
          $active = $trigger;
        }
      });

      if (!$active) {
        $active = $triggers.eq(0);
      }

      my.set($active);
    });
  }

  set($trigger) {
    let my = this;

    let $context  = $trigger.closest(`.${demo.tplKey}demo-tab`),
        $triggers = $context.find(`.${demo.tplKey}demo-tab__link`),
        $contents = $context.find(`.${demo.tplKey}demo-tab__content`),
        $target   = $context.find('#' + $trigger.attr('aria-controls'));

    $triggers.each(function() {
      $(this).parent().removeClass(`${demo.tplKey}is-active`);
    });
    $trigger.parent().addClass(`${demo.tplKey}is-active`);
    $contents.removeClass(`${demo.tplKey}is-show`);
    $target.addClass(`${demo.tplKey}is-show`);
  }
}
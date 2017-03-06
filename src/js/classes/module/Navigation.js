'use strict';



const DURATION = 400;
const EASING   = 'easeOutCubic';



export default class Navigation {
  constructor() {}

  init() {
    let my = this;

    // menu
    demo.$d.on('click', `.${demo.tplKey}navbar__trigger`, function() {
      let $trigger = $(this),
          $context = $trigger.closest(`.${demo.tplKey}navbar`),
          $main    = $context.find(`.${demo.tplKey}navbar__main`);

      if ($context.hasClass(`${demo.tplKey}is-animated`)) {
        return;
      }

      $context.addClass(`${demo.tplKey}is-animated`);

      if ($context.hasClass(`${demo.tplKey}is-open`)) {
        hide();
      } else {
        show();
      }

      function show() {
        $trigger.addClass(`${demo.tplKey}is-active`);
        $context.addClass(`${demo.tplKey}is-open`);
        $main.velocity('stop').velocity('slideDown', {
          duration: DURATION,
          easing  : EASING,
          complete: function() {
            $context.removeClass(`${demo.tplKey}is-animated`);
            $main.removeAttr('style').addClass(`${demo.tplKey}is-open`);
          }
        });
      }

      function hide() {
        $trigger.removeClass(`${demo.tplKey}is-active`);
        $context.removeClass(`${demo.tplKey}is-open`);
        $main.velocity('stop').velocity('slideUp', {
          duration: DURATION,
          easing  : EASING,
          complete: function() {
            $context.removeClass(`${demo.tplKey}is-animated`);
            $main.removeAttr('style').removeClass(`${demo.tplKey}is-open`);
          }
        });
      }
    });



    //
    // list
    //
    demo.$d.on('click', `.${demo.tplKey}navbar__list-trigger`, function() {
      let $trigger = $(this),
          $list    = $trigger.next(`.${demo.tplKey}navbar__list`);

      if ($list.hasClass(`${demo.tplKey}is-animated`)) {
        return;
      }
      $list.addClass(`${demo.tplKey}is-animated`);

      if ($list.hasClass(`${demo.tplKey}is-open`)) {
        hide();
      } else {
        show();
      }

      function show() {
        $trigger.addClass(`${demo.tplKey}is-active`);
        $list.velocity('stop').velocity('slideDown', {
          duration: DURATION,
          easing  : EASING,
          complete: function() {
            $list.removeClass(`${demo.tplKey}is-animated`);
            $list.removeAttr('style').addClass(`${demo.tplKey}is-open`);
          }
        });
      }

      function hide() {
        $trigger.removeClass(`${demo.tplKey}is-active`);
        $list.velocity('stop').velocity('slideUp', {
          duration: DURATION,
          easing  : EASING,
          complete: function() {
            $list.removeClass(`${demo.tplKey}is-animated`);
            $list.removeAttr('style').removeClass(`${demo.tplKey}is-open`);
          }
        });
      }

      // $trigger.toggleClass(`${demo.tplKey}is-active`);
    });
  }
}
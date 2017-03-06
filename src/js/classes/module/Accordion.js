'use strict';



const DURATION = 400;
const EASING   = 'swing';



export default class Accordion {
  constructor() {}

  init() {
    let my = this;

    $(`.${demo.tplKey}accordion`).each(function() {
      let $context       = $(this),
          $activeTrigger = $context.children(`.${demo.tplKey}accordion__title.${demo.tplKey}is-active`),
          $activeContent = $context.children(`.${demo.tplKey}accordion__content.${demo.tplKey}is-active`);

      $activeContent.addClass(`${demo.tplKey}is-active`).show().css({opacity: 1});
    });

    demo.$d.on('click', `.${demo.tplKey}accordion__title`, function() {
      let $trigger       = $(this),
          $content       = $trigger.next(),
          $context       = $trigger.closest(`.${demo.tplKey}accordion`),
          $activeTrigger = $context.children(`.${demo.tplKey}accordion__title.${demo.tplKey}is-active`),
          $activeContent = $context.children(`.${demo.tplKey}accordion__content.${demo.tplKey}is-active`);

      if ($trigger.hasClass(`${demo.tplKey}is-active`)) {
        $trigger.stop().removeClass(`${demo.tplKey}is-active`);
        $content.stop().removeClass(`${demo.tplKey}is-active`).animate({height: 'hide', opacity: 0}, DURATION, EASING, () => {
          $content.removeAttr('height');
          $content.removeAttr('opacity');
        });
        return false;
      }

      $trigger.stop().addClass(`${demo.tplKey}is-active`);
      $content.stop().addClass(`${demo.tplKey}is-active`).animate({height: 'show', opacity: 1}, DURATION, EASING, () => {
        $content.removeAttr('height');
        $content.removeAttr('opacity');
      });

      $activeTrigger.stop().removeClass(`${demo.tplKey}is-active`);
      $activeContent.stop().removeClass(`${demo.tplKey}is-active`).animate({height: 'hide', opacity: 0}, DURATION, EASING, () => {
        $content.removeAttr('height');
        $content.removeAttr('opacity');
      });

      return false;
    });
  }
}
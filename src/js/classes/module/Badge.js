'use strict';



export default class Badge {
  constructor() {}

  init() {
    let my = this;

    demo.$d.on('click', `.${demo.tplKey}badge__close`, function() {
      let $close = $(this),
          $badge = $close.closest(`.${demo.tplKey}badge`);

      $badge.remove();
      return false;
    });
  }
}
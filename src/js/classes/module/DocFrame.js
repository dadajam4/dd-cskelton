'use strict';



export default class DocFrame {
  constructor() {}

  init() {
    let my = this;

    demo.$d.on('change', `.${demo.tplKey}doc-frame input`, function() {
      my.update($(this));
    });
  }

  update($el) {
    let my = this;

    let $context = $el.closest(`.${demo.tplKey}doc-frame`),
        $iframe  = $context.find('iframe'),
        key      = $el.val(),
        width    = demo.cssConfig.mediaQueryDefine[key];

    $iframe.prop({width: width}).css({width: width});
  }
}
'use strict';



export default class Editable {
  constructor() {}

  init() {
    let my = this;

    demo.$d.on('keydown', `.${demo.tplKey}editable__tag-input`, function(e) {
      let $input = $(this);

      $input.data(`${demo.tplKey}before-key-code`, e.which);
    }).on('keyup change', `.${demo.tplKey}editable__tag-input`, function(e) {
      let $input = $(this),
          value  = $input.val(),
          $clone = $(`<span style="padding: 0!important; margin: 0!important; display: inline-block!important;">${value}</span>`);

      $input.after($clone);
      let width = $clone.width() + 16;
      $clone.remove();

      width = width > 25 ? width : 25;
      $input.css('width', width);

      if ($input.data(`${demo.tplKey}before-value`) === '' && (e.keyCode === 8 || e.keyCode === 46)) {
        $input.prev().remove();
      }

      if (e.keyCode === 13 && $input.data(`${demo.tplKey}before-key-code`) === e.which) {
        if (value.trim() !== '') {
          let $tag = `
            <button class="${demo.tplKey}badge ${demo.tplKey}badge--neutral" type="button">
              ${value.trim()}
              <i class="${demo.tplKey}badge__close ${demo.tplKey}icon--close">
              </i>
            </button>
          `;
          $input.before($tag);
          $input.val('');
        }
      }

      $input.data(`${demo.tplKey}before-value`, $input.val());
    }).on('focus', `.${demo.tplKey}editable__tag-input`, function() {
      let $input   = $(this),
          $context = $input.closest(`.${demo.tplKey}editable`);

      $input.data(`${demo.tplKey}before-value`, $input.val());
      $context.addClass(`${demo.tplKey}is-focus`);
    }).on('blur', `.${demo.tplKey}editable__tag-input`, function() {
      let $input   = $(this),
          $context = $input.closest(`.${demo.tplKey}editable`);

      $context.removeClass(`${demo.tplKey}is-focus`);
    });
    demo.$b.find(`.${demo.tplKey}editable__tag-input`).change();

    demo.$d.on('click', `.${demo.tplKey}editable.${demo.tplKey}has-tag-input`, function() {
      let $box   = $(this),
          $input = $box.find(`.${demo.tplKey}editable__tag-input`);

      $input.focus();
    });
  }
}
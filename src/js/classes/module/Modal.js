'use strict';


const BACK_DROP = `
<div class="{{:tplKey}}backdrop"></div>
`;



export default class Modal {
  constructor() {
    this.current = null;
  }

  init() {
    let my = this;

    my.$backdrop = $(BACK_DROP.replace(/\{\{:tplKey\}\}/g, demo.tplKey));
    demo.$b.append(my.$backdrop);

    demo.$d.on('click', `.${demo.tplKey}demo-modal-trigger`, function() {
      let $trigger = $(this),
          $target  = $($trigger.data('target'));

      my.show($target);
    });

    demo.$d.on('click', `.${demo.tplKey}modal__close`, function() {
      my.hide();
    });

    my.$backdrop.on('click', function() {
      my.hide();
    });
  }

  show($target) {
    let my = this;

    if (!$target.get(0)) {
      return;
    }

    demo.$b.addClass(`${demo.tplKey}is-modal-open`);
    my.current = $target;
    $target.addClass(`${demo.tplKey}fade-in-open`);
    my.$backdrop.addClass(`${demo.tplKey}backdrop--open`);
  }

  hide() {
    let my = this;

    demo.$b.removeClass(`${demo.tplKey}is-modal-open`);
    my.$backdrop.removeClass(`${demo.tplKey}backdrop--open`);

    if (!my.current) {
      return;
    }

    my.current.removeClass(`${demo.tplKey}fade-in-open`);
    my.current = null;
  }
}
'use strict';



const MESSAGE_HIDE_DURATION = 400;
const TOAST_SHOW_DURATION   = 400;
const TOAST_HIDE_DURATION   = 1000;
const TOAST_INTERVAL        = 3000;



export default class Message {
  constructor() {}

  init() {
    let my = this;

    // message
    demo.$d.on('click', `.${demo.tplKey}message__close`, function() {
      let $el = $(this).closest(`.${demo.tplKey}message`);
      $el.fadeOut(MESSAGE_HIDE_DURATION, () => {
        $el.remove();
      });
    });

    // alert
    demo.$d.on('click', `.${demo.tplKey}demo-alert`, function() {
      let $target = $($(this).data('demo-alert-target'));
      if (!$target.get(0)) {
        return;
      }
      my.showAlert($target);
    });

    // toast
    my.toastContainer = {};
    ['top-left', 'top-right', 'bottom-left', 'bottom-right'].forEach(pos => {
      my.toastContainer[pos] = $(`<div class="${demo.tplKey}toast-container ${demo.tplKey}toast-container--${pos}"></div>`);
      demo.$b.append(my.toastContainer[pos]);
    });

    demo.$d.on('click', `.${demo.tplKey}demo-toast`, function() {
      let $trigger = $(this);
      let $target = $($trigger.data('demo-toast-target'));
      if (!$target.get(0)) {
        return;
      }
      my.showToast($target, $trigger.data('demo-toast-position'));
    });
  }

  showAlert($el) {
    let my = this;

    let $clone = $el.clone();

    demo.$b.append($clone);
    $clone.addClass(`${demo.tplKey}is-show`);
    $clone.animate({opacity: 1}, TOAST_SHOW_DURATION, 'linear', () => {
      setTimeout(() => {
        $clone.animate({opacity: 0}, TOAST_HIDE_DURATION, 'linear', () => {
          $clone.remove();
        });
      }, TOAST_INTERVAL);
    });
  }

  showToast($el, pos = 'top-right') {
    let my = this;

    let $clone = $el.clone();

    my.toastContainer[pos].append($clone);
    $clone.addClass(`${demo.tplKey}is-show`);
    $clone.animate({opacity: 1}, TOAST_SHOW_DURATION, 'linear', () => {
      setTimeout(() => {
        $clone.animate({opacity: 0}, TOAST_HIDE_DURATION, 'linear', () => {
          $clone.remove();
        });
      }, TOAST_INTERVAL);
    });
  }
}
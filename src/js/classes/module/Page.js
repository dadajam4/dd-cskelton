'use strict';



export default class Site {
  constructor() {}

  init() {
    let my = this;

    $(`.${demo.tplKey}page-menu__trigger`).on('click', function() {
      $(`.${demo.tplKey}page`).toggleClass(`${demo.tplKey}is-navigation-open`);
    });

    $(`.${demo.tplKey}page-navi__item`).on('click', function() {
      $(this).toggleClass(`${demo.tplKey}is-active`);
    });
  }
}
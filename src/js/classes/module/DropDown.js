'use strict';



export default class DropDown {
  constructor() {}

  init() {
    let my = this;

    demo.$d.on('click', `.${demo.tplKey}demo-dropdown-trigger`, function() {
      $(this).toggleClass(`${demo.tplKey}is-open`);
    });
  }
}
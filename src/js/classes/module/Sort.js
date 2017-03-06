'use strict';



export default class Sort {
  constructor() {}

  init() {
    let my = this;

    demo.$d.on('click', `.${demo.tplKey}th__action`, function() {
      $(this).toggleClass(`${demo.tplKey}is-sorted--asc`);
    });
  }
}
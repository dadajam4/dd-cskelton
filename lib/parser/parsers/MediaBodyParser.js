'use strict';



const AbstractTagParser = require('./AbstractTagParser');



const MY_TEMPLATE = `
<{{:tagName}} class="{{:tplKey}}media__body">
  {{:content}}
</{{:tagName}}>
`;



class MediaBodyParser extends AbstractTagParser {



  /**
   * constructor
   */
  constructor($el) {

    super($el, MY_TEMPLATE, {
      // tmplAttributes   : ['responsive'],
      // defaultAttributes: ['href', 'src', 'alt'],
      // defaults         : {
      //   type: 'button',
      // },
    });

    let my = this;

    my.data.tagName = my.data.tagName || 'div';
    // my.data.isResponsive = my.data.tplResponsive;

    // let $figure = my.$el.children('figure'),
    //     $body   = my.$el.children('body');

    // my.data.figure = $figure.html();
    // my.data.body   = $body.html();

    // $figure.remove();
    // $body.remove();

    my.refetchContent();
  }
}



module.exports = MediaBodyParser;
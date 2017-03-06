'use strict';



import cssConfig   from 'css.config';
import Page        from 'classes/module/Page';
import Accordion   from 'classes/module/Accordion';
import Badge       from 'classes/module/Badge';
import Editable    from 'classes/module/Editable';
import Message     from 'classes/module/Message';
import ChangeClass from 'classes/module/ChangeClass';
import ToggleClass from 'classes/module/ToggleClass';
import Select      from 'classes/module/Select';
import Tab         from 'classes/module/Tab';
import Modal       from 'classes/module/Modal';
import Sort        from 'classes/module/Sort';
import DropDown    from 'classes/module/DropDown';
import DocFrame    from 'classes/module/DocFrame';
import Navigation  from 'classes/module/Navigation';
import Range       from 'classes/module/Range';



export default class Demo {
  cssConfig = cssConfig;
  tplKey    = cssConfig.suffix;
  $w        = $(window);
  $d        = $(document);

  constructor() {
    let my = this;

    window.demo = my;

    my.page = new Page();
    my.message = new Message();
    my.accordion = new Accordion();
    my.badge = new Badge();
    my.editable = new Editable();
    my.changeClass = new ChangeClass();
    my.toggleClass = new ToggleClass();
    my.select = new Select();
    my.tab = new Tab();
    my.modal = new Modal();
    my.sort = new Sort();
    my.dropDown = new DropDown();
    my.docFrame = new DocFrame();
    my.navigation = new Navigation();
    my.range = new Range();
  }

  init() {
    let my = this;

    my.$b = $('body');

    my.page.init();
    my.accordion.init();
    my.badge.init();
    my.editable.init();
    my.message.init();
    my.changeClass.init();
    my.toggleClass.init();
    my.select.init();
    my.tab.init();
    my.modal.init();
    my.sort.init();
    my.dropDown.init();
    my.docFrame.init();
    my.navigation.init();
    my.range.init();
  }
}
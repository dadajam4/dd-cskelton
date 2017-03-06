'use strict';



const AbstractTagParser = require('./AbstractTagParser');



const MY_TEMPLATE = `
<{{:tagName}}
  class="{{:tplKey}}form-element{{if tplSize}} {{:tplKey}}form-element--{{:tplSize}}{{/if}}"
>

  {{if label && label !== '!null' }}
  {{if isSingle && !isToggle}}
  <label class="{{:tplKey}}form-element__label" for="{{:indexName}}">{{:label}}</label>
  {{else}}
  <div class="{{:tplKey}}form-element__label">{{:label}}</div>
  {{/if}}
  {{else label !== '!null' }}
  <div class="{{:tplKey}}form-element__label" aria-hidden="true">&nbsp;</div>
  {{/if}}

  <div class="{{:tplKey}}form-element__control{{if ~root.isLoading}} {{:~root.tplKey}}loading{{/if}}">
    {{if isText}}
    {{for items}}
    {{if dropdowns.length}}
    <div class="{{:~root.tplKey}}form-dropdown-container">
    {{/if}}
    {{if ~root.tplIcon}}
    <tpl-plain-icon tpl-icon="{{:~root.tplIcon}}" class="form-element__icon"></tpl-plain-icon>
    {{/if}}
    {{if hasBtn}}
    <div class="{{:~root.tplKey}}form-element__btn-group {{:~root.tplKey}}form-element__btn-group--{{:btnPosition}}">
    {{/if}}
    {{if btns.left}}
    <tpl-btn
      tpl-type="{{:btns.left.tplType}}"
      {{if btns.left.tagName}} tpl-tag="{{:btns.left.tagName}}"{{/if}}
      {{if btns.left.id}} id="{{:btns.left.id}}"{{/if}}
      {{if btns.left.class}} class="{{:btns.left.class}}"{{/if}}
      {{if btns.left.href}} href="{{:btns.left.href}}"{{/if}}
      {{if btns.left.nohref}} nohref="{{:btns.left.nohref}}"{{/if}}
      {{if btns.left.type}} type="{{:btns.left.type}}"{{/if}}
    >{{:btns.left.content}}</tpl-btn>
    {{/if}}
    <input
      id="{{:id}}"
      class="{{:class}}{{if ~root.isTransparent}} {{:~root.tplKey}}field--transparent{{/if}}{{if ~root.isTransparentBorder}} {{:~root.tplKey}}field--transparent-border{{/if}}"
      name="{{:name}}"
      type="{{:type}}"
      placeholder="{{:placeholder}}"
      value="{{:value}}"
      {{if disabled}} disabled{{/if}}
      {{:dataStr}}
    >
    {{if btns.right}}
    <tpl-btn
      tpl-type="{{:btns.right.tplType}}"
      {{if btns.right.tagName}} tpl-tag="{{:btns.right.tagName}}"{{/if}}
      {{if btns.right.id}} id="{{:btns.right.id}}"{{/if}}
      {{if btns.right.class}} class="{{:btns.right.class}}"{{/if}}
      {{if btns.right.href}} href="{{:btns.right.href}}"{{/if}}
      {{if btns.right.nohref}} nohref="{{:btns.right.nohref}}"{{/if}}
      {{if btns.right.type}} type="{{:btns.right.type}}"{{/if}}
    >{{:btns.right.content}}</tpl-btn>
    {{/if}}
    {{if hasBtn}}
    </div>
    {{/if}}
    {{if dropdowns.length}}
    <div class="{{:~root.tplKey}}form-dropdown">
      {{for dropdowns}}
        <div class="{{:~root.tplKey}}form-dropdown__item">
          {{:content}}
        </div>
      {{/for}}
    </div>
    </div>
    {{/if}}
    {{/for}}
    {{/if}}

    {{if isTextarea}}
    {{for items}}
    <textarea
      id="{{:id}}"
      class="{{:class}}{{if ~root.isTransparent}} {{:~root.tplKey}}field--transparent{{/if}}{{if ~root.isTransparentBorder}} {{:~root.tplKey}}field--transparent-border{{/if}}"
      name="{{:name}}"
      placeholder="{{:placeholder}}"
      {{if disabled}} disabled{{/if}}
      {{:dataStr}}
    >{{:value}}</textarea>
    {{/for}}
    {{/if}}

    {{if isEditable}}
    {{for items}}
    <div
      {{if ~root.editType == 'normal'}}contenteditable="true"{{/if}}
      id="{{:id}}"
      class="{{:~root.tplKey}}editable{{if ~root.editType == 'tag'}} {{:~root.tplKey}}has-tag-input{{/if}} {{:class}}{{if ~root.isTransparent}} {{:~root.tplKey}}field--transparent{{/if}}{{if ~root.isTransparentBorder}} {{:~root.tplKey}}field--transparent-border{{/if}}"
      name="{{:name}}"
      placeholder="{{:placeholder}}"
      {{if disabled}} disabled{{/if}}
      {{:dataStr}}
    >
      {{:value}}
      {{if ~root.editType == 'tag'}}
      <input type="text" class="{{:~root.tplKey}}editable__tag-input" style="width: 0;">
      {{/if}}
    </div>
    {{/for}}
    {{/if}}

    {{if isChoice}}
    {{if isAlternate}}
    <div class="{{:tplKey}}choice-group {{:tplKey}}btn-group{{if tplAlternate !== 'base'}} {{:tplKey}}btn-group--{{:tplAlternate}}{{/if}}{{if tplOutline === 'true'}} {{:tplKey}}btn-group--outline{{/if}}{{if tplSize}} {{:tplKey}}btn-group--{{:tplSize}}{{/if}}">
      {{for items}}
      <label class="{{:~root.tplKey}}choice-btn {{:~root.tplKey}}btn">
        <input
          type="{{:type}}"
          id="{{:id}}"
          class="{{:class}}"
          name="{{:name}}"
          value="{{:value}}"
          {{if checked}} checked{{/if}}
          {{if disabled}} disabled{{/if}}
          {{:dataStr}}
        >
        {{if label}}
        <span class="{{:~root.tplKey}}choice__label">{{:label}}</span>
        {{/if}}
      </label>
      {{/for}}
    </div>
    {{else}}
    <div class="{{:tplKey}}choice-group{{if isInline}} {{:tplKey}}choice-group--inline{{/if}}">
      {{for items}}
      <span class="{{:~root.tplKey}}choice">
        {{if alternate}}
        {{else}}
        <input
          type="{{:type}}"
          id="{{:id}}"
          class="{{:class}}"
          name="{{:name}}"
          value="{{:value}}"
          {{if checked}} checked{{/if}}
          {{if disabled}} disabled{{/if}}
          {{:dataStr}}
        >
        <label class="{{:~root.tplKey}}choice__label" for="{{:id}}">
          <span class="{{:~root.tplKey}}choice__faux"></span>
          {{if label}}
          <span class="{{:~root.tplKey}}form-element__label">{{:label}}</span>
          {{/if}}
        </label>
        {{/if}}
      </span>
      {{/for}}
    </div>
    {{/if}}
    {{/if}}

    {{if isToggle}}
    <div class="{{:tplKey}}toggle-group{{if isInline}} {{:tplKey}}toggle-group--inline{{/if}}">
      {{for items}}
      <div class="{{:~root.tplKey}}toggle-wrap">
        <label class="{{:~root.tplKey}}toggle">
          {{if label}}<span class="{{:~root.tplKey}}form-element__label">{{:label}}</span>{{/if}}
          <input
            type="checkbox"
            aria-describedby="toggle-desc"
            id="{{:id}}"
            class="{{:class}}"
            name="{{:name}}"
            value="{{:value}}"
            {{if checked}} checked{{/if}}
            {{if disabled}} disabled{{/if}}
            {{:dataStr}}
          >
          <span id="toggle-desc" class="{{:~root.tplKey}}toggle__faux-container" aria-live="assertive">
            <span class="{{:~root.tplKey}}toggle__faux"></span>
            {{if on}}<span class="{{:~root.tplKey}}toggle__on">{{:on}}</span>{{/if}}
            {{if off}}<span class="{{:~root.tplKey}}toggle__off">{{:off}}</span>{{/if}}
          </span>
        </label>
      </div>
      {{/for}}
    </div>
    {{/if}}

    {{if isSelect}}
      {{for items}}
      <div class="{{:~root.tplKey}}select-container">
        <select
          id="{{:id}}"
          class="{{:class}}{{if ~root.isTransparent}} {{:~root.tplKey}}field--transparent{{/if}}{{if ~root.isTransparentBorder}} {{:~root.tplKey}}field--transparent-border{{/if}}"
          name="{{:name}}"
          {{if disabled}} disabled{{/if}}
          {{:dataStr}}
        >
          {{for options}}
          <option value="{{:value}}"{{if selected}} selected{{/if}}>{{:label}}</option>
          {{/for}}
        </select>
      </div>
      {{/for}}
    {{/if}}

    {{if isRange}}
    <div class="{{:~root.tplKey}}range">
      <input
        type="hidden"
        {{if value}} value="{{:value}}"{{/if}}
        {{if min}} min="{{:min}}"{{/if}}
        {{if max}} max="{{:max}}"{{/if}}
        {{if disabled}} disabled{{/if}}
      >
      <div class="{{:~root.tplKey}}range-inner">
        <div class="{{:~root.tplKey}}range__track"></div>
        <div class="{{:~root.tplKey}}range__track-fill"></div>
        <button class="{{:~root.tplKey}}range__thumb" type="button"></button>
      </div>
    </div>
    {{/if}}

    {{if isFileSelector}}
    <div class="{{:~root.tplKey}}form-uploader{{:fileSelectorState}}">
      <div class="{{:~root.tplKey}}form-uploader__input">
        <tpl-plain-icon class="form-uploader__image" tpl-icon="download"></tpl-plain-icon>
        <span class="{{:~root.tplKey}}form-uploader__image icon-download"></span>
        <input
          class="{{:~root.tplKey}}form-uploader__file"
          type="file"
          name="{{:name}}[]"
          id="{{:id}}"
          data-multiple-caption="{count} files selected"
          multiple
        >
        <label class="{{:~root.tplKey}}form-element__label" for="{{:id}}">
          <strong>ファイルを選択</strong>
          <span class="{{:~root.tplKey}}form-uploader__dragndrop"> もしくはここにドラッグ＆ドロップします</span>
        </label>
        <tpl-btn class="form-uploader__btn" type="submit" tpl-type="primary">Upload</tpl-btn>
      </div>
      <div class="{{:~root.tplKey}}form-uploader__container">
        <div class="{{:~root.tplKey}}form-uploader__file_list">
          {{for items}}
          <div class="{{:~root.tplKey}}form-uploader__file_info state-{{:stateName}}">
            <div class="{{:~root.tplKey}}form-uploader__file_name">{{:name}}</div>
            <div class="{{:~root.tplKey}}form-uploader__file_size">{{:size}}Mb</div>
            <div class="{{:~root.tplKey}}form-uploader__file_progress">
              <tpl-progress value="{{:progress}}" tpl-type="{{:state.progress}}" class="progress--animated progress--auto-stop-animated"></tpl-progress>
            </div>
            <div class="{{:~root.tplKey}}form-uploader__file_state">{{:state.label}}</div>
            <div class="{{:~root.tplKey}}form-uploader__file_actions">
              <a href="javascript:void(0);">{{:state.action}}</a>
            </div>
          </div>
          {{/for}}
        </div>
      </div>
    </div>
    {{/if}}

    {{if isContent}}
      {{:content}}
    {{/if}}

    <div class="{{:tplKey}}form-element__error">
      This is error message.
    </div>
  </div>
</{{:tagName}}>
`;

const TEXT_TYPE_LIST = [
  'text',
  'password',
  'search',
  'tel',
  'url',
  'email',
  'datetime',
  'date',
  'month',
  'week',
  'time',
  'datetime-local',
  'number',
];

const FILE_INFO_STATE = {
  uploading: {label: 'アップロード中', progress: 'info'   , action: 'キャンセル'},
  error    : {label: '失敗しました'  , progress: 'danger' , action: '削除'},
  uploaded : {label: '完了しました'  , progress: 'success', action: '削除'},
};

class FormElementParser extends AbstractTagParser {

  static get TEXT_TYPE_LIST() { return TEXT_TYPE_LIST }



  constructor($el) {

    super($el, MY_TEMPLATE, {
      tmplAttributes   : [
        'type',
        'edittype',
        'name',
        'size',
        'require',
        'value',
        'min',
        'max',
        'inline',
        'alternate',
        'icon',
        'loading',
        'outline',
        'transparent',
        'transparent-border',
      ],
      // defaultAttributes: ['href', 'nohref', 'value', 'type'],
      // defaults         : {
      //   type: 'button',
      // },
    });

    let my = this;

    my.data.isContent         = my.data.tplType === 'base';
    my.data.isEditable        = my.data.tplType === 'editable';
    my.data.editType          = my.data.tplEdittype || 'normal';
    my.data.isRadio           = my.data.tplType === 'radio';
    my.data.isCheckbox        = my.data.tplType === 'checkbox';
    my.data.isSelect          = my.data.tplType === 'select';
    my.data.isRange           = my.data.tplType === 'range';
    my.data.isToggle          = my.data.tplType === 'toggle';
    my.data.isFileSelector    = my.data.tplType === 'file-selector';
    my.data.isText            = TEXT_TYPE_LIST.indexOf(my.data.tplType) !== -1;
    my.data.isTextarea        = my.data.tplType === 'textarea';
    my.data.isChoice          = my.data.isCheckbox || my.data.isRadio;
    my.data.indexName         = '_index-' + my.data.tplName;
    my.data.isAlternate       = my.data.tplAlternate ? true : false;
    my.data.isDisabled        = my.$el.prop('disabled');
    my.data.isInline          = my.data.tplInline;
    my.data.isLoading         = my.data.tplLoading === 'true';
    my.data.isTransparent     = my.data.tplTransparent === 'true';
    my.data.isTransparentBorder = my.data['tplTransparent-border'] === 'true';
    my.data.value               = my.data.tplValue;
    my.data.min                 = my.data.tplMin;
    my.data.max                 = my.data.tplMax;
    // my.data.alternatePos      = my.data.tplAlternate === 'base' ? '' : '--' + my.data.tplAlternate;
    my.data.fileSelectorState = null;

    if (my.data.isFileSelector) {
      my.data.fileSelectorState = my.data.tplState === 'no-advanced-upload' ? '' : ' has-advanced-upload ' + my.data.fileSelectorState;
    }

    my.data.tagName = my.data.tagName || 'div';

    let $label = my.$el.children('data-label');
    let $items = my.$el.children('data-item');

    my.data.label = $label ? $label.html() : null;
    $label.remove();

    my.data.items = [];

    const $ = AbstractTagParser.$;

    my.data.isSingle     = $items.length === 1;
    my.data.labelTagName = my.data.isSingle ? 'label' : 'div';

    $items.each(function(index) {
      let $item = $(this),
          item  = {};

      ['isRadio', 'isCheckbox', 'isSelect', 'isText', 'isTextarea', 'isEditable', 'isChoice'].forEach(key => {
        item[key] = my.data[key];
      });

      item.label       = $item.html() || null;
      item.name        = $item.attr('name') || my.data.tplName;
      item.id          = '_index-' + item.name + (my.data.isSingle ? '' : '-' + (index + 1));
      item.class       = $item.attr('class');
      item.data        = $item.data();
      item.type        = $item.attr('type') || my.data.tplType;
      item.value       = item.isTextarea || item.isEditable ? $item.html().trim() : $item.attr('value');
      item.placeholder = $item.attr('placeholder');
      item.alternate   = my.data.isAlternate;
      item.checked     = $item.prop('checked');
      item.disabled    = my.data.isDisabled || $item.prop('disabled');
      item.on          = $item.prop('on');
      item.off         = $item.prop('off');
      item.hasBtn      = false;
      item.btnPosition = null;
      item.btns        = {left: null, right: null};
      item.dropdowns   = [];

      $item.find('data-dropdown').each(function() {
        item.dropdowns.push({content: $(this).html()});
      });

      let dataRows = [];
      for (let key in item.data) {
        dataRows.push(`data-${key}="${item.data[key]}"`);
      }
      item.dataStr = dataRows.join(' ');

      let $btns = $item.find('data-btn');
      if ($btns.get(0)) {
        item.hasBtn = true;
        $btns.each(function() {
          let $btn = $(this),
              btn = {
                tagName : $btn.attr('tpl-tag'),
                type    : $btn.attr('type'),
                href    : $btn.attr('href'),
                nohref  : $btn.attr('nohref'),
                class   : $btn.attr('class'),
                tplType : $btn.attr('tpl-type'),
                content : $btn.html(),
                position: $btn.attr('btn-position') || 'right',
              };

          item.btns[btn.position] = btn;
          item.btnPosition = btn.position;
        });

        if (item.btns.left && item.btns.right) {
          item.btnPosition = 'both';
        }
      }

      if (item.isSelect) {
        item.options     = [];

        let $options      = $item.find('option'),
            selectedIndex = null;

        $options.each(function(index) {
          let option  = {},
              $option = $(this),
              label   = $option.html(),
              value   = $option.val();

          if ($option.prop('selected') || item.value === value) {
            selectedIndex = index;
          }

          option.label    = label;
          option.value    = value;
          option.selected = false;
          item.options.push(option);
        });

        selectedIndex = selectedIndex === null ? 0 : selectedIndex;
        item.options[selectedIndex].selected = true;
      }

      if (my.data.isFileSelector) {
        item.name      = $item.attr('name');
        item.size      = $item.prop('size');
        item.progress  = $item.prop('progress');
        item.stateName = $item.prop('state');
        item.state     = FILE_INFO_STATE[item.stateName];
      }

      my.data.items.push(item);
      $item.remove();
    });

    my.refetchContent();
  }
}



module.exports = FormElementParser;
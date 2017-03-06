'use strict';

// 背景カラー（英: Background）
// プライマリー・カラー（英: Primary Color）
// セカンダリー・カラー（英: Secondary Color）
// 警告カラー（英: Error Color）
// 成功カラー（英: Success Color）

// 本来: 045b9e

// なぜかあった: 015A9D
// 濃い色: 173079
// サブ: 595757

// 謎: 0065A8


// 0080c9

const colorTokens = {

  // brand
  brand: {
    foundation: '#fff',
    base      : {_default: '#fff', focus: 'autoBrightness($this, 10%, 25%)'},

    gray      : {
      _default: '#9193a0',
      dark   : 'darken($this, 5%)',
      light  : 'lighten($this, 20%)',
      lighter: 'lighten($this, 35%)',
    },

    primary   : {_default: '#c2007b'    , focus: 'autoBrightness($this,  5%, 25%)', active: 'autoBrightness($this, 10%, 25%)', dark: 'darken($this, 5%)', light: 'lighten($this,  5%)', darkfocus: 'autoBrightness($this.dark, 5%, 25%, $this)'},
    secondary : {_default: '#202020'    , focus: 'autoBrightness($this, 10%, 25%)', active: 'autoBrightness($this, 20%, 25%)', dark: 'darken($this, 5%)', light: 'lighten($this,  5%)', darkfocus: 'autoBrightness($this.dark, 5%, 25%, $this)'},
    shade     : {_default: '#9193a0'    , focus: 'autoBrightness($this,  7%, 25%)', active: 'autoBrightness($this, 14%, 25%)', dark: 'darken($this, 5%)', light: 'lighten($this,  5%)', darkfocus: 'autoBrightness($this.dark, 5%, 25%, $this)'},
    inverse   : {_default: '#000'       , focus: 'autoBrightness($this, 10%, 25%)', active: 'autoBrightness($this, 20%, 25%)', dark: 'darken($this, 5%)', light: 'lighten($this, 15%)', darkfocus: 'autoBrightness($this.dark, 5%, 25%, $this)'},
    info      : {_default: '#44aeea'    , focus: 'autoBrightness($this, 10%, 25%)', active: 'autoBrightness($this, 20%, 25%)', dark: 'darken($this, 5%)', light: 'lighten($this,  5%)', darkfocus: 'autoBrightness($this.dark, 5%, 25%, $this)'},
    success   : {_default: '#b3bd40'    , focus: 'autoBrightness($this,  5%, 25%)', active: 'autoBrightness($this, 10%, 25%)', dark: 'darken($this, 5%)', light: 'lighten($this,  5%)', darkfocus: 'autoBrightness($this.dark, 5%, 25%, $this)'},
    warning   : {_default: '#dd6a0a'    , focus: 'autoBrightness($this,  5%, 25%)', active: 'autoBrightness($this, 10%, 25%)', dark: 'darken($this, 5%)', light: 'lighten($this,  5%)', darkfocus: 'autoBrightness($this.dark, 5%, 25%, $this)'},
    danger    : {_default: '#c50030'    , focus: 'autoBrightness($this,  5%, 25%)', active: 'autoBrightness($this, 10%, 25%)', dark: 'darken($this, 5%)', light: 'lighten($this,  5%)', darkfocus: 'autoBrightness($this.dark, 5%, 25%, $this)'},
    disabled  : {_default: '$brand-gray-lighter'},

    muted     : 'desaturate($brand-gray, 5%)',
    typo      : {_default: '#211917', inverse: '#fff'},
  },



  // divider
  divider: {_default: '$brand-gray-light', focus: '$brand-primary', disabled: '$this'},



  // typo
  typo: {
    base    : {_default: '$brand-typo', inverse: '$brand-typo-inverse'},
    disabled: '$brand-muted',
    inverse : '$brand-typo-inverse',
    heading : '$brand-typo',
    lead    : '$brand-shade',
    muted   : '$brand-muted',
    link    : {_default: '$brand-primary', inverse: '$brand-muted'},
    primary : '$brand-primary',
    success : '$brand-success',
    info    : '$brand-info',
    warning : '$brand-warning',
    danger  : '$brand-danger',
  },



  // parts
  parts: {
    base: {
      text   : {_default: 'inherit'    , focus: '$this'},
      divider: {_default: 'transparent', focus: 'rgba(0, 0, 0, 0)'   },
      bg     : {_default: 'transparent', focus: 'rgba(0, 0, 0, 0.05)', active: 'rgba(0, 0, 0, 0.1)'},
      accent : 'rgba(0, 0, 0, 0.1)',
    },

    neutral: {
      text   : {_default: '$brand-typo', focus: '$this'},
      divider: {_default: '$divider'   , focus: 'darken($this, 5%)'},
      bg     : {_default: '$brand-base', focus: 'darken($this, 5%)', active: 'darken($this, 10%)'},
      accent : '$divider',
    },

    primary: {
      text   : {_default: '$brand-typo-inverse', focus: '$this'},
      divider: {_default: '$brand-primary-dark', focus: '$brand-primary-darkfocus'},
      bg     : {_default: '$brand-primary'     , focus: '$brand-primary-focus'    , active: '$brand-primary-active'},
      accent : '$brand-primary-light',
    },

    shade: {
      text   : {_default: '$brand-typo-inverse', focus: '$this'},
      divider: {_default: '$brand-shade-dark'  , focus: '$brand-shade-darkfocus'},
      bg     : {_default: '$brand-shade'       , focus: '$brand-shade-focus'    , active: '$brand-shade-active'},
      accent : '$brand-shade-light',
    },

    inverse: {
      text   : {_default: '$brand-typo-inverse', focus: '$this'},
      divider: {_default: '$brand-inverse-dark', focus: '$brand-inverse-darkfocus'},
      bg     : {_default: '$brand-inverse'     , focus: '$brand-inverse-focus'    , active: '$brand-inverse-active'},
      accent : '$brand-inverse-light',
    },

    info: {
      text   : {_default: '$brand-typo-inverse', focus: '$this'},
      divider: {_default: '$brand-info-dark'   , focus: '$brand-info-darkfocus'},
      bg     : {_default: '$brand-info'        , focus: '$brand-info-focus'    , active: '$brand-info-active'},
      accent : '$brand-info-light',
    },

    success: {
      text   : {_default: '$brand-typo-inverse', focus: '$this'},
      divider: {_default: '$brand-success-dark', focus: '$brand-success-darkfocus'},
      bg     : {_default: '$brand-success'     , focus: '$brand-success-focus'    , active: '$brand-success-active'},
      accent : '$brand-success-light',
    },

    warning: {
      text   : {_default: '$brand-typo-inverse', focus: '$this'},
      divider: {_default: '$brand-warning-dark', focus: '$brand-warning-darkfocus'},
      bg     : {_default: '$brand-warning'     , focus: '$brand-warning-focus'    , active: '$brand-warning-active'},
      accent : '$brand-warning-light',
    },

    danger: {
      text   : {_default: '$brand-typo-inverse', focus: '$this'},
      divider: {_default: '$brand-danger-dark' , focus: '$brand-danger-darkfocus'},
      bg     : {_default: '$brand-danger'      , focus: '$brand-danger-focus'    , active: '$brand-danger-active'},
      accent : '$brand-danger-light',
    },

    disabled: {
      text   : {_default: '$brand-muted'               , focus: '$this'},
      divider: {_default: 'darken($brand-disabled, 5%)', focus: '$this'},
      bg     : {_default: '$brand-disabled'            , focus: '$this', active: '$this'},
      accent : 'darken($parts-disabled-divider, 3%)',
    },
  },



  // container
  container: {
    base: {
      text   : '$typo-base',
      link   : '$typo-link',
      bg     : {_default: '$brand-base', focus: 'darken($this, 5%)', active: 'darken($this, 10%)'},
      divider: '$divider',
    },

    neutral: {
      text   : '$typo-base',
      link   : '$typo-link',
      bg     : {_default: '$brand-gray-lighter', focus: 'darken($this, 5%)', active: 'darken($this, 10%)'},
      divider: '$divider',
    },

    primary: {
      text   : '$typo-base-inverse',
      link   : '$typo-base-inverse',
      bg     : {_default: '$brand-primary', focus: '$brand-primary-focus', active: '$brand-primary-active'},
      divider: 'darken($brand-primary, 5%)',
    },

    shade: {
      text   : '$typo-base',
      link   : '$typo-base',
      bg     : {_default: '$brand-shade', focus: '$brand-shade-focus', active: '$brand-shade-active'},
      divider: '$brand-gray-dark',
    },

    inverse: {
      text   : '$typo-base-inverse',
      link   : '$typo-link-inverse',
      bg     : {_default: '$brand-inverse', focus: '$brand-inverse-focus', active: '$brand-inverse-active'},
      divider: '$brand-inverse',
    },

    info: {
      text   : '$typo-info',
      link   : '$typo-info',
      bg     : {_default: 'lighten($brand-info, 30%)', focus: 'lighten($brand-info-focus, 30%)', active: 'lighten($brand-info-active, 30%)'},
      divider: 'darken($container-info-bg, 7%)',
    },

    success: {
      text   : '$typo-success',
      link   : '$typo-success',
      bg     : {_default: 'lighten($brand-success, 37%)', focus: 'lighten($brand-success-focus, 37%)', active: 'lighten($brand-success-active, 37%)'},
      divider: 'darken($container-success-bg, 5%)',
    },

    warning: {
      text   : '$typo-warning',
      link   : '$typo-warning',
      bg     : {_default: 'lighten($brand-warning, 31%)', focus: 'lighten($brand-warning-focus, 31%)', active: 'lighten($brand-warning-active, 31%)'},
      divider: 'darken($container-warning-bg, 5%)',
    },

    danger: {
      text   : '$typo-base-inverse',
      link   : '$typo-base-inverse',
      bg     : {_default: 'lighten($brand-danger, 30%)', focus: 'lighten($brand-danger-focus, 30%)', active: 'lighten($brand-danger-active, 30%)'},
      divider: 'darken($container-danger-bg, 5%)',
    },
  },



  // layout
  layout: {
    foundation: '$brand-foundation',
    base      : {_default: '$brand-base', focus: '#fafafa', disabled: '$brand-disabled', shade: '#efefef'},
    inverse   : '$brand-inverse',
    mark      : '#fcf8e3',
    divider   : {_default: '#c1c1c1', focus: '$brand-primary', disabled: '#b7b8b9'},
  },
};



module.exports = colorTokens;
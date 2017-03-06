'use strict';
let undefined;




const fs      = require('fs');
const path    = require('path');
const Config  = require('../Config');
const Utility = require(path.join(Config.LIB_DIR, 'Utility'));



// Get All ECT Pages
let navigationItems = [];
let parents = Utility.dirList(Config.ECT_ROOT).filter(dirName => {
  return !dirName.match(/^_/);
});
parents.forEach(parent => {
  let navigationItem = {
    name    : parent,
    label   : Utility.firstUpper(parent),
    children: null,
  };

  let children = Utility.dirList(path.join(Config.ECT_ROOT, parent));
  if (children.length) {
    navigationItem.children = [];
    children.forEach(child => {
      navigationItem.children.push({
        name  : child,
        label : Utility.pascalCase(child).replace(/([A-Z])/g, ' $1').trim(),
        parent: navigationItem,
      });
    });
  }

  navigationItems.push(navigationItem);
});



const siteConfig = {

  navigation: [

    // Top
    {
      name: 'top',
      label: 'Top',
      children: null,
      url : '/',
    },
    ...navigationItems,
  ],
};



module.exports = siteConfig;
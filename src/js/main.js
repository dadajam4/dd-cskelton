'use strict';

import 'babel-polyfill';
import 'static/polyfill';
// window.anime = require('animejs');
import 'velocity-animate';
import Demo from 'classes/Demo';



new Demo();
$(() => { window.demo.init(); })

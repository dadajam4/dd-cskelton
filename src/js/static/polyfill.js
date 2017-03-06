
/**
 * window.console (type log)
 */
(function() {
  if (!window.console) {
    window.console = {
      log  : function() {},
      debug: function() {},
      info : function() {},
      dir  : function() {},
      error: function() {},
    };
  }
})();



/**
 * window.requestAnimationFrame
 */
(function() {
  var requestAnimationFrame = window.requestAnimationFrame
                           || window.mozRequestAnimationFrame
                           || window.webkitRequestAnimationFrame
                           || window.msRequestAnimationFrame;

  window.requestAnimationFrame = requestAnimationFrame;
})();

'use strict';



export default class Range {
  constructor() {
    let my = this;

    my.$current = null;
  }

  init() {
    let my = this;

    demo.$b.find(`.${demo.tplKey}range`).each(function() {
      my.updateRange($(this));
    });

    demo.$d.on('click', `.${demo.tplKey}range__track`, function(e) {
      let $range = $(this).closest(`.${demo.tplKey}range`),
          pos    = getPositionByEvent(e);

      my.updateRangeByPointerPosition($range, pos);
    });

    demo.$d.on('touchstart mousedown', `.${demo.tplKey}range__thumb`, function(e) {
      if (e.which == 3) {
        return;
      }

      let $thumb = $(this),
          $range = $thumb.closest(`.${demo.tplKey}range`);

      my.$current = $range;
      $range.addClass(`${demo.tplKey}is-focus`);
      return false;
    });

    demo.$w.on('touchmove mousemove', function(e) {
      if (!my.$current) {
        return;
      }

      let $range = my.$current,
          pos    = getPositionByEvent(e);

      my.updateRangeByPointerPosition($range, pos);
    });

    demo.$w.on('touchend mouseup', function(e) {
      if (!my.$current) {
        return;
      }

      let $range = my.$current,
          pos    = getPositionByEvent(e);

      my.updateRangeByPointerPosition($range, pos);

      $range.removeClass(`${demo.tplKey}is-focus`);
      my.$current = null;
    });
  }

  updateRangeByPointerPosition($range, pos) {
    let my = this;

    let $input = $range.find('input'),
        $track = $range.find(`.${demo.tplKey}range__track`),
        $fill  = $range.find(`.${demo.tplKey}range__track-fill`),
        $thumb = $range.find(`.${demo.tplKey}range__thumb`),
        min    = parseInt($input.prop('min'), 10) || 0,
        max    = parseInt($input.prop('max'), 10) || 100;

    let trackRect  = $track.get(0).getBoundingClientRect();
    let trackLeft  = trackRect.left  + window.pageXOffset;
    let trackRight = trackRect.right + window.pageXOffset;
    let trackSize  = trackRect.right - trackRect.left;
    let myLeft = pos.x;
    if (myLeft < trackLeft) {
      myLeft = trackLeft;
    }
    if (myLeft > trackRight) {
      myLeft = trackRight;
    }

    let myPos = myLeft - trackLeft;
    let myPer = myPos / trackSize;
    let fixMax = max - min;
    let value = Math.round(fixMax * myPer + min);
    value = value > max ? max : value;
    value = value < min ? min : value;

    $input.val(value);
    console.log(value, max);
    $thumb.css({left: myPer * 100 + '%'});
    $fill.css({width: myPer * 100 + '%'});
  }

  updateRange($range) {
    let my = this;

    let $input = $range.find('input'),
        $thumb = $range.find(`.${demo.tplKey}range__thumb`),
        $fill  = $range.find(`.${demo.tplKey}range__track-fill`),
        value  = parseInt($input.val(), 10),
        min    = parseInt($input.prop('min'), 10) || 0,
        max    = parseInt($input.prop('max'), 10) || 100;

    let fixValue = value - min;
    let fixMax = max - min;

    let pos = Math.round(fixValue / fixMax * 100);
    $thumb.css({left: pos + '%'});
    $fill.css({width: pos + '%'});
    $range.addClass(`${demo.tplKey}is-ready`);
  }
}



function getPositionByEvent(e) {
  let point = e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0] : e;
  return {x: point.pageX, y: point.pageY};
}

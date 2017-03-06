(function(undefined) {
  "use strict";

  $(function() {
    var $d = $(document);

    $('.acs-site__btn-menu').on('click', function() {
      $('.acs-site').toggleClass('acs-site--navigation-open');
    });

    $('.acs-site-menu__item > a').on('click', function() {
      $(this).parent().toggleClass('is-active');
    });

    // demoToggleClass
    $d.on('change', '.demo-toggle-class', function() {
      demoToggleClass($(this));
    });
    demoToggleClass($('.demo-toggle-class'));
    function demoToggleClass($els) {
      $els.each(function() {
        var $el       = $(this),
            $target   = $($el.data('target')),
            className = $el.val(),
            checked   = $el.prop('checked');

        if (checked) {
          $target.addClass(className);
        } else {
          $target.removeClass(className);
        }
      });
    }

    // demoChangeClass
    $d.on('change', '.demo-change-class', function() {
      var $els = $('[name="' + $(this).prop('name') + '"]');
      demoChangeClass($els);
    });
    demoChangeClass($('.demo-change-class'));
    function demoChangeClass($els) {
      $els.each(function() {
        var $el       = $(this),
            $target   = $($el.data('target')),
            className = $el.val(),
            checked   = $el.prop('checked');

        if (checked) {
          $target.addClass(className);
        } else {
          $target.removeClass(className);
        }
      });
    }

    $d.on('click', '.acs-th__action', function() {
      $(this).toggleClass('acs-is-sorted--asc');
    });

    $d.on('change', '[name="demo-select-all"]', function() {
      var $children  = $(this).closest('table').find('[name="demo-select"]'),
          allChecked = $children.length === $children.filter(function() { return $(this).prop('checked') }).length;

      $children.prop('checked', !allChecked).trigger('change');
    });

    $d.on('change', '[name="demo-select"]', function() {
      if ($(this).prop('checked')) {
        $(this).closest('tr').addClass('is-selected');
      } else {
        $(this).closest('tr').removeClass('is-selected');
      }
    });



  });
})();
(function() {

  (function($) {
    $.repeat = function(num, what) {
      return Array(num + 1).join(what);
    };
    return $.join = function(array) {
      return array.join('');
    };
  })(jQuery);

}).call(this);

import Overlay from './component/Overlay';

(function ($) {
  "use strict";

  $(document).ready(init);

  function init() {
    let overlay = new Overlay({
      clickCallback: function(evt) {
        console.log('evt :', evt);
      }
    }).init().show();
  }
}(jQuery));
'use strict';


(function () {
  window.util = {
    createRandom: function () {
      return Math.random() - 0.5;
    },

    createRandomArray: function (array) {
      return array.sort(window.util.createRandom);
    }
  };
})();

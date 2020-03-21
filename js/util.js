'use strict';


// .......................................................
// Дополнительно
// .......................................................
(function () {
  window.util = {
    createRandom: function () {
      return Math.random() - 0.5;
    },

    createRandomArray: function (array) {
      return array.sort(window.util.createRandom);
    },

    sortByComments: function (arr) {
      return arr.slice().sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
    }
  };
})();

'use strict';

// .......................................................
// Дополнительно
// .......................................................
(function () {
  window.util = {

    createRandomArray: function (array) {
      var photos = [];
      var copyArray = array.slice();
      var j = 0;
      for (var i = 0; i < window.createData.RangeRandom.MAX; i++) {
        j = Math.floor(Math.random() * (copyArray.length - 1));
        photos[i] = copyArray.splice(j, 2)[0];
      }
      return photos;
    },

    sortByComments: function (array) {
      return array.slice().sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
    }
  };
})();

'use strict';

// .......................................................
// Дополнительно
// .......................................................
(function () {
  window.util = {

    createRandomArray: function (array) {
      var photos = [];
      for (var i = 0; i < window.createData.RangeRandom.MAX; i++) {
        var j = Math.floor(Math.random() * (array.length - 1));
        photos[i] = array.splice(j, 1)[0];
      }
      return photos;
    },

    sortByComments: function (arr) {
      return arr.slice().sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
    }
  };
})();

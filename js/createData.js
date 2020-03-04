'use strict';


(function () {
  var template = document.querySelector('#picture').content;

  var picturesContainer = document.querySelector('.pictures');
  var imgFilters = document.querySelector('.img-filters');
  var imgFiltersForm = imgFilters.querySelector('.img-filters__form');

  var imgArray = [];

  var DEBOUNCE_INTERVAL = 300;


  // Функция создания изображения
  var createPicture = function (picture) {
    var pictureClone = template.cloneNode(true);

    pictureClone.querySelector('.picture__img').src = picture.url;
    pictureClone.querySelector('.picture__likes').textContent = picture.likes;
    pictureClone.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureClone;
  };

  // Функция для удаления изображений при переключении
  var deletePictures = function () {
    var allOfPicture = picturesContainer.querySelectorAll('.picture');
    allOfPicture.forEach(function (element) {
      element.remove();
    });
  };

  // Функция для отрисовки изображений (добавляем данные)
  var showPictures = function (data) {
    var fragment = document.createDocumentFragment();

    deletePictures();
    data.forEach(function (image) {
      fragment.appendChild(createPicture(image));
    });

    picturesContainer.appendChild(fragment);
  };

  // Функция для сравнивнения элементов
  var compareElements = function (first, second) {
    return (second.comments.length - first.comments.length);
  };

  // Функция сортировки
  var sortingByDecrease = function (array) {
    var arrClone = array.slice();
    return arrClone.sort(compareElements);
  };

  // Функция устранения дребезга
  var debounce = function (cb) {
    var lastTimeout = null;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  // Выбор фильтра
  var CreateFilter = {
    'filter-popular': function (array) {
      showPictures(array);
    },
    'filter-new': function (array) {
      var arrClone = array.slice();
      showPictures(window.util.createRandomArray(arrClone).slice(0, 10));
    },
    'filter-discussed': function (array) {
      showPictures(sortingByDecrease(array));
    }
  };

  var paintPictures = debounce(function (item) {
    CreateFilter[item.id](imgArray);
  });

  // Функция для переключения фильтров (и удаления дребезга)
  var buttonClickHandler = function (evt) {
    var theTarget = evt.target;

    if (theTarget.classList.contains('img-filters__button')) {
      var buttons = imgFiltersForm.querySelectorAll('.img-filters__button');
      buttons.forEach(function (item) {
        item.classList.remove('img-filters__button--active');
      });
      theTarget.classList.add('img-filters__button--active');
    }
    paintPictures(theTarget);
  };

  imgFiltersForm.addEventListener('click', buttonClickHandler);

  // Функция для показа списка фильтров
  var showFilters = function (item) {
    imgFilters.classList.remove('img-filters--inactive');

    // Отрисовка изображений к первому фильтру
    imgArray = item;

    // document.addEventListener('click', function (evt) {
    //   window.bigImg.onClickPictureOpen(evt, item);
    // });

    CreateFilter['filter-popular'](imgArray);
  };

  window.loadData.loadData(showFilters);
})();

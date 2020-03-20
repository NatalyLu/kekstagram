'use strict';


(function () {
  var template = document.querySelector('#picture').content;

  var picturesContainer = document.querySelector('.pictures');
  var imgFilters = document.querySelector('.img-filters');
  var imgFiltersForm = imgFilters.querySelector('.img-filters__form');
  var bigPic = document.querySelector('.big-picture');
  var buttonDefault = imgFiltersForm.querySelector('#filter-default');
  var buttonR = imgFiltersForm.querySelector('#filter-random');
  var buttonD = imgFiltersForm.querySelector('#filter-discussed');
  var closeButton = bigPic.querySelector('#picture-cancel');

  var imgArray = [];

  var randomImg = {
    MIN: 0,
    MAX: 10
  };

  var DEBOUNCE_INTERVAL = 300;
  var COMMENTS = 5;

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 27;

  var closeButtonClickHandler = function () {
    closeBigPhoto();
  };

  var isEscEvent = function (evt, arg) {
    if (evt.keyCode === ESC_KEYCODE) {
      arg();
    }
  };

  var isEnterEvent = function (evt, arg) {
    if (evt.keyCode === ENTER_KEYCODE) {
      arg();
    }
  };

  var closeBigPhoto = function () {
    window.helpers.hideItem(bigPic);
    closeButton.removeEventListener('click', closeButtonClickHandler);
    closeButton.removeEventListener('keydown', bigPicKeydownEnterHandler);
    document.removeEventListener('keydown', bigPicKeydownEscHandler);
  };

  var bigPicKeydownEscHandler = function (evt) {
    isEscEvent(evt, closeBigPhoto);
  };

  var bigPicKeydownEnterHandler = function (evt) {
    isEnterEvent(evt, closeBigPhoto);
  };

  // Функция создания изображения (шаблона)
  var createPicture = function (picture) {
    var pictureClone = template.cloneNode(true);

    pictureClone.querySelector('.picture__img').src = picture.url;
    pictureClone.querySelector('.picture__likes').textContent = picture.likes;
    pictureClone.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureClone.addEventListener('click', function () {
      showBigPhoto(picture);
    });
    return pictureClone;
  };

  var showItem = function (item) {
    item.classList.remove('hidden');
  };

  // Функция создания комментариев
  var renderComments = function (comments) {
    var socialComments = bigPic.querySelector('.social__comments');

    socialComments.innerHTML = '';
    var li = document.createElement('li');
    li.classList.add('social__comment');
    var img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = comments.avatar;
    img.width = '35';
    img.height = '35';
    img.alt = comments.name;
    var paragraph = document.createElement('p');
    paragraph.classList.add('social__text');
    paragraph.textContent = comments.message;
    li.appendChild(img);
    li.appendChild(paragraph);
    return li;
  };

  // Функция для вывода всех комментариев
  var generateComment = function (comments, number, handler, currentCount) {
    var bigPicSocial = bigPic.querySelector('.big-picture__social');
    var socialComments = bigPic.querySelector('.social__comments');
    var commentsLoader = bigPic.querySelector('.comments-loader');

    var fragment = document.createDocumentFragment();
    currentCount = 0;
    for (var i = 0; i < comments.length && i < number; i++) {
      fragment.appendChild(renderComments(comments[i]));
      currentCount++;
    }

    socialComments.appendChild(fragment);

    bigPicSocial.querySelector('.comments__current-count').textContent = currentCount;
    if (number > comments.length) {
      commentsLoader.classList.add('visually-hidden');
      commentsLoader.removeEventListener('click', handler);
    } else {
      commentsLoader.classList.remove('visually-hidden');
    }
  };

  // Показ одной фотографии
  var showBigPhoto = function (data, current) {
    var bigPicSocial = bigPic.querySelector('.big-picture__social');
    showItem(bigPic);
    var bigPicSocialClone = bigPicSocial.cloneNode(true);
    bigPicSocialClone.querySelector('.likes-count').textContent = data.likes;
    bigPicSocialClone.querySelector('.social__caption').textContent = data.description;
    bigPicSocialClone.querySelector('.comments-count').textContent = data.comments.length;
    bigPicSocial.parentNode.replaceChild(bigPicSocialClone, bigPicSocial);
    bigPic.querySelector('.big-picture__img').querySelector('img').src = data.url;

    var commentsNumber = COMMENTS;

    var renderCommentsHandler = function () {
      commentsNumber += COMMENTS;
      generateComment(data.comments, commentsNumber, renderCommentsHandler);
    };

    var commentsLoader = bigPic.querySelector('.comments-loader');
    generateComment(data.comments, commentsNumber, renderCommentsHandler, current);
    commentsLoader.addEventListener('click', renderCommentsHandler);
    closeButton.addEventListener('click', closeBigPhoto);
    closeButton.addEventListener('keydown', bigPicKeydownEnterHandler);
    document.addEventListener('keydown', bigPicKeydownEscHandler);
  };

  // Функция для удаления изображений при переключении фильтра
  var deletePictures = function () {
    var allOfPicture = picturesContainer.querySelectorAll('.picture');
    allOfPicture.forEach(function (element) {
      element.remove();
    });
  };

  // Функция для удаления класса active у всех фильтров при их переключении
  var removeFilter = function () {
    var filterButtons = imgFilters.querySelectorAll('.img-filters__button');
    filterButtons.forEach(function (button) {
      if (button.classList.contains('img-filters__button--active')) {
        button.classList.remove('img-filters__button--active');
      }
    });
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

  // Функция добавления изображений через шаблон
  var getImages = function (array) {
    deletePictures();
    removeFilter();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(createPicture(array[i]));
    }
    picturesContainer.appendChild(fragment);
    imgFilters.classList.remove('img-filters--inactive');
  };

  // Основная функция для фильтрации изображений
  var getSuccessHandler = function (arr) {
    imgArray = arr;
    getImages(imgArray);

    var defaultPhotosHandler = function (evt) {
      getImages(imgArray);
      evt.target.classList.add('img-filters__button--active');
    };

    var randomPhotosHandler = function (evt) {
      var uniquePhotos = imgArray.filter(function (it, i) {
        return imgArray.indexOf(it) === i;
      });
      getImages(window.util.createRandomArray(uniquePhotos).slice(randomImg.MIN, randomImg.MAX));
      evt.target.classList.add('img-filters__button--active');
    };

    var discussedPhotosHandler = function (evt) {
      getImages(window.util.sortByComments(imgArray));
      evt.target.classList.add('img-filters__button--active');
    };

    buttonDefault.addEventListener('click', debounce(function (evt) {
      defaultPhotosHandler(evt);
    }));
    buttonR.addEventListener('click', debounce(function (evt) {
      randomPhotosHandler(evt);
    }));
    buttonD.addEventListener('click', debounce(function (evt) {
      discussedPhotosHandler(evt);
    }));
  };

  window.loadData.loadData(getSuccessHandler);
})();

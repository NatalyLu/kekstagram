'use strict';

// .....................................................................
// Работа с изображениями, а именно:
// Создание списка изображений. Открытие большого изображения из списка.
// Создание комментариев. Переключение фильтров изображеий.
// .....................................................................
(function () {
  var template = document.querySelector('#picture').content.querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');
  var imgFilters = document.querySelector('.img-filters');
  var imgFilterButtons = imgFilters.querySelectorAll('button');
  var bigPicture = document.querySelector('.big-picture');
  var closeButton = bigPicture.querySelector('#picture-cancel');

  var RangeRandom = {
    MIN: 0,
    MAX: 10
  };

  var DEBOUNCE_INTERVAL = 500;
  var COMMENTS = 5;

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 27;

  var imagesList = [];

  var showElement = function (item) {
    item.classList.remove('hidden');
  };

  var hideElement = function (item) {
    item.classList.add('hidden');
  };

  var closeButtonClickHandler = function () {
    closeBigPicture();
  };

  var bigPicKeydownEscHandler = function (evt) {
    escEvent(evt, closeBigPicture);
  };

  var bigPicKeydownEnterHandler = function (evt) {
    enterEvent(evt, closeBigPicture);
  };

  var escEvent = function (evt, argument) {
    if (evt.keyCode === ESC_KEYCODE) {
      argument();
    }
  };

  var enterEvent = function (evt, argument) {
    if (evt.keyCode === ENTER_KEYCODE) {
      argument();
    }
  };

  var closeBigPicture = function () {
    hideElement(bigPicture);
    closeButton.removeEventListener('click', closeButtonClickHandler);
    closeButton.removeEventListener('keydown', bigPicKeydownEnterHandler);
    document.removeEventListener('keydown', bigPicKeydownEscHandler);
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

  // Функция создания комментариев
  var renderComments = function (comments) {
    var socialComments = bigPicture.querySelector('.social__comments');

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
  var createComment = function (comments, number, handler, currentCount) {
    var bigPictureSocial = bigPicture.querySelector('.big-picture__social');
    var socialComments = bigPicture.querySelector('.social__comments');
    var commentsLoader = bigPicture.querySelector('.comments-loader');
    var fragment = document.createDocumentFragment();

    currentCount = 0;
    for (var i = 0; i < comments.length && i < number; i++) {
      fragment.appendChild(renderComments(comments[i]));
      currentCount++;
    }

    socialComments.appendChild(fragment);

    bigPictureSocial.querySelector('.comments__current-count').textContent = currentCount;
    if (number > comments.length) {
      commentsLoader.classList.add('visually-hidden');
      commentsLoader.removeEventListener('click', handler);
    } else {
      commentsLoader.classList.remove('visually-hidden');
    }
  };

  // Показ одной крупной фотографии
  var showBigPhoto = function (data, current) {
    var bigPictureSocial = bigPicture.querySelector('.big-picture__social');
    showElement(bigPicture);
    var bigPictureSocialClone = bigPictureSocial.cloneNode(true);
    bigPictureSocialClone.querySelector('.likes-count').textContent = data.likes;
    bigPictureSocialClone.querySelector('.social__caption').textContent = data.description;
    bigPictureSocialClone.querySelector('.comments-count').textContent = data.comments.length;
    bigPictureSocial.parentNode.replaceChild(bigPictureSocialClone, bigPictureSocial);
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = data.url;
    var commentsNumber = COMMENTS;

    var renderCommentsHandler = function () {
      commentsNumber += COMMENTS;
      createComment(data.comments, commentsNumber, renderCommentsHandler);
    };

    var commentsLoader = bigPicture.querySelector('.comments-loader');
    commentsLoader.addEventListener('click', renderCommentsHandler);
    closeButton.addEventListener('click', closeBigPicture);
    closeButton.addEventListener('keydown', bigPicKeydownEnterHandler);
    document.addEventListener('keydown', bigPicKeydownEscHandler);
    createComment(data.comments, commentsNumber, renderCommentsHandler, current);
  };

  // Функция для удаления изображений при переключении фильтра
  var deletePictures = function () {
    var pictures = picturesContainer.querySelectorAll('.picture');
    pictures.forEach(function (element) {
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
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(createPicture(array[i]));
    }
    picturesContainer.appendChild(fragment);
    imgFilters.classList.remove('img-filters--inactive');
  };

  // Обработчик для фильтрации изображений
  var filterClickHandler = debounce(function (evt) {
    var targetFilter = evt.target;

    if (!targetFilter.classList.contains('img-filters__button--active')) {
      removeFilter();
      deletePictures();
      targetFilter.classList.add('img-filters__button--active');

      if (targetFilter.id === 'filter-default') {
        getImages(imagesList);
      } else if (targetFilter.id === 'filter-random') {
        getImages(window.util.createRandomArray(imagesList));
      } else if (targetFilter.id === 'filter-discussed') {
        getImages(window.util.sortByComments(imagesList));
      }
    }
  });

  // Функция первого показа изображений
  var showPictures = function (items) {
    getImages(items);
    imagesList = items;
  };

  // Ставим обработчик событий с устранением дребезга на кнопки фильтрации фотографий
  imgFilterButtons.forEach(function (it) {
    it.addEventListener('click', filterClickHandler);
  });

  window.loadData.submitRequest(showPictures, window.loadPhoto.loadImgUnsuccessful);

  window.createData = {
    escEvent: escEvent,
    RangeRandom: RangeRandom
  };
})();

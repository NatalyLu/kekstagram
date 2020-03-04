'use strict';


(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img');
  var socialComments = bigPicture.querySelector('.social__comments');

  // Функция для создания комментария
  var createComment = function (item) {
    var comment = document.createElement('li');
    var imgItem = document.createElement('img');

    imgItem.src = (item.avatar);
    imgItem.classList.add('social__picture');
    imgItem.width = 35;
    imgItem.height = 35;
    imgItem.alt = 'Аватар комментатора фотографии';

    comment.classList.add('social__comment');
    comment.appendChild(imgItem);
    comment.insertAdjacentText('beforeend', item.message);
    return comment;
  };

  // Функция для создания (отрисовки) большого изображения
  var createBigImg = function (item) {
    bigPictureImg.querySelector('img').src = item.url;
    bigPicture.querySelector('.likes-count').textContent = item.likes;
    bigPicture.querySelector('.comments-count').textContent = item.comments.length;
    bigPicture.querySelector('.social__caption').textContent = item.description;

    var fragment = document.createDocumentFragment();
    // Сокращаем количество замыканий, использую конструктор
    fragment = new DocumentFragment();
    socialComments.textContent = '';

    item.comments.forEach(function (object) {
      fragment.appendChild(createComment(object));
    });

    return socialComments.appendChild(fragment);
  };

  // Функция закрытия большого изображения
  var bigPictureCancel = function () {
    bigPicture.classList.add('hidden');
  };

  // Функция для показа изображения в большом размере
  var showBigPicture = function (item) {
    bigPicture.classList.remove('hidden');
    var closeBigPicture = bigPicture.querySelector('.cancel');

    // Создаем нужные поля
    createBigImg(item);

    // Прячем некоторые блоки (счетчик комментариев и загрузку новых комментариев)
    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

    closeBigPicture.addEventListener('click', function (evt) {
      evt.stopPropagation();
      bigPictureCancel();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        bigPictureCancel();
      }
    });
  };

  // Обработка клика по фото.
  var smallPictureClickHandler = function (evt, array) {
    var target = evt.target;
    if (target.classList.contains('picture__img')) {
      var src = target.src;
      var position = src.indexOf('photos/');
      src = src.slice(position);
      position = src.indexOf('/');

      var numberPhoto = parseInt(src.slice(position + 1), 10);
      showBigPicture(array[numberPhoto - 1]);
    }
  };

  window.bigImg = {
    onClickPictureOpen: smallPictureClickHandler
  };
})();

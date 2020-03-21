'use strict';


// .......................................................
// Валидация
// .......................................................
(function () {
  var formElement = document.querySelector('#upload-select-image');
  var textHashtags = formElement.querySelector('.text__hashtags');
  var uploadSubmit = formElement.querySelector('#upload-submit');
  var textDescription = document.querySelector('.text__description');

  var LENGTH = 20;
  var COUNT_HASHTAGS = 5;
  var COMMENT_LENGTH = 140;

  var errorBorder = function (el) {
    el.style = 'border-color: red; border-width: 2px;';
  };

  var errorBorderCansel = function (el) {
    el.style = 'border: none;';
  };

  // Функция для превращения всех букв каждой сроки массива в строчные
  var turnInSmallLetters = function (array) {
    for (var i = 0; i < array.length; i++) {
      array[i] = array[i].toLowerCase();
    }
    return array;
  };

  // Функция проверки одинаковых хэш-тегов
  var compareElements = function (elements) {
    var arrayEl = turnInSmallLetters(elements);
    var values = Object.create(null);

    for (var i = 0; i < arrayEl.length; ++i) {
      var firstElement = elements[i];
      if (firstElement in values) {
        return true;
      }
      values[firstElement] = true;
    }
    return false;
  };

  // Функция отлавливающая ошибки при заполнении поля комментарий
  var hashtagValid = function () {
    var hashStr = textHashtags.value;
    hashStr.toLowerCase().trim();
    var hashTags = hashStr.split(' ');
    var errorMessage = '';

    for (var i = 0; i < hashTags.length; i++) {
      if (hashTags.length <= COUNT_HASHTAGS) {
        hashTags.forEach(function (item) {
          if (item[0] === '#') {
            if (item.length > LENGTH) {
              errorMessage = 'Длина хэш-тега не может быть больше ' + LENGTH + ' символов, включая решетку';
            }
          } else {
            errorMessage = 'Хэш-тег должен начинаться с символа #';
          }
          if (compareElements(hashTags)) {
            errorMessage = 'Один и тот же хэш-тег не может быть использован дважды';
          }
          if (item.length === 1) {
            errorMessage = 'Хеш-тег не может состоять только из одной решётки';
          }
          if (item.indexOf('#', 1) > 1) {
            errorMessage = 'Хэштеги должны разделяться пробелами';
          }
        });
      } else {
        errorMessage = 'Нельзя указать больше ' + COUNT_HASHTAGS + ' хэш-тегов';
      }
    }

    if (errorMessage !== '') {
      errorBorder(textHashtags);
    } else {
      errorBorderCansel(textHashtags);
    }
    textHashtags.setCustomValidity(errorMessage);
  };

  var commentValid = function (text) {
    if (text.length > COMMENT_LENGTH) {
      textDescription.setCustomValidity('Длина комментария не может быть больше 140 символов');
      errorBorder(textDescription);
      return false;
    } else {
      textDescription.setCustomValidity('');
      errorBorderCansel(textDescription);
      return true;
    }
  };

  var hashValid = function () {
    var hashtags = textHashtags.value.toLowerCase().split(' ');
    if (textHashtags.value !== '') {
      hashtagValid(hashtags);
    }

    var comment = textDescription.value.split('');
    if (textDescription.value !== '') {
      commentValid(comment);
    }
  };

  uploadSubmit.addEventListener('click', hashValid);

  window.validation = {
    textHashtags: textHashtags
  };
})();

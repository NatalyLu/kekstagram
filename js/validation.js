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

  var addErrorBorder = function (el) {
    el.style = 'border-color: red; border-width: 2px;';
  };

  var canselErrorBorder = function (el) {
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
    var hashtags = turnInSmallLetters(elements);
    var values = Object.create(null);

    for (var i = 0; i < hashtags.length; ++i) {
      var firstElement = elements[i];
      if (firstElement in values) {
        return true;
      }
      values[firstElement] = true;
    }
    return false;
  };

  // Функция отлавливающая ошибки при заполнении поля комментарий
  var checkHashtag = function () {
    var hashTegsText = textHashtags.value;
    hashTegsText.toLowerCase().trim();
    var hashTags = hashTegsText.split(' ');
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
          if (!item.match(/^#[a-zA-Z0-9а-яА-Я]+$/)) {
            errorMessage = 'Хэштег должен состоять из букв и чисел';
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
      addErrorBorder(textHashtags);
    } else {
      canselErrorBorder(textHashtags);
    }
    textHashtags.setCustomValidity(errorMessage);
  };

  var checkComment = function (text) {
    if (text.length > COMMENT_LENGTH) {
      textDescription.setCustomValidity('Длина комментария не может быть больше 140 символов');
      addErrorBorder(textDescription);
      return false;
    } else {
      textDescription.setCustomValidity('');
      canselErrorBorder(textDescription);
      return true;
    }
  };

  var checkForm = function () {
    var hashtags = textHashtags.value.toLowerCase().split(' ');
    if (textHashtags.value !== '') {
      checkHashtag(hashtags);
    }

    var comment = textDescription.value.split('');
    if (textDescription.value !== '') {
      checkComment(comment);
    }
  };

  uploadSubmit.addEventListener('click', checkForm);

  window.validation = {
    textHashtags: textHashtags
  };
})();

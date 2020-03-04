'use strict';


// .......................................................
// Валидация хэш-тега
// .......................................................
(function () {
  var textHashtags = document.querySelector('.text__hashtags');
  var LENGTH = 20;
  var COUNT_HASHTAGS = 5;

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
    var valuesSoFar = Object.create(null);

    for (var i = 0; i < arrayEl.length; ++i) {
      var firstElement = elements[i];
      if (firstElement in valuesSoFar) {
        return true;
      }
      valuesSoFar[firstElement] = true;
    }
    return false;
  };

  // Функция отлавливающая ошибки при заполнении поля комментарий
  var hashValid = function () {
    if (textHashtags.value !== '') {
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
    }
    textHashtags.setCustomValidity(errorMessage);
  };
  textHashtags.addEventListener('change', hashValid);

  window.validation = {
    textHashtags: textHashtags
  };
})();

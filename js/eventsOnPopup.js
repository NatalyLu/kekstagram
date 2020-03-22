'use strict';

// .......................................................
// Работа с окнами. Отлавливание событий
// .......................................................
(function () {
  var imgUploadText = window.effectsForPhoto.imgUpload.querySelector('.img-upload__text');
  var textHashtags = document.querySelector('.text__hashtags');
  var textDescription = imgUploadText.querySelector('.text__description');

  // Нажатие на Esc не приводит к закрытию формы, если фокус находится в поле ввода комментария или хэш-тега
  var textFocus = 1;
  var hashtagFocus = 1;

  textDescription.addEventListener('blur', function () {
    textFocus = 1;
  });

  textDescription.addEventListener('focus', function () {
    textFocus = 0;
  });

  textHashtags.addEventListener('blur', function () {
    hashtagFocus = 1;
  });

  textHashtags.addEventListener('focus', function () {
    hashtagFocus = 0;
  });

  var openPopupEscPress = function (evt) {
    if ((evt.keyCode === window.effectsForPhoto.ESC_KEYCODE) && (textFocus) && (hashtagFocus)) {
      closePopup();
    }
  };

  // Загрузка фото
  window.effectsForPhoto.uploadFile.addEventListener('change', function () {
    openPopup();
  });

  // Закрытие окна редактирования
  window.effectsForPhoto.buttonClose.addEventListener('click', function () {
    closePopup();
  });

  // Функции закрытия и открытия окна
  var openPopup = function () {
    window.effectsForPhoto.imgUpload.classList.remove('hidden');
    document.addEventListener('keydown', openPopupEscPress);
    window.effectsForPhoto.resizeImage(window.effectsForPhoto.STANDARD_VALUE);
    window.effectsForPhoto.imgUploadEffectLavel.style.display = 'none';
    window.effectsForPhoto.effectLevel.addEventListener('click', window.effectsForPhoto.changeCurrentEffect);
    window.effectsForPhoto.imgUploadScale.addEventListener('click', window.effectsForPhoto.onClickResize);
  };

  var closePopup = function () {
    document.removeEventListener('keydown', openPopupEscPress);
    window.effectsForPhoto.effectLevel.removeEventListener('click', window.effectsForPhoto.changeCurrentEffect);
    window.effectsForPhoto.imgUploadScale.removeEventListener('click', window.effectsForPhoto.onClickResize);
    window.effectsForPhoto.changeEffect(0);
    window.effectsForPhoto.installationValueOfEffect(0);
    window.validation.textHashtags.value = '';
    window.effectsForPhoto.imgUpload.classList.add('hidden');
  };

  window.eventsOnPopup = {
    closePopup: closePopup
  };
})();

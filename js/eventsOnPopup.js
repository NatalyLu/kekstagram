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

  // Зумирование изображения
  window.effectsForPhoto.imgUploadScale.addEventListener('click', window.effectsForPhoto.onClickResize);

  // Функции закрытия и открытия окна
  var openPopup = function () {
    window.effectsForPhoto.setZoomValue();
    window.effectsForPhoto.imgUpload.classList.remove('hidden');
    window.effectsForPhoto.imgUploadEffectLavel.style.display = 'none';
    document.addEventListener('keydown', openPopupEscPress);
  };

  var closePopup = function () {
    window.effectsForPhoto.imgUpload.classList.add('hidden');
    document.removeEventListener('keydown', openPopupEscPress);

    window.effectsForPhoto.effectLevel.removeEventListener('click', window.effectsForPhoto.changeCurrentEffect);
    window.effectsForPhoto.imgUploadScale.removeEventListener('click', window.effectsForPhoto.onClickResize);
    window.effectsForPhoto.changeEffect(0);
    window.effectsForPhoto.installationValueOfEffect(0);
    // сброс хэш-тега при закрытии окна
    window.validation.textHashtags.value = '';
  };

  window.eventsOnPopup = {
    closePopup: closePopup
  };
})();

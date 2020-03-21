'use strict';

// .......................................................
// Работа с окнами. Отлавливание событий
// .......................................................
(function () {
  var imgUploadText = window.EffectsForPhoto.imgUpload.querySelector('.img-upload__text');
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
    if ((evt.keyCode === window.EffectsForPhoto.ESC_KEYCODE) && (textFocus) && (hashtagFocus)) {
      closePopup();
    }
  };

  // Загрузка фото
  window.EffectsForPhoto.uploadFile.addEventListener('change', function () {
    openPopup();
  });

  // Закрытие окна редактирования
  window.EffectsForPhoto.buttonClose.addEventListener('click', function () {
    closePopup();
  });

  // Зумирование изображения
  window.EffectsForPhoto.imgUploadScale.addEventListener('click', window.EffectsForPhoto.onClickResize);

  // Функции закрытия и открытия окна
  var openPopup = function () {
    window.EffectsForPhoto.imgUpload.classList.remove('hidden');
    window.EffectsForPhoto.imgUploadEffectLavel.style.display = 'none';
    document.addEventListener('keydown', openPopupEscPress);
  };

  var closePopup = function () {
    window.EffectsForPhoto.imgUpload.classList.add('hidden');
    document.removeEventListener('keydown', openPopupEscPress);

    window.EffectsForPhoto.effectLevel.removeEventListener('click', window.EffectsForPhoto.changeCurrentEffect);
    window.EffectsForPhoto.imgUploadScale.removeEventListener('click', window.EffectsForPhoto.onClickResize);
    window.EffectsForPhoto.changeEffect(0);
    window.EffectsForPhoto.installationValueOfEffect(0);
    // сброс хэш-тега при закрытии окна
    window.validation.textHashtags.value = '';
  };

  window.eventsOnPopup = {
    closePopup: closePopup
  };
})();

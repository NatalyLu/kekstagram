'use strict';


// .......................................................
// Работа с всплывающим окном. Применение эффектов
// .......................................................
(function () {
  window.EffectsForPhoto = {
    ESC_KEYCODE: 27,

    uploadFile: document.getElementById('upload-file'),
    imgUpload: document.querySelector('.img-upload__overlay'),
    buttonClose: document.getElementById('upload-cancel'),

    effectsRadio: document.querySelectorAll('.effects__radio'),

    imgUploadEffectLavel: document.querySelector('.img-upload__effect-level'),
    imgUploadimg: document.querySelector('img'),
    scaleControlValue: document.querySelector('.scale__control--value'),

    effectLevel: document.querySelector('.effect-level'),
    levelPin: document.querySelector('.effect-level__pin'),
    levelLine: document.querySelector('.effect-level__line'),
    levelDepth: document.querySelector('.effect-level__depth'),
    levelValue: document.querySelector('.effect-level__value'),

    imgUploadScale: document.querySelector('.img-upload__scale'),
    imgUploadPreview: document.querySelector('.img-upload__preview'),

    zoomSettings: {
      scale: {
        min: 25,
        max: 100,
        step: 25
      }
    },

    // Функция для установки нужного значения для выбранного эффекта
    installationValueOfEffect: function (valueOfEffect) {
      switch (window.EffectsForPhoto.imgUploadimg.className) {
        case 'effects__preview--chrome':
          window.EffectsForPhoto.imgUploadimg.style.filter = 'grayscale(' + valueOfEffect / 100 + ')';
          break;
        case 'effects__preview--sepia':
          window.EffectsForPhoto.imgUploadimg.style.filter = 'sepia(' + valueOfEffect / 100 + ')';
          break;
        case 'effects__preview--marvin':
          window.EffectsForPhoto.imgUploadimg.style.filter = 'invert(' + valueOfEffect + '%)';
          break;
        case 'effects__preview--phobos':
          window.EffectsForPhoto.imgUploadimg.style.filter = 'blur(' + 3 * valueOfEffect / 100 + 'px)';
          break;
        case 'effects__preview--heat':
          window.EffectsForPhoto. imgUploadimg.style.filter = 'brightness(' + (valueOfEffect / 100 * 2 + 1) + ')';
          break;
        default:
          window.EffectsForPhoto.imgUploadimg.style.filter = 'none';
      }
    },

    // Функция для применения нового эффекта
    changeEffect: function (value) {
      if ((value <= 100) && (value >= 0)) {
        window.EffectsForPhoto.levelValue.value = value;
        window.EffectsForPhoto.levelValue.defaultValue = value;
        // Ставим курсор в нужное место и подтягиваем за ним линию с подсветкой
        window.EffectsForPhoto.levelPin.style.left = value + '%';
        window.EffectsForPhoto.levelDepth.style.width = value + '%';
      }
    },

    // Функция для определения процента применения эффекта
    findEffectValueInPercent: function (value, lineWidth, linePossitionLeft) {
      var valueEffect = value - linePossitionLeft;
      return Math.round(valueEffect * 100 / lineWidth);
    },

    // Функция задающая текущий эффект и сбрасывающая в 0 эффект при переключении на новый
    imgAddEffectHandler: function (evtClick) {
      var currentEffect = evtClick.currentTarget.value;

      if (currentEffect === 'none') {
        window.EffectsForPhoto.imgUploadimg.className = 'effects__preview--none';
        window.EffectsForPhoto.imgUploadEffectLavel.style.display = 'none';
        window.EffectsForPhoto.changeEffect(0);
        window.EffectsForPhoto.installationValueOfEffect(0);
      } else {
        window.EffectsForPhoto.imgUploadimg.className = 'effects__preview--' + currentEffect;
        window.EffectsForPhoto.imgUploadEffectLavel.style.display = 'block';
        window.EffectsForPhoto.scaleControlValue.value = '100%';
        window.EffectsForPhoto.imgUploadPreview.style.transform = 'scale(1)';
        window.EffectsForPhoto.changeEffect(100);
        window.EffectsForPhoto.installationValueOfEffect(100);
      }
    },

    // Функция для определения нового значения координаты Х у курсора
    knowCurrentClientX: function (evtCurrent) {
      return (evtCurrent.clientX);
    },
    // Функция для изменения эффекта у фото и отрисовки линии полозунка по новому Х
    changeCurrentEffect: function (evt) {
      var length = window.EffectsForPhoto.levelLine.offsetWidth;
      var LevelPosition = window.EffectsForPhoto.levelLine.getBoundingClientRect().left;

      var findEffect = window.EffectsForPhoto.findEffectValueInPercent(window.EffectsForPhoto.knowCurrentClientX(evt), length, LevelPosition);
      window.EffectsForPhoto.changeEffect(findEffect);
      window.EffectsForPhoto.installationValueOfEffect(findEffect);
    },

    // Функция применения зуммирования
    resizeImage: function (value) {
      window.EffectsForPhoto.scaleControlValue.value = value + '%';
      window.EffectsForPhoto.imgUploadPreview.style.transform = 'scale(' + value / 100 + ')';
    },

    // Функция определения типа зуммирования +-
    getTypeResize: function (evt) {
      var typeResize = evt.target.className;
      var indexTypePosition = typeResize.indexOf('--');
      return typeResize.slice(indexTypePosition + 2);
    },

    // Функция определение конечного значения зуммирования
    onClickResize: function (evt) {
      var currentValue = parseInt(window.EffectsForPhoto.scaleControlValue.value, 10);
      var typeResize = window.EffectsForPhoto.getTypeResize(evt);

      if (currentValue > window.EffectsForPhoto.zoomSettings.scale.min && typeResize === 'smaller') {
        currentValue -= window.EffectsForPhoto.zoomSettings.scale.step;
      } else if (currentValue < window.EffectsForPhoto.zoomSettings.scale.max && typeResize === 'bigger') {
        currentValue += window.EffectsForPhoto.zoomSettings.scale.step;
      }

      window.EffectsForPhoto.resizeImage(currentValue);
    }
  };
})();

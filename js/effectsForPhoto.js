'use strict';

// .......................................................
// Работа с всплывающим окном. Применение эффектов
// .......................................................
(function () {
  window.effectsForPhoto = {
    ESC_KEYCODE: 27,
    // STANDARD_VALUE используется в качестве стандартного (дефолтного) значения для зуммирования, насыщенности выбранного фильтра
    STANDARD_VALUE: '100',
    // Для рассчетов фильтров (в css)
    EFFECT_VALUE: 100,
    BLUR_MAX: 3,
    BRIGHTNESS_MAX: 2,
    BRIGHTNESS_MIN: 1,

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
        MIN: 25,
        MAX: 100,
        STEP: 25
      }
    },

    // Функция для установки нужного значения для выбранного эффекта
    installationValueOfEffect: function (valueOfEffect) {
      switch (window.effectsForPhoto.imgUploadimg.className) {
        case 'effects__preview--chrome':
          window.effectsForPhoto.imgUploadimg.style.filter = 'grayscale(' + valueOfEffect / window.effectsForPhoto.EFFECT_VALUE + ')';
          break;
        case 'effects__preview--sepia':
          window.effectsForPhoto.imgUploadimg.style.filter = 'sepia(' + valueOfEffect / window.effectsForPhoto.EFFECT_VALUE + ')';
          break;
        case 'effects__preview--marvin':
          window.effectsForPhoto.imgUploadimg.style.filter = 'invert(' + valueOfEffect + '%)';
          break;
        case 'effects__preview--phobos':
          window.effectsForPhoto.imgUploadimg.style.filter = 'blur(' + window.effectsForPhoto.BLUR_MAX * valueOfEffect / window.effectsForPhoto.EFFECT_VALUE + 'px)';
          break;
        case 'effects__preview--heat':
          window.effectsForPhoto. imgUploadimg.style.filter = 'brightness(' + (valueOfEffect / window.effectsForPhoto.EFFECT_VALUE * window.effectsForPhoto.BRIGHTNESS_MAX + window.effectsForPhoto.BRIGHTNESS_MIN) + ')';
          break;
        default:
          window.effectsForPhoto.imgUploadimg.style.filter = 'none';
      }
    },

    // Функция для применения нового эффекта
    changeEffect: function (value) {
      if ((value <= 100) && (value >= 0)) {
        window.effectsForPhoto.levelValue.value = value;
        window.effectsForPhoto.levelValue.defaultValue = value;
        // Ставим курсор в нужное место и подтягиваем за ним линию с подсветкой
        window.effectsForPhoto.levelPin.style.left = value + '%';
        window.effectsForPhoto.levelDepth.style.width = value + '%';
      }
    },

    // Функция для определения процента применения эффекта
    findEffectValueInPercent: function (value, lineWidth, linePossitionLeft) {
      var valueEffect = value - linePossitionLeft;
      return Math.round(valueEffect * 100 / lineWidth);
    },

    // Задаем текущий эффект и сбрасываем в 0 эффект при переключении на новый
    filterClickHandler: function (evtClick) {
      var currentEffect = evtClick.currentTarget.value;

      if (currentEffect === 'none') {
        window.effectsForPhoto.imgUploadimg.className = 'effects__preview--none';
        window.effectsForPhoto.imgUploadEffectLavel.style.display = 'none';
        window.effectsForPhoto.changeEffect(0);
        window.effectsForPhoto.installationValueOfEffect(0);
      } else {
        window.effectsForPhoto.imgUploadimg.className = 'effects__preview--' + currentEffect;
        window.effectsForPhoto.imgUploadEffectLavel.style.display = 'block';
        window.effectsForPhoto.resizeImage(window.effectsForPhoto.STANDARD_VALUE);
        window.effectsForPhoto.imgUploadPreview.style.transform = 'scale(1)';
        window.effectsForPhoto.changeEffect(100);
        window.effectsForPhoto.installationValueOfEffect(100);
      }
    },

    // Функция для определения нового значения координаты Х у курсора
    knowCurrentClientX: function (evtCurrent) {
      return (evtCurrent.clientX);
    },

    // Функция для изменения эффекта у фото и отрисовки линии полозунка по новому Х
    changeCurrentEffect: function (evt) {
      var length = window.effectsForPhoto.levelLine.offsetWidth;
      var levelPosition = window.effectsForPhoto.levelLine.getBoundingClientRect().left;

      var findEffect = window.effectsForPhoto.findEffectValueInPercent(window.effectsForPhoto.knowCurrentClientX(evt), length, levelPosition);
      window.effectsForPhoto.changeEffect(findEffect);
      window.effectsForPhoto.installationValueOfEffect(findEffect);
    },

    // Функция применения зуммирования
    // setZoomValue: function () {
    //   window.effectsForPhoto.scaleControlValue.value = window.effectsForPhoto.STANDARD_ZOOM_VALUE;
    // },

    // Функция применения зуммирования
    resizeImage: function (value) {
      window.effectsForPhoto.scaleControlValue.value = value + '%';
      window.effectsForPhoto.imgUploadPreview.style.transform = 'scale(' + value / 100 + ')';
    },

    // Функция определения типа зуммирования +-
    getTypeResize: function (evt) {
      var typeResize = evt.target.className;
      var indexTypePosition = typeResize.indexOf('--');
      return typeResize.slice(indexTypePosition + 2);
    },

    // Функция определение конечного значения зуммирования
    onClickResize: function (evt) {
      var currentValue = parseInt(window.effectsForPhoto.scaleControlValue.value, 10);
      var typeResize = window.effectsForPhoto.getTypeResize(evt);

      if (currentValue > window.effectsForPhoto.zoomSettings.scale.MIN && typeResize === 'smaller') {
        currentValue -= window.effectsForPhoto.zoomSettings.scale.STEP;
      } else if (currentValue < window.effectsForPhoto.zoomSettings.scale.MAX && typeResize === 'bigger') {
        currentValue += window.effectsForPhoto.zoomSettings.scale.STEP;
      }

      window.effectsForPhoto.resizeImage(currentValue);
    }
  };
})();

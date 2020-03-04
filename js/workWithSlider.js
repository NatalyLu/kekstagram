'use strict';


// **************************************************************
// Обработка событий мыши в ползунке
// **************************************************************
(function () {
  // Обработка клика по линии ползунка
  window.EffectsForPhoto.effectLevel.addEventListener('click', window.EffectsForPhoto.changeCurrentEffect);

  // Обработка перемещения ползунка
  window.EffectsForPhoto.levelPin.addEventListener('mousedown', function (evt) {
    // Отмена действий браузера
    evt.preventDefault();

    var levelParametrs = {
      levelLineLength: window.EffectsForPhoto.levelLine.offsetWidth,
      LevelLeftPosition: window.EffectsForPhoto.levelLine.getBoundingClientRect().left
    };

    // Функция для ограничения позиции курсора на шкале
    var coorsorMoveHandler = function (evtMove) {
      var skalePosition = window.EffectsForPhoto.knowCurrentClientX(evtMove);

      // Ограничиваем перемещение ползунка
      if (skalePosition < levelParametrs.LevelLeftPosition) {
        skalePosition = levelParametrs.LevelLeftPosition;
      }
      if (skalePosition > levelParametrs.LevelLeftPosition + levelParametrs.levelLineLength) {
        skalePosition = levelParametrs.LevelLeftPosition + levelParametrs.levelLineLength;
      }

      window.EffectsForPhoto.changeCurrentEffect(evtMove);
    };

    // Функция для удаления обработчиков
    var mouseUpHandler = function () {
      document.removeEventListener('mousemove', coorsorMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', coorsorMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  // Обработка клика по маленькой картинке (перемещщение между фильтрами)
  window.EffectsForPhoto.effectsRadio.forEach(function (evtItem) {
    evtItem.addEventListener('click', window.EffectsForPhoto.imgAddEffectHandler);
  });
})();

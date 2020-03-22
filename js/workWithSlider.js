'use strict';

// .......................................................
// Обработка событий мыши в ползунке
// .......................................................
(function () {
  // Обработка клика по линии ползунка
  window.effectsForPhoto.effectLevel.addEventListener('click', window.effectsForPhoto.changeCurrentEffect);

  // Обработка перемещения ползунка
  window.effectsForPhoto.levelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var levelParametrs = {
      levelLineLength: window.effectsForPhoto.levelLine.offsetWidth,
      levelLeftPosition: window.effectsForPhoto.levelLine.getBoundingClientRect().left
    };

    // Функция для ограничения позиции курсора на шкале
    var coorsorMoveHandler = function (evtMove) {
      var skalePosition = window.effectsForPhoto.knowCurrentClientX(evtMove);

      // Ограничиваем перемещение ползунка
      if (skalePosition < levelParametrs.levelLeftPosition) {
        skalePosition = levelParametrs.levelLeftPosition;
      }
      if (skalePosition > levelParametrs.levelLeftPosition + levelParametrs.levelLineLength) {
        skalePosition = levelParametrs.levelLeftPosition + levelParametrs.levelLineLength;
      }

      window.effectsForPhoto.changeCurrentEffect(evtMove);
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
  window.effectsForPhoto.effectsRadio.forEach(function (item) {
    item.addEventListener('click', window.effectsForPhoto.filterClickHandler);
  });
})();

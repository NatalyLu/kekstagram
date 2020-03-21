'use strict';


// .......................................................
// Работа с всплывающим окном. Применение эффектов
// .......................................................
(function () {
  var imgLoadForm = document.querySelector('.img-upload__form');
  var mainTeg = document.querySelector('main');
  var uploadOverlay = document.querySelector('.img-upload__overlay');

  // Функция для обработки успешной загруузки изображения
  var loadImgSuccessful = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
    mainTeg.appendChild(successTemplate);

    var findClickSuccessClick = function (evt) {
      if ((evt.target.className !== 'success__inner') && (evt.target.className !== 'success__title')) {
        findClickSuccess();
      }
    };

    var findClickSuccess = function () {
      if (successTemplate) {
        mainTeg.removeChild(successTemplate);
      }
      document.removeEventListener('click', findClickSuccessClick);
      document.removeEventListener('keydown', succesKeydownHandler);
    };

    document.addEventListener('click', findClickSuccessClick);

    var succesKeydownHandler = function (evt) {
      window.createData.isEscEvent(evt, findClickSuccess);
    };

    document.addEventListener('keydown', succesKeydownHandler);
  };

  // Функция для обработки некорректной загрузки изображения
  var loadImgUnsuccessful = function () {
    uploadOverlay.classList.add('hidden');

    var errorPopup = document.querySelector('#error').content.cloneNode(true);
    mainTeg.appendChild(errorPopup);
    var error = document.querySelector('.error');

    var closeErrorClick = function (evt) {
      if ((evt.target.className !== 'error__inner') && (evt.target.className !== 'error__title')) {
        closeError();
      }
    };

    var closeError = function () {
      if (error) {
        mainTeg.removeChild(error);
      }
      document.removeEventListener('click', closeError);
      document.removeEventListener('keydown', errorKeydownHandler);
    };

    document.addEventListener('click', closeErrorClick);

    var errorKeydownHandler = function (evt) {
      window.createData.isEscEvent(evt, closeError);
    };
    document.addEventListener('keydown', errorKeydownHandler);
  };

  imgLoadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.eventsOnPopup.closePopup();
    window.loadData.saveData(new FormData(imgLoadForm), loadImgSuccessful, loadImgUnsuccessful);
    window.loadPhoto.imgLoadForm.reset();

  });

  window.loadPhoto = {
    imgLoadForm: imgLoadForm,
    mainClass: mainTeg
  };
})();

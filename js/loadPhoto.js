'use strict';


// .......................................................
// Работа с всплывающим окном. Применение эффектов
// .......................................................
(function () {
  var imgLoadForm = document.querySelector('.img-upload__form');

  // Функция для обработки успешной загруузки изображения
  var loadImgSuccessful = function () {
    var successTemplate = document.querySelector('#success').content
    .querySelector('.success').cloneNode(true);
    document.querySelector('main').appendChild(successTemplate);
    var success = document.querySelector('.success');
    //successTemplate.classList.remove('visually-hidden');
    var successButton = document.querySelector('.success__button');

    // var hideSuccessPopup = function () {
    //   success.classList.add('visually-hidden');
    //  // successButton.removeEventListener('keydown');  main.removeChild(errorPopup);
    // };

    // successButton.addEventListener('click', hideSuccessPopup);

    var findClickSuccess = function (evt) {
      //var target = evt.target;
      //if (target.className === success.className) {
        successTemplate.classList.add('visually-hidden');
     // }
      successButton.removeEventListener('click', findClickSuccess);
    };

    success.addEventListener('click', findClickSuccess);



  };

  // Функция для обработки некорректной загрузки изображения
  var loadImgUnsuccessful = function () {
    var error = document.querySelector('.error');
    var errorButtons = document.querySelectorAll('.error__button');
    if (!error) {
      var errorTemplate = document.querySelector('#error').content
      .querySelector('.error').cloneNode(true);
      document.querySelector('main').appendChild(errorTemplate);

      errorButtons.forEach(function (item) {
        item.addEventListener('click', function () {
          error.classList.add('visually-hidden');
        });
      });

      var findClickError = function (evt) {
        var target = evt.target;
        if (target.className === error.className) {
          error.classList.add('visually-hidden');
        }
      };

      error.addEventListener('click', findClickError);
    } else {
      document.querySelector('.error').classList.remove('visually-hidden');
    }
  };







  imgLoadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.eventsOnPopup.closePopup();
    window.loadData.saveData(new FormData(imgLoadForm), loadImgSuccessful, loadImgUnsuccessful);
    window.loadPhoto.imgLoadForm.reset();

  });

  window.loadPhoto = {
    imgLoadForm: imgLoadForm
  };
})();

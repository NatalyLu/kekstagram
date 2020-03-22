'use strict';

// .......................................................
// Загрузка данных
// .......................................................
(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_SAVE = 'https://js.dump.academy/kekstagram';

  var TIMEOUT = 10000;
  var STATUS = 200;

  // Функция загрузки данных
  var submitRequest = function (setOfData, onError) {

    var xhr = new XMLHttpRequest();

    // Браузер произведет необходимые трансформации сам. Мы получим только результат в поле xhr.response.
    xhr.responseType = 'json';

    // Ждем ответ
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS) {
        setOfData(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.timeout = TIMEOUT;

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  var savePackage = function (item, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      var errorMessage = '';
      if (xhr.status === STATUS) {
        onLoad(xhr.response);
      } else {
        errorMessage = 'Статус ошибки: ' + xhr.status;
      }
      if (errorMessage) {
        onError(errorMessage);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс!');
    });

    xhr.open('POST', URL_SAVE);
    xhr.send(item);
  };

  window.loadData = {
    submitRequest: submitRequest,
    savePackage: savePackage
  };
})();

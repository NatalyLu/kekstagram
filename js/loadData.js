'use strict';

// .......................................................
// Загрузка данных.
// .......................................................
(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_SAVE = 'https://js.dump.academy/kekstagram';

  var TIMEOUT = 10000;
  var STATUS = 200;

  // Функция загрузки данных
  var loadData = function (setOfData) {

    var xhr = new XMLHttpRequest();

    // Браузер произведет необходимые трансформации сам. Мы получим только результат в поле xhr.response.
    xhr.responseType = 'json';

    // Ждем ответ
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS) {
        setOfData(xhr.response);
      } else {
        window.onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      window.onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      window.onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  var saveData = function (item, onLoad, onError) {
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
    loadData: loadData,
    saveData: saveData
  };
})();

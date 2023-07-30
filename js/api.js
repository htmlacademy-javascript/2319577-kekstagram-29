const OFF_SITE_SERVER = 'https://29.javascript.pages.academy/kekstagram'; // адрес удаленного сервера

const Route = { // путь
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = { // метод отправки
  GET: 'GET',
  POST: 'POST',
};

const ErrorMessage = { // текст ошибки
  GET_MESSAGE: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_MESSAGE: 'Не удалось отправить форму. Попробуйте ещё раз',
};

// Функция загрузки данных (путь, текст ошибки, метод отправки, полезные данные)
const dataLoad = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${OFF_SITE_SERVER}${route}`, {method, body}) // передается путь, аргумент настроек
    .then((response) => { // объект ответа
      if (!response.ok) { // сервер ответил кодом, который не является положительным
        throw new Error(`Произошла ошибка ${response.status}: ${response.statusText}`);
      }
      return response.json(); // данные которые вернул сервер
    })
    .catch(() => { // если промис не разрешился, произошла ошибка
      throw new Error(errorText);
    });

// Функция получения данных с сервера (даные получаем чз GET, иначе - текст ошибки)
const getData = () => dataLoad(Route.GET_DATA, ErrorMessage.GET_MESSAGE);

// Функция отправки данных на сервер, форму отправляем чз POST (body полезые данные-отправка формы)
const sendData = (body) => dataLoad(Route.SEND_DATA, ErrorMessage.SEND_MESSAGE, Method.POST, body);

export {getData, sendData}; // экспорт в load.js

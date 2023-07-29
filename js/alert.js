const ALERT_SHOW_TIME = 5000;

// Функция показывающая сообщение при неудачной попытки получения данных с сервера
const showAlertError = (message) => {
  const alertContainer = document.createElement('div'); // создаем элемент div в коде
  alertContainer.classList.add('error-alert'); // добавление div элементу класса error-alert

  alertContainer.textContent = message; // записываем в div текст

  document.body.append(alertContainer);

  // функция удаления ошибки чз заданное кол-во времени
  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {showAlertError};

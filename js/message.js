import {isEscapeKey} from './util.js';

const errorMessage = document.querySelector('#error').content.querySelector('.error'); // cообщение с ошибкой загрузки изображения
const successMessage = document.querySelector('#success').content.querySelector('.success'); // cообщение об успешной загрузке изображения

// Тип сообщения
const typeMessage = () => document.querySelector('.error, .success');

// Функция для закрытия сообщения с помощью клавиатуры
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseMessage();
  }
}

// Функция отмены действия нажатия Esc для закрытия модалки, когда курсор в поле ввода форм
function onFormFieldKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

const isMessageTarget = (evt) => evt.target === typeMessage();

// Функция для закрытия сообщения при клике по документу
const onBodyClick = (evt) => {
  if (isMessageTarget(evt)) {
    evt.preventDefault();
    onCloseMessage();
  }
};

// Функция закрытия сообщения
function onCloseMessage () {
  if (typeMessage()) {
    typeMessage().remove();
  }
  document.addEventListener('keydown', onFormFieldKeydown); // добавить обработчик событий при нажатии на клавишу
  document.removeEventListener('click', onBodyClick); // удалить обработчик событий при клике вне сообщеня окна
  document.removeEventListener('keydown', onDocumentKeydown); // удалить обработчик событий при нажатии на клавишу
}

// Общая функция по показу сообщения
const showMessage = (messageElement, closeBtnClass) => {
  document.body.append(messageElement); // добавляем элемент
  document.addEventListener('click', onBodyClick); // добавит обработчик событий при клике вне сообщеня окна
  document.addEventListener('keydown', onDocumentKeydown); // добавит обработчик событий при нажатии на клавишу
  messageElement.querySelector(closeBtnClass).addEventListener('click', onCloseMessage); // закрытие сообщения
};

// Функция по показу сообщения об успешной загрузки изображения
const showSuccessMessage = () => {
  showMessage(successMessage, '.success__button');
};

// Функция по показу сообщения с ошибкой загрузки изображения
const showErrorMessage = () => {
  showMessage(errorMessage, '.error__button');
  document.removeEventListener('keydown', onFormFieldKeydown); // удалить обработчик событий при нажатии на клавишу
};

export {showSuccessMessage, showErrorMessage}; // экспорт в form-upload.js

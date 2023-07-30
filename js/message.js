import {isEscapeKey} from './util.js';
import {onFormFieldKeydown} from './form-upload.js';

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

export {showSuccessMessage, showErrorMessage};

// import {isEscapeKey} from './util.js';

// const bodyElement = document.querySelector('body');
// const errorBooklet = document.querySelector('#error').content.querySelector('.error'); // cообщение с ошибкой загрузки изображения
// const successBooklet = document.querySelector('#success').content.querySelector('.success'); // cообщение об успешной загрузке изображения

// // Функция отрисовки всплывающего сообщения
// function renderBooklet() {
//   const popupContainer = document.querySelector('main');

//   errorBooklet.classList.add('hidden');
//   successBooklet.classList.add('hidden');

//   popupContainer.insertAdjacentElement('afterbegin', errorBooklet);
//   popupContainer.insertAdjacentElement('afterbegin', successBooklet);
// }

// renderBooklet();

// // Функция отображения Всплывающего сообщения
// function showBooklet(cls) {
//   const booklet = bodyElement.querySelector(`.${cls}`);
//   const bookletInner = bodyElement.querySelector(`.${cls}__inner`);
//   const bookletCloseButton = booklet.querySelector(`.${cls}__button`);
//   booklet.classList.remove('hidden');

//   // // Функция скрытия всплывающего сообщения при нажатии кнопки Esc
//   const onDocumentKeydown = (evt) => {
//     if (isEscapeKey(evt)) {
//       evt.preventDefault();
//       closePopup();
//     }
//   };

//   // Функция скрытия всплывающего сообщения при клике по любой области на странице
//   const onScreenAreaClick = (area) => {
//     const click = area.composedPath().includes(bookletInner);
//     if (!click) {
//       closePopup();
//     }
//   };

//   // Функция скрытия всплывающего сообщения при клике на кнопку
//   const oncloseButtonClick = () => {
//     closePopup();
//   };

//   // Добавляем обработчики событий на клик по кнопке и любой области, и по нажатию Esc
//   document.addEventListener('keydown', onDocumentKeydown);
//   booklet.addEventListener('click', onScreenAreaClick);
//   bookletCloseButton.addEventListener('click', oncloseButtonClick);

//   // Функция закрытия всплывающего сообщения
//   function closePopup () {
//     bodyElement.querySelector(`.${cls}`).classList.add('hidden');

//     document.removeEventListener('keydown', onDocumentKeydown);
//     booklet.removeEventListener('click',onScreenAreaClick);
//     bookletCloseButton.removeEventListener('click', oncloseButtonClick);
//   }
// }

// export {showBooklet}; // экспорт в form-upload.js

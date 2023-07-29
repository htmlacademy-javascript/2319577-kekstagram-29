import {isEscapeKey} from './util.js';

const bodyElement = document.querySelector('body');
const errorBooklet = document.querySelector('#error').content.querySelector('.error'); // cообщение с ошибкой загрузки изображения
const successBooklet = document.querySelector('#success').content.querySelector('.success'); // cообщение об успешной загрузке изображения

// Функция отрисовки всплывающего сообщения
function renderBooklet() {
  const popupContainer = document.querySelector('main');

  errorBooklet.classList.add('hidden');
  successBooklet.classList.add('hidden');

  popupContainer.insertAdjacentElement('afterbegin', errorBooklet);
  popupContainer.insertAdjacentElement('afterbegin', successBooklet);
}

renderBooklet();

// Функция отображения Всплывающего сообщения
function showBooklet(cls) {
  const booklet = bodyElement.querySelector(`.${cls}`);
  const bookletInner = bodyElement.querySelector(`.${cls}__inner`);
  const bookletCloseButton = booklet.querySelector(`.${cls}__button`);
  booklet.classList.remove('hidden');

  // // Функция скрытия всплывающего сообщения при нажатии кнопки Esc
  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePopup();
    }
  };

  // Функция скрытия всплывающего сообщения при клике по любой области на странице
  const onScreenAreaClick = (area) => {
    const click = area.composedPath().includes(bookletInner);
    if (!click) {
      closePopup();
    }
  };

  // Функция скрытия всплывающего сообщения при клике на кнопку
  const oncloseButtonClick = () => {
    closePopup();
  };

  // Добавляем обработчики событий на клик по кнопке и любой области, и по нажатию Esc
  document.addEventListener('keydown', onDocumentKeydown);
  booklet.addEventListener('click', onScreenAreaClick);
  bookletCloseButton.addEventListener('click', oncloseButtonClick);

  // Функция закрытия всплывающего сообщения
  function closePopup () {
    bodyElement.querySelector(`.${cls}`).classList.add('hidden');

    document.removeEventListener('keydown', onDocumentKeydown);
    booklet.removeEventListener('click',onScreenAreaClick);
    bookletCloseButton.removeEventListener('click', oncloseButtonClick);
  }
}

export {showBooklet};

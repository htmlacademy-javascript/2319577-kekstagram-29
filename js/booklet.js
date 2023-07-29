import {isEscapeKey} from './util.js';

const bodyElement = document.querySelector('body');
const errorBooklet = document.querySelector('#error').content.querySelector('.error'); // cообщение с ошибкой загрузки изображения
const successBooklet = document.querySelector('#success').content.querySelector('.success'); // cообщение об успешной загрузке изображения

function renderBooklet() {
  const popupContainer = document.querySelector('main');

  errorBooklet.classList.add('hidden');
  successBooklet.classList.add('hidden');

  popupContainer.insertAdjacentElement('afterbegin', errorBooklet);
  popupContainer.insertAdjacentElement('afterbegin', successBooklet);
}

renderBooklet();

function showBooklet(cls) {
  const booklet = bodyElement.querySelector(`.${cls}`);
  const bookletInner = bodyElement.querySelector(`.${cls}__inner`);
  const bookletCloseButton = booklet.querySelector(`.${cls}__button`);
  booklet.classList.remove('hidden');

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePopup();
    }
  };

  const onScreenAreaClick = (area) => {
    const click = area.composedPath().includes(bookletInner);
    if (!click) {
      closePopup();
    }
  };

  const oncloseButtonClick = () => {
    closePopup();
  };

  document.addEventListener('keydown', onDocumentKeydown);
  bookletCloseButton.addEventListener('click', oncloseButtonClick);
  booklet.addEventListener('click', onScreenAreaClick);

  function closePopup () {
    bodyElement.querySelector(`.${cls}`).classList.add('hidden');

    document.removeEventListener('keydown', onDocumentKeydown);
    bookletCloseButton.removeEventListener('click', oncloseButtonClick);
    booklet.removeEventListener('click',onScreenAreaClick);
  }
}

export {showBooklet};

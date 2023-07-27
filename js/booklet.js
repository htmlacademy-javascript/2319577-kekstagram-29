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
  const closeButton = booklet.querySelector(`.${cls}__button`);
  booklet.classList.remove('hidden');
  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePopup();
    }
  };

  const oncloseButtonClick = () => {
    closePopup();
  };

  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', oncloseButtonClick);

  function closePopup () {
    bodyElement.querySelector(`.${cls}`).classList.add('hidden');

    document.removeEventListener('keydown', onDocumentKeydown);
    closeButton.removeEventListener('click', oncloseButtonClick);
  }
}

export {showBooklet};

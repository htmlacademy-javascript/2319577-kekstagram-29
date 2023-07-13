import './pictures.js';
import {isEscapeKey} from './util.js';

const bigPictureModal = document.querySelector('.big-picture'); // находим секцию (контейнер) модального окна
const picturesContainer = document.querySelector('.pictures'); // находим контейнер с изображениями всех карточек
const bigPictureModalClose = bigPictureModal.querySelector('.big-picture__cancel'); // находим кнопку закрытия модального окна

// Функция обработчика событий для нажатия с клавиатуры кнопки Esc, для закрытия модалки
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) { // логика: если нажимается кнопка Esc - делаешь то-то..
    evt.preventDefault(); // сброс действия по умолчанию
    closeBigPicture (); // закрытие модалки
  }
};

// Функция открытия модального окна
function openBigPicture () {
  bigPictureModal.classList.remove('hidden'); // удаляем hidden, чтобы отобразить модальное окно
  document.querySelector('body').classList.add('modal-open'); // добавляем, чтобы контейнер с карточками позади не прокручивался при скролле

  document.addEventListener('keydown', onDocumentKeydown); // добавляем "событие" на нажатие кнопки Esc
  bigPictureModalClose.addEventListener('click', closeBigPicture); // добавляем "событие" на клик по кнопке закрытия модалки
}

// Функция закрытия модального окна
function closeBigPicture () {
  bigPictureModal.classList.add('hidden'); // добавляем hidden, чтобы отобразить модальное окно
  document.querySelector('body').classList.remove('modal-open'); // убираем, тк более нет необходимости

  document.removeEventListener('keydown', onDocumentKeydown); // удаляем "событие" на нажатие кнопки Esc
  bigPictureModalClose.removeEventListener('click', closeBigPicture); // удаляем "событие" на клик по кнопке закрытия модалки
}

// Функция для устранения нажатия по доп. элементам карточки
const onPicturesContainerClick = (evt) => {
  if (evt.target.closest('.picture')){ // поиск ближайшего родителя (closest)
    openBigPicture (); // выполнение функции открытия модалки
  }
};

picturesContainer.addEventListener('click', onPicturesContainerClick);

import {sendData} from './api.js';
import {isEscapeKey} from './util.js';
import {showUploadPhoto} from './user-photo.js';
import {showSuccessMessage, showErrorMessage} from './message.js';
import {pristine} from './form-validation.js';
import {resetScale, initScale} from './scale.js';
import {initSlider, hideSlider, resetEffect} from './effect-slider.js';

const bodyElement = document.querySelector('body');
const uploadOverlay = document.querySelector('.img-upload__overlay'); // находим форму редактирования изо-й
const uploadInput = document.querySelector('.img-upload__input'); // находим поле загрузки изо-я
const uploadSubmit = document.querySelector('.img-upload__submit'); // находим кнопку "Опубликовать" для отправки данных на сервер
const uploadCancel = document.querySelector('.img-upload__cancel'); // находим кнопку закрытия редактора изо-я
const textHashtags = uploadOverlay.querySelector('.text__hashtags'); // находим поле ввода хэштегов
const textDescription = uploadOverlay.querySelector('.text__description'); // находим поле ввода ком-ев
const uploadForm = document.querySelector('.img-upload__form'); // находим форму для загрузки нов. изо-я

const submitText = { // текст на кнопке "Опубликовать"
  UNBLOCK: 'Опубликовать',
  BLOCK: 'Публикую...'
};

// Функция закрытия модального окна добавления нового изо-я
const closeModal = () => {
  uploadForm.reset(); // восстанавливает стандартные значения
  resetEffect(); // сброс эффектов слайдера
  resetScale(); // сброс эффектов маштаба
  pristine.reset();

  uploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  uploadInput.value = '';

  // удаляем обработчики событий
  document.removeEventListener('keydown', onDocumentKeydown);
  textHashtags.removeEventListener('keydown', onFormFieldKeydown);
  textDescription.removeEventListener('keydown', onFormFieldKeydown);
};

// Функция открытия модального окна добавления нового изо-я
const openModal = () => {
  uploadOverlay.classList.remove('hidden'); // показать подложку
  bodyElement.classList.add('modal-open'); // отключаем скрол под подложкой
  showUploadPhoto(); // отображение загружаемой фото
  hideSlider(); // скрывается слайдер при первоночальном показе

  uploadCancel.addEventListener('click', closeModal);

  // добавление обработчиков событий
  document.addEventListener('keydown', onDocumentKeydown);
  textHashtags.addEventListener('keydown', onFormFieldKeydown);
  textDescription.addEventListener('keydown', onFormFieldKeydown);
};

// Функция разблокировки кнопки "Опубликовать", после получения ответа от сервера
function unblockUploadSubmit () {
  uploadSubmit.disabled = false;
  uploadSubmit.textContent = submitText.UNBLOCK;
}

// Функция блокировки кнопки "Опубликовать" для избежания отправки формы несколько раз
function blockUploadSubmit () {
  uploadSubmit.disabled = true;
  uploadSubmit.textContent = submitText.BLOCK;
}

// Функция отмены действия нажатия Esc для закрытия модалки, когда курсор в поле ввода форм
function onFormFieldKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

// Находим элементы в фокусе
// const isInputFocus = () => {
//   if (document.activeElement === textHashtags || document.activeElement === textDescription) {
//     return true;
//   }
// };

// Функция для закрытия подложки при нажатии Esc, за исключением, когда поле ввода в фокусе
// function onFormFieldKeydown (evt) {
//   if (isEscapeKey(evt) && !(isInputFocus())) {
//     evt.preventDefault();
//     closeModal();
//   }
// }

// Функция закрытия модалки при нажатии Esc
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

textHashtags.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

textDescription.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

// Функция отображения Всплывающих сообщений
const uploadFormData = async () => {
  try {
    const formData = new FormData(uploadForm);
    blockUploadSubmit(); // блокировать кнопку "Опубликовать"
    await sendData(formData);
    unblockUploadSubmit(); // разблокировать кнопку "Опубликовать"
    showSuccessMessage(); // показать сообщение об успешной загрузке фото
    closeModal();
  } catch {
    showErrorMessage(); // показать сообщение об ошибке загрузки фото
    unblockUploadSubmit(); // разблокировать кнопку "Опубликовать"
  }
};

uploadInput.addEventListener('change', openModal);
initSlider(); // бегунок слайдера
initScale(); // маштабирование

export {onFormFieldKeydown, uploadFormData}; // экспорт в message.js и в form-validation.js

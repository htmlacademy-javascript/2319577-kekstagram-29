import {sendData} from './api.js';
import {isEscapeKey} from './util.js';
import {showUploadPhoto} from './user-photo.js';
import {showSuccessMessage, showErrorMessage, typeMessage} from './message.js';
import {pristine} from './form-validation.js';
import {resetScale, initScale} from './scale.js';
import {initSlider, hideSlider, resetEffect} from './effect-slider.js';

const SubmitText = { // текст на кнопке "Опубликовать"
  UNBLOCK: 'Опубликовать',
  BLOCK: 'Публикую...'
};

const bodyElement = document.querySelector('body');
const uploadOverlay = document.querySelector('.img-upload__overlay'); // находим форму редактирования изо-й
const uploadInput = document.querySelector('.img-upload__input'); // находим поле загрузки изо-я
const uploadSubmit = document.querySelector('.img-upload__submit'); // находим кнопку "Опубликовать" для отправки данных на сервер
const uploadCancel = document.querySelector('.img-upload__cancel'); // находим кнопку закрытия редактора изо-я
const textHashtags = uploadOverlay.querySelector('.text__hashtags'); // находим поле ввода хэштегов
const textDescription = uploadOverlay.querySelector('.text__description'); // находим поле ввода ком-ев
const uploadForm = document.querySelector('.img-upload__form'); // находим форму для загрузки нов. изо-я

// Функция закрытия модального окна добавления нового изо-я
const onUploadCancelClick = () => {
  uploadForm.reset(); // восстанавливает стандартные значения
  pristine.reset(); // сброс пристина
  resetEffect(); // сброс эффектов слайдера
  resetScale(); // сброс эффектов маштаба

  uploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  uploadInput.value = '';

  // удаляем обработчики событий
  document.removeEventListener('keydown', onDocumentKeydown);
};

// Функция открытия модального окна добавления нового изо-я
const onUploadFileClick = () => {
  uploadOverlay.classList.remove('hidden'); // показать подложку
  bodyElement.classList.add('modal-open'); // отключаем скрол под подложкой
  showUploadPhoto(); // отображение загружаемой фото
  hideSlider(); // скрывается слайдер при первоночальном показе

  uploadCancel.addEventListener('click', onUploadCancelClick);

  // добавление обработчиков событий
  document.addEventListener('keydown', onDocumentKeydown);
};

// Функция разблокировки кнопки "Опубликовать", после получения ответа от сервера
function unblockUploadSubmit () {
  uploadSubmit.disabled = false;
  uploadSubmit.textContent = SubmitText.UNBLOCK;
}

// Функция блокировки кнопки "Опубликовать" для избежания отправки формы несколько раз
function blockUploadSubmit () {
  uploadSubmit.disabled = true;
  uploadSubmit.textContent = SubmitText.BLOCK;
}

// Находим элементы в фокусе
const isInputFocus = () => {
  if (document.activeElement === textHashtags || document.activeElement === textDescription) {
    return true;
  }
};

// Функция для закрытия подложки при нажатии Esc, за исключением, когда поле ввода в фокусе
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !(isInputFocus())) {
    evt.preventDefault();
    if (!typeMessage()) {
      onUploadCancelClick();
    }
  }
}

// Функция отображения Всплывающих сообщений
const uploadFormData = async () => {
  try {
    const formData = new FormData(uploadForm);
    blockUploadSubmit(); // блокировать кнопку "Опубликовать"
    await sendData(formData);
    unblockUploadSubmit(); // разблокировать кнопку "Опубликовать"
    showSuccessMessage(); // показать сообщение об успешной загрузке фото
    onUploadCancelClick();
  } catch {
    showErrorMessage(); // показать сообщение об ошибке загрузки фото
    unblockUploadSubmit(); // разблокировать кнопку "Опубликовать"
  }
};

uploadInput.addEventListener('change', onUploadFileClick);
initSlider(); // бегунок слайдера
initScale(); // маштабирование

export {uploadFormData}; // экспорт в form-validation.js

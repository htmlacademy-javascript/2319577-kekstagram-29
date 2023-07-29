import {isEscapeKey} from './util.js';
import {resetScale, initScale} from './scale.js';
import {initSlider, hideSlider, resetEffect} from './effect-slider.js';
import {sendData} from './api.js';
import {showBooklet} from './booklet.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png', 'webp', 'svg', 'gif', 'avif']; // Расширения поддерживаемых картинок
const MAX_HASHTAG_COUNT = 5; // максимальное кол-во хэштегов
const ALLOWED_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i; // допустимые символы ввода

const bodyElement = document.querySelector('body');
const uploadOverlay = document.querySelector('.img-upload__overlay'); // находим форму редактирования изо-й
const uploadInput = document.querySelector('.img-upload__input'); // находим поле загрузки изо-я
const uploadSubmit = document.querySelector('.img-upload__submit'); // находим кнопку "Опубликовать" для отправки данных на сервер
const uploadCancel = document.querySelector('.img-upload__cancel'); // находим кнопку закрытия редактора изо-я
const textHashtags = uploadOverlay.querySelector('.text__hashtags'); // находим поле ввода хэштегов
const textDescription = uploadOverlay.querySelector('.text__description'); // находим поле ввода ком-ев
const uploadForm = document.querySelector('.img-upload__form'); // находим форму для загрузки нов. изо-я
const photoPreview = document.querySelector('.img-upload__preview img'); // загруженное фото для обрабоки

const submitText = { // текст на кнопке "Опубликовать"
  UNBLOCK: 'Опубликовать',
  BLOCK: 'Публикую...'
};

const errorText = { // комментарии ошибок ввода
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег',
};

const pristine = new Pristine(uploadForm, { // добавление функции-конструктора Pristine
  classTo: 'img-upload__field-wrapper', // элемент, на который нужно добавить валидацию (обертка в html)
  errorTextParent: 'img-upload__field-wrapper', // форма ошибки
  errorTextClass: 'img-upload__field-wrapper--error', // добавляет стиль для ошибки
}/*, false*/); // если оставить false, то ошибки будут отображаться только после нажатия кнопки отправки

// Функция закрытия модального окна добавления нового изо-я
const closeModal = () => {
  uploadForm.reset(); // восстанавливает стандартные значения
  resetEffect(); // сброс эффектов слайдера
  resetScale(); // сброс эффектов маштаба
  pristine.reset();

  uploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('.modal-open');

  uploadInput.value = '';

  // удаляем обработчик событий
  document.removeEventListener('keydown', onDocumentKeydown);
  textHashtags.removeEventListener('keydown', onFormFieldKeydown);
  textDescription.removeEventListener('keydown', onFormFieldKeydown);
};

// Функция открытия модального окна добавления нового изо-я
const openModal = () => {
  showUploadPhoto();

  uploadOverlay.classList.remove('hidden'); // показать подложку
  bodyElement.classList.add('.modal-open'); // отключаем скрол под подложкой
  hideSlider(); //скрывается слайдер при первоночальном показе

  uploadCancel.addEventListener('click', closeModal);

  // добавление обработчика событий
  document.addEventListener('keydown', onDocumentKeydown);
  textHashtags.addEventListener('keydown', onFormFieldKeydown);
  textDescription.addEventListener('keydown', onFormFieldKeydown);
};

// Функция отображения загружаемой карточки (фото)
function showUploadPhoto () {
  const file = uploadInput.files[0]; // получение единственного файла
  const fileName = file.name.toLowerCase(); // приводим название загружаемого файла к одному регистру

  const matchs = FILE_TYPES.some((extention) => fileName.endsWith(extention)); // проверка расширения файла .some() пройдемся по массиву с помошью .endsWith()

  if (matchs) {
    photoPreview.src = URL.createObjectURL(file); // метод URL.createObjectURL() делает ссылку на содержимое для отображения
  }
}

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

// Хэштеги должны удовлетворять условиям ТЗ
const normalizeTags = (tagString) => tagString // нормализуем введеные хэштеги
  .trim() // обрезаются лишние пробелы
  .split(' ') // разделение по пробелам
  .filter((tag) => Boolean(tag.length)); // оставляет только заполненные хэштеги

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT; // проверка кол-ва хэштегов (не более 5 шт.)

const hasValidTags = (value) => normalizeTags(value) // проверка ввода допустимых символов (проверка валидности хэштега)
  .every((tag) => ALLOWED_SYMBOLS // проверка каждого элемента массива
    .test(tag)); // возвращает true или false, если соответствует допустимым символам, или нет

const hasUniqueTags = (value) => { // проверка уникальности введенного хэштега (не должны повторяться)
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase()); // после нормализации, переводим введеный хэштег в строчную запись
  return lowerCaseTags.length === new Set(lowerCaseTags).size; // метод Set хранит в себе только уникальные элементы (выполняем сравнение)
};

// Функция отмены действия нажатия Esc для закрытия модалки, когда курсор в поле ввода форм
function onFormFieldKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

// Функция закрытия модалки при нажатии Esc
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

// Функция отображения Всплывающих сообщений
const uploadFormData = async () => {
  try {
    const formData = new FormData(uploadForm);
    blockUploadSubmit(); // блокировать кнопку "Опубликовать"
    await sendData(formData);
    unblockUploadSubmit(); // разблокировать кнопку "Опубликовать"
    showBooklet('success'); // показать сообщение об успешной загрузке фото
    closeModal ();
  } catch {
    showBooklet('error'); // показать сообщение об ошибке загрузки фото
    unblockUploadSubmit(); // разблокировать кнопку "Опубликовать"
  }
};

// Функция подтверждения валидности формы
const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  if (!pristine.validate()) {
    return;
  }
  uploadFormData ();
};

// Очередность проверок введенных данных
pristine.addValidator(textHashtags, hasUniqueTags, errorText.NOT_UNIQUE,1,true); // не уникальный хэштег
pristine.addValidator(textHashtags, hasValidTags, errorText.INVALID_PATTERN,2,true); // невалидный сам хэштег
pristine.addValidator(textHashtags, hasValidCount, errorText.INVALID_COUNT,3,true); // невалидное кол-во хэштегов


uploadForm.addEventListener('submit', onUploadFormSubmit); // проверка на валидацию
uploadInput.addEventListener('change', openModal);
initSlider(); // бегунок слайдера
initScale(); // маштабирование


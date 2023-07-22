import {isEscapeKey} from './util.js';

const bodyElement = document.querySelector('body');
const uploadOverlay = document.querySelector('.img-upload__overlay'); // находим форму редактирования изо-й
const uploadInput = document.querySelector('.img-upload__input'); // находим поле загрузки изо-я
const uploadCancel = document.querySelector('.img-upload__cancel'); // находим кнопку закрытия редактора изо-я
const textHashtags = uploadOverlay.querySelector('.text__hashtags'); // находим поле ввода хэштегов
const textDescription = uploadOverlay.querySelector('.text__description'); // находим поле ввода ком-ев
const uploadForm = document.querySelector('.img-upload__form'); // находим форму для загрузки нов. изо-я

const MAX_HASHTAG_COUNT = 5; // максимальное кол-во хэштегов
const ALLOWED_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i; // допустимые символы ввода

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
  uploadForm.reset();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('.modal-open');

  uploadInput.value = '';

  document.removeEventListener('keydown', onDocumentKeydown);
  textHashtags.removeEventListener('keydown', onFormFieldKeydown);
  textDescription.removeEventListener('keydown', onFormFieldKeydown);
};

// Функция открытия модального окна добавления нового изо-я
const openModal = () => {
  uploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('.modal-open');

  uploadCancel.addEventListener('click', closeModal);

  document.addEventListener('keydown', onDocumentKeydown);
  textHashtags.addEventListener('keydown', onFormFieldKeydown);
  textDescription.addEventListener('keydown', onFormFieldKeydown);
};

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

// Функция подтверждения валидности формы
const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

pristine.addValidator(textHashtags, hasUniqueTags, errorText.NOT_UNIQUE,1,true); // не уникальный хэштег
pristine.addValidator(textHashtags, hasValidTags, errorText.INVALID_PATTERN,2,true); // невалидный сам хэштег
pristine.addValidator(textHashtags, hasValidCount, errorText.INVALID_COUNT,3,true); // невалидное кол-во хэштегов

uploadForm.addEventListener('submit', onUploadFormSubmit);

uploadInput.addEventListener('change', openModal);

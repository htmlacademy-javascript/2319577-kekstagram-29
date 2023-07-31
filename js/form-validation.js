import {uploadFormData} from './form-upload.js';

const MAX_HASHTAG_COUNT = 5; // максимальное кол-во хэштегов
const ALLOWED_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i; // допустимые символы ввода

const uploadForm = document.querySelector('.img-upload__form'); // находим форму для загрузки нов. изо-я
const uploadOverlay = document.querySelector('.img-upload__overlay'); // находим форму редактирования изо-й
const textHashtags = uploadOverlay.querySelector('.text__hashtags'); // находим поле ввода хэштегов

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

// Функция подтверждения валидности формы
const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  if (!pristine.validate()) {
    return;
  }
  uploadFormData();
};

// Очередность проверок введенных данных
pristine.addValidator(textHashtags, hasUniqueTags, errorText.NOT_UNIQUE,1,true); // не уникальный хэштег
pristine.addValidator(textHashtags, hasValidTags, errorText.INVALID_PATTERN,2,true); // невалидный сам хэштег
pristine.addValidator(textHashtags, hasValidCount, errorText.INVALID_COUNT,3,true); // невалидное кол-во хэштегов


uploadForm.addEventListener('submit', onUploadFormSubmit); // проверка на валидацию

export {pristine}; // экспорт в form-upload.js

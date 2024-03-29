const SCALE_STEP = 25; // шаг изменения %
const MIN_SCALE = 25; // минимальный размер картинки
const MAX_SCALE = 100; // максимальный размер картинки
const DEFAULT_SCALE = 100; // стандартное значение размера картинки

const smallerBtnElement = document.querySelector('.scale__control--smaller'); // находим  кнопку -
const biggerBtnElement = document.querySelector('.scale__control--bigger'); // находим  кнопку +
const scaleValueElement = document.querySelector('.scale__control--value'); // находим значение масштаба отображения
const photoElement = document.querySelector('.img-upload__preview img'); // находим изображение

// Функция по преобразованию получаемого значения
const scalePhoto = (value) => {
  photoElement.style.transform = `scale(${value / 100})`; // передаём процент масштаба изображения
  scaleValueElement.value = `${value}%`; // отображаемое значение в поле ввода
};

// Функция по уменьшению фото при клике "-"
const onSmallerBtnClick = () => {
  scalePhoto (
    Math.max(parseInt(scaleValueElement.value, 10) - SCALE_STEP, MIN_SCALE) //возращаем большее число
  );
};

// Функция по увеличения фото при клике "+"
const onBiggerBtnClick = () => {
  scalePhoto (
    Math.min(parseInt(scaleValueElement.value, 10) + SCALE_STEP, MAX_SCALE) //возращаем меньшее число
  );
};

const resetScale = () => scalePhoto(DEFAULT_SCALE); // сброс к стандартному масштабу

const initScale = () => { // добавляем обработчики событий для кнопок + и -
  smallerBtnElement.addEventListener('click', onSmallerBtnClick);
  biggerBtnElement.addEventListener('click', onBiggerBtnClick);
};

export {resetScale, initScale}; // экспорт в form-upload.js

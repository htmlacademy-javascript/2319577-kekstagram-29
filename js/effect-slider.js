import {sliderEffects} from './data-effects.js';

const sliderEffectsList = document.querySelector('.effects__list'); // список эффектов
const sliderContainer = document.querySelector('.img-upload__effect-level'); // находим контейнер слайдера
const effectValueElement = document.querySelector('.effect-level__value'); // ползунок слайдера для каждой li
const sliderElement = document.querySelector('.effect-level__slider'); // ползунок слайдера
const photoPreview = document.querySelector('.img-upload__preview img'); // загруженное фото для обрабоки

// Функция скрывает слайдер
const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

//  Функция по изменению фильтров слайдера
const changeSliderFilters = (effect, value, unit) => {
  effectValueElement.value = value;
  photoPreview.style.filter = `${effect}(${value}${unit})`;
};

// Функция отображения слайдера
const showSlider = (effects) => {
  sliderContainer.classList.remove('hidden'); // показывается слайдер
  noUiSlider.create(sliderElement, {
    range: {
      min: effects['min'], // min значение позунка
      max: effects['max'] // max значение позунка
    },
    start: effects['max'], // при открытии всегда в max позиции
    step: effects['step'], // шаг ползунка
    connect: 'lower', // при использовании одной ручкой
    //tooltips: [true], // можно выводить подсказку
  });

  sliderElement.noUiSlider.on('update', () => { // обновление значения ползунка
    const sliderValue = sliderElement.noUiSlider.get();
    changeSliderFilters(effects.name, sliderValue, effects.unit);
  });
};

// Функция по сбросу эффектов
const resetEffect = () => {
  hideSlider(); // скрываем слайдер
  photoPreview.style.filter = null; // сбрасываем параметры у фото
  effectValueElement.value = null; // сбрасываем ползунок

  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
};

// Функция по изменению эффектов при использовании бегунка
function onClickChangeEffect (evt) {
  resetEffect(); // сброс эффектов слайдера при переключении
  const effects = sliderEffects[evt.target.value];

  if (effects.name === 'none') {
    photoPreview.removeAttribute('style');
    return;
  }
  showSlider(effects);
}

// Функция инициализации слайдера
const initSlider = () => {
  sliderEffectsList.addEventListener('change', onClickChangeEffect);
};

export {initSlider, hideSlider, resetEffect}; // экспорт в form-upload.js

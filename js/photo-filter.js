import {dataPhotos} from './load.js';
import {renderPicturesWithDebounce} from './pictures.js';

const NUMBER_OF_RANDOM_PHOTOS = 10; //кол-во случайных фото

const filterDefaultButten = document.querySelector('#filter-default'); // находим фильтр "По уполчанию"
const filterRandomButten = document.querySelector('#filter-random'); // находим фильтр "Случайные"
const filterDiscussedButten = document.querySelector('#filter-discussed'); // находим фильтр "Обсуждаемые"
const imageFilter = document.querySelector('.img-filters'); // находим контейнер с кнопками фильтров
const imageFilterButton = imageFilter.querySelector('.img-filters__form'); // находим форму ввода с кнопками фильтров

// Функция отбора 10 случайных не повторяющихся карточек
function getRandomPhotos(arr) {
  for (let i = 0 ; (i < NUMBER_OF_RANDOM_PHOTOS) && (i < arr.length) ; i++) {
    const r = Math.floor(Math.random() * (arr.length - i)) + i;
    const photo = arr[r];
    arr[r] = arr[i];
    arr[i] = photo;
  }
  return arr.slice(0, NUMBER_OF_RANDOM_PHOTOS);
}

// Функция сортировки карточек в порядке убывания по кол-ву ком-ев
function getDiscussedPhotosFirst (arr) {
  return arr.sort((a, b) => b.comments.length - a.comments.length);
}

// Функция выбора нужного фильтра с параметрами
function getFilterData (id) {
  const idToFilter = {
    'filter-default': dataPhotos,
    'filter-random': getRandomPhotos([...dataPhotos]),
    'filter-discussed': getDiscussedPhotosFirst ([...dataPhotos])
  };
  return idToFilter[id];
}

// Функция переключения активного фильтра
function setActiveFilterButton (evt) {
  imageFilterButton.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
}

// Функция переключения фильтров
function onFilterClick(evt) {
  const pictures = getFilterData(evt.target.id);
  setActiveFilterButton(evt); // переключаемся на выбранный фильтр
  renderPicturesWithDebounce(pictures); // отрисовываем карточки, удовлетворяющие фильтру
}

// Функция отображения кнопок выбора фильтра
function initializeFilters() {
  imageFilter.classList.remove('img-filters--inactive'); // удаляем класс для отображения кнопок

  // добавляем обработчики событий для каждой кнопки фильтра
  filterDefaultButten.addEventListener('click', onFilterClick);
  filterRandomButten.addEventListener('click', onFilterClick);
  filterDiscussedButten.addEventListener('click', onFilterClick);
}

initializeFilters();

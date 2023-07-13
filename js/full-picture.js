import {data} from './data.js';

const picturesContainer = document.querySelector('.pictures'); // находим контейнер с изображениями всех карточек

function fillBigPicture(photoObj) {
  const bigPicture = document.querySelector('.big-picture');
  bigPicture.querySelector('.big-picture__img img').src = photoObj.url;
  bigPicture.querySelector('.big-picture__img img').src = photoObj.url;
}

function onPicturesContainerClick(evt) {
  const cardId = evt.target.closest('.picture').dataset.id;
  const photoData = data.find((element) => element.id === Number(cardId));

  fillBigPicture(photoData);
}

picturesContainer.addEventListener('click', onPicturesContainerClick);

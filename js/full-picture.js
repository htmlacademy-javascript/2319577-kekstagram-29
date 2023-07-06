import {data} from './data.js';

const picturesContainer = document.querySelectorAll('.picture');

function fillBigPicture(photoObj) {
  const bigPicture = document.querySelector('.big-picture');
  bigPicture.querySelector('.big-picture__img img').src = photoObj.url;

  // console.log('PhotoObj', PhotoObj);
}

function onPicturesContainerClick(evt) {
  const cardId = evt.target.closest('.picture').dataset.id;

  const photoData = data.find((element) => element.id === Number(cardId));

  // console.log(photoData);

  // console.log('data', data);
  // console.log('id', evt.target.closest('.picture').data.id);

  fillBigPicture(photoData);
}

export const picturesContainerClick = () => {
  picturesContainer.addEventListener('click', onPicturesContainerClick);
};
